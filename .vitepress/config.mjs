import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Neulvoid",
  description: "늘보이드 서버 공식 안내서 및 종합 가이드 위키입니다.",
  themeConfig: {
    // 🔍 검색 기능 활성화 (상단에 돋보기/검색창 생성)
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

    nav: [
      { text: '홈', link: '/' },
      { text: '서버 규칙', link: '/rules' },
      { text: 'API 안내', link: '/api' }
    ],

    sidebar: [
      {
        text: '서버 안내',
        items: [
          { text: '위키 홈', link: '/' },
          { text: '서버 규칙', link: '/rules' },
          { text: 'API 안내 및 규칙', link: '/api' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})