import DefaultTheme from 'vitepress/theme'

import Archives from './components/Archives.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
import NewLayout from './components/NewLayout.vue'

import './custom.css'

export default {
    ...DefaultTheme,
    Layout: NewLayout,
    enhanceApp({ app }) {
        // 注册组件
        app.component('Tags', Tags)
        app.component('Archives', Archives)
        app.component('Page', Page)
    }
}
