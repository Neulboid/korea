
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useData, withBase } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,

  Layout() {
    const { page } = useData()

    return h(DefaultTheme.Layout, null, {
      'doc-top': () => {
        if (page.value.relativePath !== 'index.md') {
          return null
        }

        return h(
          'div',
          {
            class: 'wiki-home-banner'
          },
          [
            h('img', {
              src: withBase('/banner.png'),
              alt: '늘보이드 배너'
            })
          ]
        )
      }
    })
  }
}
