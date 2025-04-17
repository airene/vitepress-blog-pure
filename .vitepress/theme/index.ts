import DefaultTheme from 'vitepress/theme'
import NewLayout from './components/NewLayout.vue'
import Archives from './components/Archives.vue'
import Category from './components/Category.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
// import Comment from './components/Comment.vue'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { Theme, useData, useRoute } from 'vitepress'

import './custom.css'

export default {
    ...DefaultTheme,
    Layout: NewLayout,
    enhanceApp({ app }) {
        // register global compoment
        app.component('Tags', Tags)
        app.component('Category', Category)
        app.component('Archives', Archives)
        app.component('Page', Page)
        //app.component('Comment', Comment)
    },
    setup() {
        // Giscus 配置
        const { frontmatter } = useData()
        const route = useRoute()

        giscusTalk(
            {
                repo: 'FisherMS/vitepress-abcdeep-net-blog', // 仓库名称
                repoId: 'R_kgDOOaU1KA', // 仓库 ID
                category: 'General', // 讨论分类名称
                categoryId: 'DIC_kwDOOaU1KM4CpMfW', // 讨论分类 ID
                mapping: 'pathname',
                inputPosition: 'top',
                lang: 'en',
                lightTheme: 'light',
                darkTheme: 'transparent_dark'
            },
            {
                frontmatter,
                route
            },
            true
        )
    }
} satisfies Theme
