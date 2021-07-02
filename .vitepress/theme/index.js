import DefaultTheme from 'vitepress/theme'

import Archives from './components/Archives.vue'
import Tags from './components/Tags.vue'
import Home from './components/Home.vue'

import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        // 注册组件
        app.component('Tags', Tags)
        app.component('Archives', Archives)
        app.component('Home', Home)
    }
}
