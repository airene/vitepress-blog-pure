import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NewLayout from './components/NewLayout.vue'
import Archives from './components/Archives.vue'
import Category from './components/Category.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
import Comment from './components/CommentGiscus.vue'
import { App } from 'vue' // 引入 Vue 的 App 类型

import './custom.css'

export default {
    ...DefaultTheme,
    Layout: NewLayout,
    enhanceApp({ app }: { app: App }) {
        // 全局注册后，在Vue里就能直接使用了
        app.component('Tags', Tags)
        app.component('Category', Category)
        app.component('Archives', Archives)
        app.component('Page', Page)
        app.component('Comment', Comment)
    }
} satisfies Theme
//使用 satisfies Theme 确保导出的配置符合主题类型要求
