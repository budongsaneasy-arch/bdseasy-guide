// 기본 테마를 그대로 쓰면서 디자인만 얹습니다.
// 색·글꼴·여백은 같은 폴더의 custom.css 에서 조정하세요.
import DefaultTheme from 'vitepress/theme'
import { useRoute, useData } from 'vitepress'
import { h, onMounted, watch, nextTick } from 'vue'
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

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(HomeUpdated)
    })
  },
  setup() {
    const route = useRoute()
    onMounted(() => nextTick(markSteps))
    watch(
      () => route.path,
      () => nextTick(markSteps)
    )
  }
}
