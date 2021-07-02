const getPages = require('./theme/utils')
async function config() {
    return {
        title: 'react.dev',
        description: 'fangying.dev,half code,half designer',
        themeConfig: {
            pages: await getPages(),
            nav: [
                { text: 'Home', link: '/' },
                { text: 'Archives', link: '/pages/archives' },
                { text: 'Tags', link: '/pages/tags' },
                { text: 'About', link: '/pages/about' }
                // { text: 'Airene', link: 'http://airene.net' }
            ]
        }
    }
}

module.exports = config()
