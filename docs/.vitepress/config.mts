import { defineConfig } from 'vitepress'

// ─────────────────────────────────────────────────────────────
//  ★ 대표님이 손대실 곳은 딱 두 군데입니다 ★
//
//  1) base
//     - GitHub Pages 기본 주소로 쓰실 때  →  '/bdseasy-guide/'  (지금 상태)
//     - guide.bdseasy.com 처럼 도메인을 연결하신 뒤  →  '/'  로 바꾸세요
//
//  2) sidebar
//     - 문서를 새로 추가하면 아래 sidebar 목록에 한 줄 넣으면 끝입니다
//     - 헷갈리면 Claude에게 "이 문서 사이드바에 추가해줘" 하고 말씀하세요
// ─────────────────────────────────────────────────────────────

const base = '/bdseasy-guide/'

export default defineConfig({
  base,
  lang: 'ko-KR',
  title: '부동산이지 사용 가이드',
  description: '공인중개사를 위한 부동산이지 사용법. 계약서·확인설명서·공적장부·네이버 광고.',

  // 각 문서 아래에 "최종 수정일"이 자동으로 붙습니다.
  // 대표님이 날짜를 직접 적을 필요가 없습니다 — 저장한 날짜가 그대로 들어갑니다.
  lastUpdated: true,

  cleanUrls: true,
  ignoreDeadLinks: true,

  // 확인설명서 문서는 아직 검증 전 초안입니다.
  // 대표님과 함께 다시 쓴 뒤 아래 한 줄을 지우면 다시 사이트에 나옵니다.
  // (사이드바 항목도 함께 되살려 주세요)
  srcExclude: ['**/confirmation-form.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#C4402E' }],
    ['meta', { property: 'og:title', content: '부동산이지 사용 가이드' }],
    ['meta', { property: 'og:locale', content: 'ko_KR' }]
  ],

  themeConfig: {
    siteTitle: '부동산이지 사용 가이드',

    nav: [
      { text: '시작하기', link: '/start/first-contract' },
      { text: '업무별 방법', link: '/howto/public-records' },
      { text: '화면 설명', link: '/reference/' },
      { text: '배경 개념', link: '/concept/naver-cp' },
      { text: '부동산이지 열기 ↗', link: 'https://bdseasy.com/' }
    ],

    // ── 문서를 네 종류로만 나눕니다 (Diátaxis) ──
    //  1. 시작하기   : 처음 온 사람이 순서대로 따라가는 것. 1~2개만.
    //  2. 업무별 방법 : 하나의 일을 끝내는 법. 대부분이 여기.
    //  3. 화면 설명   : 각 버튼이 뭘 하는지. 찾아보는 용도.
    //  4. 배경 개념   : 왜 이런 게 있는지. 대표님 전문성이 들어가는 곳.
    sidebar: [
      {
        text: '시작하기',
        collapsed: false,
        items: [
          { text: '가입부터 첫 계약서까지', link: '/start/first-contract' }
        ]
      },
      {
        text: '업무별 방법',
        collapsed: false,
        items: [
          { text: '공적장부 한 번에 떼기', link: '/howto/public-records' },
          { text: '매물 접수하기', link: '/howto/property-register' },
          { text: '가계약 문자 보내기', link: '/howto/pre-contract-sms' },
          { text: '아파트 매매계약서 쓰기', link: '/howto/contract-apartment' }
        ]
      },
      {
        text: '화면 설명',
        collapsed: false,
        items: [
          { text: '아직 준비 중입니다', link: '/reference/' }
        ]
      },
      {
        text: '배경 개념',
        collapsed: false,
        items: [
          { text: '네이버 부동산 CP 연동이란', link: '/concept/naver-cp' }
        ]
      }
    ],

    // 사이트 안에서 검색이 됩니다. 별도 설정이나 비용이 없습니다.
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        },
        translations: {
          button: { buttonText: '검색', buttonAriaLabel: '검색' },
          modal: {
            displayDetails: '자세히 보기',
            resetButtonTitle: '검색어 지우기',
            backButtonTitle: '닫기',
            noResultsText: '검색 결과가 없습니다',
            footer: {
              selectText: '선택',
              navigateText: '이동',
              closeText: '닫기'
            }
          }
        }
      }
    },

    outline: { level: [2, 3], label: '이 문서의 목차' },

    docFooter: { prev: '이전 문서', next: '다음 문서' },
    lastUpdatedText: '최종 수정일',
    darkModeSwitchLabel: '화면 모드',
    lightModeSwitchTitle: '밝게',
    darkModeSwitchTitle: '어둡게',
    returnToTopLabel: '위로',
    sidebarMenuLabel: '목차',

    // 각 문서 하단에 "이 문서 고쳐주세요" 링크가 붙습니다.
    editLink: {
      pattern: 'https://github.com/budongsaneasy-arch/bdseasy-guide/edit/main/docs/:path',
      text: '이 문서에서 틀린 점 알려주기'
    },

    footer: {
      message: '문의 help@neobsoft.co.kr · 010-9699-5350',
      copyright: '네오비소프트 · 부동산이지'
    }
  }
})
