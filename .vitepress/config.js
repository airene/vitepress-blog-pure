const getPosts = require('./theme/utils')
async function config() {
    return {
        title: 'vitepress-blog',
        description: 'vitepress,blog,blog-theme',
        themeConfig: {
            posts: await getPosts(),
            nav: [
                { text: 'Home', link: '/' },
                { text: 'Archives', link: '/pages/archives' },
                { text: 'Tags', link: '/pages/tags' },
                { text: 'About', link: '/pages/about' }
                // { text: 'Airene', link: 'http://airene.net' }  -- External link test
            ]
        }
    }
}

module.exports = config()
