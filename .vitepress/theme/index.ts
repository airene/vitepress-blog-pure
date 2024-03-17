import DefaultTheme from 'vitepress/theme'

import NewLayout from './components/NewLayout.vue'
import Timeline from './components/Timeline.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'

import './custom.css'
import 'virtual:uno.css'

export default {
    ...DefaultTheme,
    Layout: NewLayout,
    enhanceApp({ app }) {
        // register global compoment
        app.component('Tags', Tags)
        app.component('Timeline', Timeline)
        app.component('Page', Page)
    }
}
