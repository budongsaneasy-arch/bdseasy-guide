import { defineConfig } from 'vitepress'

// ─────────────────────────────────────────────────────────────
//  ★ 대표님이 손대실 곳은 딱 두 군데입니다 ★
//
//  1) base
//     - ★ 2026.09 guide.bdseasy.com 도메인을 연결해서 '/' 로 바꿨습니다. 그대로 두세요.
//     - 도메인을 떼고 GitHub Pages 기본 주소로 돌아가실 때만  →  '/bdseasy-guide/'
//     - 도메인 이름은 docs/public/CNAME 에 있습니다. 이 파일이 있어야 배포할 때
//       도메인이 풀리지 않습니다 (빌드 결과에 같이 들어갑니다)
//
//  2) sidebar
//     - 문서를 새로 추가하면 아래 sidebar 목록에 한 줄 넣으면 끝입니다
//     - 헷갈리면 Claude에게 "이 문서 사이드바에 추가해줘" 하고 말씀하세요
// ─────────────────────────────────────────────────────────────

const base = '/'

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

  // 구글 검색에 사이트맵을 알려줍니다. /sitemap.xml 로 만들어집니다.
  sitemap: { hostname: 'https://guide.bdseasy.com' },

  head: [
    ['meta', { name: 'theme-color', content: '#14459E' }],

    // 구글 서치콘솔 소유권 확인. 지우면 확인이 풀립니다.
    ['meta', { name: 'google-site-verification', content: '_9G_gvgfhAjWAhTw7ITftGe5qS63Wowe5c2mlfx6D9I' }],
    ['meta', { property: 'og:title', content: '부동산이지 사용 가이드' }],
    ['meta', { property: 'og:locale', content: 'ko_KR' }],

    // ── 글꼴 ──────────────────────────────────────────────
    //  본문은 Pretendard(한글 화면용), 제목·경로는 IBM Plex.
    //  아래 세 줄을 지우면 글꼴이 시스템 기본으로 돌아갑니다.
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap'
    }],

    // ── 방문 통계 (Cloudflare Web Analytics) ────────────────
    //  몇 명이 어느 문서를 보는지만 셉니다.
    //  쿠키를 쓰지 않고 개별 방문자를 추적하지 않아 동의 배너가 필요 없습니다.
    //  아래 토큰은 비밀값이 아닙니다 — 방문자 모두에게 보이는 값입니다.
    //  통계 보기: Cloudflare 대시보드 → Analytics → Web Analytics
    ['script', {
      defer: '',
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      'data-cf-beacon': '{"token": "f23fae77869240ce98ec874e61659c54", "spa": true}'
    }]
  ],

  themeConfig: {
    siteTitle: '부동산이지 사용 가이드',

    nav: [
      { text: '시작하기', link: '/start/first-contract' },
      { text: '업무별 방법', link: '/howto/public-records' },
      { text: '화면 설명', link: '/reference/' },
      { text: '배경 개념', link: '/concept/why-records-first' },
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
          { text: '신축 단지 원장 신청하기 (임시원장)', link: '/howto/temp-ledger' },
          { text: '네이버 매물 보고 바로 접수하기', link: '/howto/n-monitoring' },
          { text: '네이버에 매물 광고하기', link: '/howto/naver-ad' },
          { text: '이지허브에 매물 올리고 의뢰 받기', link: '/howto/ez-hub' },
          { text: '매물 브리핑 인쇄하기', link: '/howto/property-briefing' },
          { text: '가계약 문자 보내기', link: '/howto/pre-contract-sms' },
          { text: '아파트 매매계약서 쓰기', link: '/howto/contract-apartment' },
          { text: '확인설명서 작성하기 (주거용)', link: '/howto/confirmation-form' },
          { text: '전세·월세 계약서 쓰기', link: '/howto/contract-lease' },
          { text: '분양권 매매계약서 쓰기', link: '/howto/contract-presale' },
          { text: '입주권 매매계약서 쓰기', link: '/howto/contract-redevelopment' },
          { text: '권리금 계약서 쓰기', link: '/howto/contract-premium' },
          { text: '계약 단계별 안내문자 보내기', link: '/howto/contract-sms' },
          { text: '계약서 공유해서 공동중개하기', link: '/howto/contract-share' },
          { text: '임대차 만기일 관리하기', link: '/howto/lease-expiry' },
          { text: '다가구·상가 호실별로 관리하기', link: '/howto/partial-lease' },
          { text: '고객 의뢰 접수하고 관리하기', link: '/howto/request' },
          { text: '고객 등록하고 관리하기', link: '/howto/customer' },
          { text: '고객 한 번에 불러오기', link: '/howto/customer-import' },
          { text: '일정 관리하기', link: '/howto/calendar' },
          { text: '직원 등록하고 배분비율 정하기', link: '/howto/staff' },
          { text: '매출 관리하기', link: '/howto/sales' },
          { text: '등기 열람 포인트 충전하기', link: '/howto/points' }
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
          { text: '왜 대장이 먼저인가', link: '/concept/why-records-first' },
          { text: '고객을 왜 한 곳에 모으나', link: '/concept/why-one-customer' },
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
    // 문서 하단의 "틀린 점 알려주기" 링크입니다.
    // 읽는 분은 개업공인중개사이지 개발자가 아니라, GitHub 편집 화면이 아니라
    // 부동산이지 고객센터의 문의하기로 보냅니다.
    editLink: {
      pattern: 'https://bdseasy.com/board',
      text: '이 문서에서 틀린 점 알려주기'
    },

    footer: {
      message: '문의 help@neobsoft.co.kr · 010-9699-5350',
      copyright: '네오비소프트 · 부동산이지'
    }
  }
})
