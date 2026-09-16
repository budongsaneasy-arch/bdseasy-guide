// 기본 테마를 그대로 쓰면서 디자인만 얹습니다.
// 색·글꼴·여백은 같은 폴더의 custom.css 에서 조정하세요.
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { onMounted, watch, nextTick } from 'vue'
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

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    onMounted(() => nextTick(markSteps))
    watch(
      () => route.path,
      () => nextTick(markSteps)
    )
  }
}
