import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/korea/',
  title: "Neulvoid",
  description: "늘보이드 서버 공식 안내서 및 종합 가이드 위키입니다.",

  // 🌑 검정 테마 고정 (밝은 모드 전환 버튼이 사라집니다)
  appearance: 'force-dark',

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
    ],

    sidebar: [
      {
        text: '서버안내',
        items: [
          { text: '위키 홈', link: '/' },
          { text: '서버규칙', link: '/rules' },
          { text: '늘보이드 생존 백과', link: '/survival' },
          { text: '유저 API 목록', link: '/user-api' },
          { text: '섭주API 목록', link: '/host-api' },
          { text: '뷰포인트 세팅안내', link: '/viewpoint' }
        ]
      }
    ],

  }
})
