// 기본 테마를 그대로 쓰면서 디자인만 얹습니다.
// 색·글꼴·여백은 같은 폴더의 custom.css 에서 조정하세요.
import DefaultTheme from 'vitepress/theme'
import { useRoute, useData } from 'vitepress'
import { h, onMounted, watch, nextTick } from 'vue'
import { GA4_ID, NAVER_ANALYTICS_ID } from '../analytics.js'
import './custom.css'

// ─────────────────────────────────────────────────────────────
//  단계 번호를 눈에 보이게 만듭니다.
//
//  이 가이드는 대부분 "1. / 2. / 3." 순서로 된 절차 문서입니다.
//  마크다운에 그냥 "## 1. 호실 만들기" 라고 쓰시면,
//  아래 코드가 앞의 숫자만 떼어내 왼쪽에 번호표로 세웁니다.
//
//  → 대표님은 지금까지처럼 쓰시면 됩니다. 따로 하실 일은 없습니다.
//  → 번호가 없는 제목("왜 필요한가" 등)은 그대로 둡니다.
// ─────────────────────────────────────────────────────────────

const STEP = /^\s*(\d{1,2})\.\s+/

function markSteps() {
  document.querySelectorAll('.vp-doc h2').forEach((h) => {
    if (h.hasAttribute('data-ez-done')) return
    h.setAttribute('data-ez-done', '')

    // 제목 안의 첫 텍스트에서 "3. " 같은 앞 번호를 찾습니다
    const node = Array.from(h.childNodes).find(
      (n) => n.nodeType === Node.TEXT_NODE && STEP.test(n.nodeValue)
    )
    if (!node) return

    const num = node.nodeValue.match(STEP)[1]
    node.nodeValue = node.nodeValue.replace(STEP, '')

    const chip = document.createElement('span')
    chip.className = 'ez-step'
    chip.textContent = num
    h.insertBefore(chip, h.firstChild)
    h.setAttribute('data-ez-step', num)
  })
}

// ────────────────────────────────────────────────────────────
//  첫 화면에도 「마지막 수정일」을 붙입니다.
//
//  문서 페이지에는 VitePress가 자동으로 붙여 주는데,
//  첫 화면(layout: home)에는 그 자리가 없어 혼자 비어 있었습니다.
//
//  날짜는 config.mts 가 커밋에서 읽어 옵니다.
//  → 대표님이 날짜를 직접 적으실 일은 없습니다. 문서를 고치면 따라 바뀝니다.
// ────────────────────────────────────────────────────────────

function HomeUpdated() {
  const { theme, frontmatter } = useData()

  // 첫 화면에만 붙입니다. 문서 페이지에는 VitePress가 이미 붙여 줍니다.
  if (frontmatter.value.layout !== 'home') return null

  const iso = theme.value.ezLastDocChange
  if (!iso) return null

  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null

  const when = d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일'

  return h('div', { class: 'ez-home-updated' }, [
    h('span', { class: 'ez-home-updated__label' }, '이 가이드는 제품이 바뀔 때마다 고칩니다'),
    h('span', { class: 'ez-home-updated__date' }, [
      '마지막 수정 ',
      h('time', { datetime: d.toISOString() }, when)
    ])
  ])
}

// ────────────────────────────────────────────────────────────
//  방문자 분석 — 넘어간 화면을 한 번씩 알려 줍니다.
//
//  이 사이트는 문서를 넘길 때 새로고침을 하지 않습니다. 화면만 갈아 끼웁니다.
//  그래서 가만히 두면 구글·네이버는 처음 들어온 화면 하나만 보고,
//  그 사람이 다음에 어느 문서를 읽었는지는 모릅니다.
//  아래 코드가 화면이 바뀔 때마다 "지금 이 주소를 보고 있습니다" 하고 알립니다.
//
//  ★ 측정 ID 가 비어 있으면(= 아직 안 받았으면) 아무것도 보내지 않습니다.
//    ID 는 docs/.vitepress/analytics.js 에서 고칩니다.
//
//  ※ 같은 주소는 두 번 세지 않습니다. 보낸 주소를 기억해 두고 비교합니다.
//    들어온 첫 화면에서 VitePress 가 화면 전환을 한 번 더 알려 주기 때문에,
//    이 비교가 없으면 첫 화면이 두 번 집계됩니다.
//  ※ 본문 안의 제목 링크(#)를 눌러 같은 문서 안에서 움직이는 것은
//    새 화면이 아니므로 세지 않습니다.
// ────────────────────────────────────────────────────────────

// 구글·네이버에 각각 마지막으로 보낸 주소입니다.
// ★ 실제로 보낸 뒤에만 적습니다. 보내지 못했는데 적어 두면
//   "이미 보냈다"고 착각해서 그 화면이 통째로 빠집니다.
let ga4SentPath = null
let naverSentPath = null

// 주소표시줄의 경로입니다 (예: /howto/naver-ad).
// #뒤는 보지 않습니다 — 본문 제목 링크를 눌러 움직인 것은 새 화면이 아닙니다.
function currentPath() {
  return window.location.pathname + window.location.search
}

function sendToGa4() {
  if (!GA4_ID) return
  const path = currentPath()
  if (path === ga4SentPath) return
  // 구글 스크립트가 아직 안 올라왔으면 그냥 돌아갑니다. 보낸 것으로 적지 않으므로
  // 아래 재시도에서 다시 보냅니다.
  if (typeof window.gtag !== 'function') return

  ga4SentPath = path
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title
  })
}

function sendToNaver() {
  if (!NAVER_ANALYTICS_ID) return
  const path = currentPath()
  if (path === naverSentPath) return
  if (!window.wcs || typeof window.wcs_do !== 'function') return

  naverSentPath = path
  window._nasa = window._nasa || {}
  window.wcs.inflow()
  window.wcs_do(window._nasa)
}

// 구글·네이버 스크립트가 늦게 올라올 때가 있습니다.
// 아직이면 잠깐 기다렸다가 다시 넣어 봅니다 (0.25초 간격으로 최대 5초).
function sendPageView(retriesLeft = 20) {
  if (typeof window === 'undefined') return

  const waiting =
    (GA4_ID && typeof window.gtag !== 'function') ||
    (NAVER_ANALYTICS_ID && typeof window.wcs_do !== 'function')

  sendToGa4()
  sendToNaver()

  if (waiting && retriesLeft > 0) {
    setTimeout(() => sendPageView(retriesLeft - 1), 250)
  }
}

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    // 문서를 넘길 때마다 불립니다. 제목이 바뀐 뒤에 보내려고 한 틱 기다립니다.
    router.onAfterRouteChange = () => nextTick(sendPageView)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(HomeUpdated)
    })
  },
  setup() {
    const route = useRoute()
    onMounted(() => nextTick(markSteps))

    // 들어온 첫 화면용입니다. 위 onAfterRouteChange 가 먼저 보냈으면
    // 같은 주소라서 그냥 넘어갑니다 (두 번 세지 않습니다).
    onMounted(() => nextTick(sendPageView))

    watch(
      () => route.path,
      () => nextTick(markSteps)
    )
  }
}
