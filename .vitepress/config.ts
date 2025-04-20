import { defineConfig } from 'vitepress'
import { getPosts } from './theme/pageService'

//每页的文章数量
const pageSize = 8

export default defineConfig({
    title: `MagicCode - 芝麻开门`,
    description: `Fisher's Blog. Learn to ask questions, good questions are more important than answers`,
    base: '/',
    ignoreDeadLinks: true,
    //lastUpdated: true,
    //cleanUrls: true,
    //srcDir: ".vitrepress/pages",
    //outDir: ".vitepress/pages", // 确保输出目录正确
    //cacheDir: ".vitepress/cache", //default value:.vitepress/cache
    themeConfig: {
        logo: "/32.png",
        posts: await getPosts(pageSize),
        website: 'https://github.com/FisherMS', //copyright link
        // blogs page show firewokrs animation
        showFireworksAnimation: true,
        // outline: 2, //设置右侧aside显示层级
        aside: true,
        //outline:[2,3],
        outline: {
            label: '文章摘要'
        },
        search: {
            provider: 'local'
        },
        nav: [
            { text: '🏡Home', link: '/' },
            { text: '📚 Category', link: '/pages/category' },
            { text: '📃Archives', link: '/pages/archives' },
            { text: '🔖Tags', link: '/pages/tags' },
            { text: 'ℹ️About', link: '/pages/about' }
            // { text: 'Airene', link: 'http://airene.net' }  -- External link test
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/FisherMS' },
            { icon: 'twitter', link: 'https://x.com/AicroSupport' },
            {
                icon: {
                    svg: `<svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20">
                <path d="M874.666667 375.189333V746.666667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V375.189333l266.090667 225.6a149.333333 149.333333 0 0 0 193.152 0L874.666667 375.189333zM810.666667 213.333333a64.789333 64.789333 0 0 1 22.826666 4.181334 63.616 63.616 0 0 1 26.794667 19.413333 64.32 64.32 0 0 1 9.344 15.466667c2.773333 6.570667 4.48 13.696 4.906667 21.184L874.666667 277.333333v21.333334L553.536 572.586667a64 64 0 0 1-79.893333 2.538666l-3.178667-2.56L149.333333 298.666667v-21.333334a63.786667 63.786667 0 0 1 35.136-57.130666A63.872 63.872 0 0 1 213.333333 213.333333h597.333334z" ></path>
                </svg>`
                },
                link: 'mailto:fisher@aicro.net'
            }
        ]
    } as any,
    srcExclude: ['README.md'], // exclude the README.md , needn't to compiler
    vite: {
        //build: { minify: false }
        server: { port: 5000 }
    }
})
