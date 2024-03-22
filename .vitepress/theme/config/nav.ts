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
                text: 'archives',
                link: '/archives'
            }
        ]
    },
    { text: 'Tags', link: '/tags' },
    { text: 'About', link: '/about' }
]
