# 부동산이지 사용 가이드

공인중개사용 부동산이지 사용 매뉴얼 사이트의 원본입니다.
이 폴더 하나가 매뉴얼 사이트, 강의자료, 제품 내 도움말의 **공통 원본**이 됩니다.

---

## 폴더 구조

```
bdseasy-guide/
├── docs/
│   ├── index.md              ← 첫 화면
│   ├── start/                ← 시작하기 (1~2개만)
│   ├── howto/                ← 업무별 방법 (대부분이 여기)
│   ├── reference/            ← 화면 설명 (맨 나중에)
│   ├── concept/              ← 배경 개념
│   ├── public/images/        ← 스크린샷은 전부 여기
│   └── .vitepress/
│       ├── config.mts        ← 메뉴·사이드바 설정
│       └── theme/custom.css  ← 색상 설정
├── .github/workflows/
│   └── deploy.yml            ← 저장하면 사이트가 자동으로 다시 만들어짐
└── package.json
```

## 문서를 추가하는 법

1. 알맞은 폴더(`howto/` 등)에 `.md` 파일을 새로 만듭니다.
2. `docs/howto/contract-apartment.md`를 복사해서 틀을 그대로 쓰세요.
3. `docs/.vitepress/config.mts`의 `sidebar`에 한 줄 추가합니다.

**헷갈리면 Claude에게 "이 저장소에 ○○ 문서 추가해줘"라고 말씀하시면 됩니다.**

## 문서 네 종류 (이 분류를 지키면 체계가 안 무너집니다)

| 폴더 | 종류 | 무엇 | 예 |
| --- | --- | --- | --- |
| `start/` | 시작하기 | 처음 온 사람이 순서대로 따라가는 것 | 가입부터 첫 계약서까지 |
| `howto/` | 업무별 방법 | 하나의 일을 끝내는 법 | 아파트 매매계약서 쓰기 |
| `reference/` | 화면 설명 | 각 버튼이 뭘 하는지 (찾아보는 용도) | 확인설명서 입력 항목 전체 |
| `concept/` | 배경 개념 | 왜 이런 게 있는지 | 네이버 CP 연동이란 |

**한 문서는 한 종류만.** 계약서 쓰는 법 안에 "확인설명서란 무엇인가"를 넣지 말고 링크로 넘기세요.

## 스크린샷 규칙

- 전부 `docs/public/images/` 에 넣습니다
- 파일명은 영문으로: `contract-apartment-01.png` (문서이름-순번)
- 문서에서 부를 때는 `![설명](/images/contract-apartment-01.png)`
- 가로 1400px 정도로 줄여서 올리세요 (원본 그대로 올리면 저장소가 무거워집니다)

## 최종 수정일

**직접 적지 마세요.** 저장(커밋)한 날짜가 각 문서 하단에 자동으로 붙습니다.

## 내 컴퓨터에서 미리 보기 (선택)

웹에서만 작업하실 거면 필요 없습니다.

```bash
npm install
npm run dev      # http://localhost:5173 에서 확인
npm run build    # 실제 배포와 같은 결과물 만들기
```

## 설정에서 바꿔야 할 곳 두 군데

`docs/.vitepress/config.mts` 안에 있습니다.

1. **`base`** — GitHub Pages 기본 주소면 `'/bdseasy-guide/'` 그대로, 도메인을 연결했으면 `'/'`
2. **`editLink.pattern`** — `YOUR-ID`를 본인 GitHub 아이디로
