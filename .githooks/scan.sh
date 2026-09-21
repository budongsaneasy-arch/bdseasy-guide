#!/bin/sh
# ─────────────────────────────────────────────────────────────
#  민감정보 스캐너
#
#  이 저장소는 공개입니다. 한 번 푸시하면 커밋을 지워도 해시로 접근되고
#  포크·캐시에 남습니다. 그래서 커밋 전에 한 번 걸러 줍니다.
#
#  사용: scan.sh <검사할파일> [표시이름]
#  반환: 0 = 깨끗함 / 1 = 걸린 것이 있음
# ─────────────────────────────────────────────────────────────
set -u

SRC="$1"
LABEL="${2:-$1}"
HOOKDIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
ALLOW="$HOOKDIR/allow.txt"
DENY="$HOOKDIR/deny.local.txt"

[ -f "$SRC" ] || exit 0

# 이미지·폰트·잠금파일은 글자가 아니라 건너뜁니다.
# (스크린샷은 기계가 못 읽습니다 — 찍은 뒤 눈으로 확인하는 규칙이 따로 있습니다)
case "$LABEL" in
  *.png|*.jpg|*.jpeg|*.gif|*.webp|*.ico|*.pdf|*.woff|*.woff2|*.ttf|*.otf) exit 0 ;;
  package-lock.json|*/package-lock.json) exit 0 ;;
esac

# 바이너리면 건너뜁니다
grep -qI . "$SRC" 2>/dev/null || exit 0

WORK="$(mktemp)"
trap 'rm -f "$WORK"' EXIT

# 줄번호를 붙인 뒤, 허용 문자열이 들어간 줄은 검사에서 뺍니다
if [ -s "$ALLOW" ]; then
  grep -n '' "$SRC" | grep -vFf "$ALLOW" > "$WORK" 2>/dev/null || true
else
  grep -n '' "$SRC" > "$WORK" 2>/dev/null || true
fi

FOUND=0

# $1=종류, $2=패턴, $3=grep 옵션(-E 또는 -F)
check() {
  kind="$1"; pat="$2"; opt="${3:--E}"
  hits="$(grep $opt -- "$pat" "$WORK" 2>/dev/null || true)"
  [ -n "$hits" ] || return 0
  FOUND=1
  printf '\n  [%s]  %s\n' "$kind" "$LABEL"
  printf '%s\n' "$hits" | sed 's/^/      /' | head -5
}

check '주민등록번호' '[0-9]{6}[[:space:]]*-[[:space:]]*[1-4][0-9]{6}'
check '휴대폰번호'   '01[016789]-?[0-9]{3,4}-?[0-9]{4}'
check '토큰·비밀키'  '(gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)'

# 지번주소 — ○○ 로 가린 줄은 뺍니다 (가이드의 마스킹 표기)
addr="$(grep -E -- '[^[:space:]]+(동|가|리)[[:space:]]+[0-9]+(-[0-9]+)?[[:space:]]*번지' "$WORK" 2>/dev/null | grep -v '○' || true)"
if [ -n "$addr" ]; then
  FOUND=1
  printf '\n  [지번주소]  %s\n' "$LABEL"
  printf '%s\n' "$addr" | sed 's/^/      /' | head -5
fi

# 이 컴퓨터에만 두는 금지어 목록 (실제 단지명·계정 등). 저장소에 올라가지 않습니다.
if [ -s "$DENY" ]; then
  deny="$(grep -Ff "$DENY" "$WORK" 2>/dev/null || true)"
  if [ -n "$deny" ]; then
    FOUND=1
    printf '\n  [금지어 목록]  %s\n' "$LABEL"
    printf '%s\n' "$deny" | sed 's/^/      /' | head -5
  fi
fi

exit $FOUND
