
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { withBase } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-top': () =>
        h(
          'div',
          {
            class: 'wiki-banner',
            style: {
              width: 'calc(100% - 48px)',
              maxWidth: '1320px',
              margin: '18px auto 30px',
              borderRadius: '20px',
              overflow: 'hidden'
            }
          },
          [
            h('img', {
              src: withBase('/banner.png'),
              alt: '늘보이드 배너',
              style: {
                display: 'block',
                width: '100%',
                height: 'auto'
              }
            })
          ]
        )
    })
  }
}
