const { getPosts, generatePaginationPages } = require('./theme/serverUtils')
async function config() {
    const pageSize = 10
    await generatePaginationPages(pageSize)
    return {
        title: 'vitepress-blog',
        description: 'vitepress,blog,blog-theme',
        themeConfig: {
            posts: await getPosts(),
            pageSize: pageSize,
            nav: [
                { text: 'Home', link: '/' },
                { text: 'Archives', link: '/pages/archives' },
                { text: 'Tags', link: '/pages/tags' },
                { text: 'About', link: '/pages/about' }
                // { text: 'Airene', link: 'http://airene.net' }  -- External link test
            ]
        },
        srcExclude: ['README.md'] // exclude the README.md , needn't to compiler
        /*vite: {
            build: { minify: false }
        },
        optimizeDeps: {
            keepNames: true
        }*/
    }
}

module.exports = config()
