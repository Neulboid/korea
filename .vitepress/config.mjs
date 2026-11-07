
import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/korea/',
  title: "Neulvoid",
  description: "늘보이드 서버 공식 안내서 및 종합 가이드 위키입니다.",

  appearance: 'force-dark',

  themeConfig: {
    outline: {
     level: [2, 3],
     label: '페이지 목차'
    },
    aside: false,
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '궁금한 내용을 검색하세요',
                buttonAriaLabel: '검색'
              },
              modal: {
                noResultsText: '검색 결과를 찾을 수 없습니다',
                resetButtonTitle: '검색어 초기화',
                footer: {
                  selectText: '선택',
                  navigateText: '이동',
                  closeText: '닫기'
                }
              }
            }
          }
        }
      }
    },

    // 상단 메뉴
    nav: [
      { text: '홈', link: '/' },
      { text: '서버 규칙', link: '/rules' },
      { text: '직업', link: '/jobs/' }
    ],

    // 왼쪽 사이드바
    sidebar: [
      {
        text: '서버안내',
        items: [
          { text: '위키 홈', link: '/' },
          { text: '서버 규칙', link: '/rules' },
          { text: '아티팩트', link: '/artifacts' },
          { text: '강화석 & 영약', link: '/enhancement-potions' }
        ]
      },
      {
        text: '직업',
        link: '/jobs/',
        collapsed: false,
        items: [
          { text: '광전사', link: '/jobs/berserker' },
          { text: '뮤턴트', link: '/jobs/mutant' },
          { text: '사이보그', link: '/jobs/cyborg' },
          { text: '연금술사', link: '/jobs/alchemist' },
          { text: '특전사', link: '/jobs/special-forces' }
        ]
      }
    ]
  }
})
