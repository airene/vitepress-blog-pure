import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: 'Blogs',
    items: [
      {
        text: 'pages',
        link: '/pages/index'
      },
      {
        text: 'timeline',
        link: '/timeline'
      }
    ]
  },
  { text: 'Tags', link: '/tags' },
  { text: 'About', link: '/about' }
]
