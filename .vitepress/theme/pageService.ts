import { globby } from 'globby'
import matter from 'gray-matter'
import fs from 'fs-extra'
import { resolve } from 'path'

async function getPosts(pageSize: number) {
    let paths = await globby(['posts/**/**.md'])

    //生成分页页面markdown
    await generatePaginationPages(paths.length, pageSize)

    let posts = await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, 'utf-8')
            const { data } = matter(content)
            data.date = _convertDate(data.date)
            return {
                frontMatter: data,
                regularPath: `/${item.replace('.md', '.html')}`
            }
        })
    )
    posts.sort(_compareDate as any)
    return posts
}

async function generatePaginationPages(total: number, pageSize: number) {
    //  pagesNum
    let pagesNum = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1
    const paths = resolve('./')

    // const tempDir = resolve("./.vitepress/pages"); // VitePress专用目录
    // await fs.ensureDir(tempDir); // 确保临时目录存在
    // await fs.emptyDir(tempDir); // 清空旧文件（防止残留）

    if (total > 0) {
        for (let i = 1; i < pagesNum + 1; i++) {
            const page = `
---
page: true
title: ${i === 1 ? 'home' : 'page_' + i}
aside: false
---
<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(${pageSize * (i - 1)},${pageSize * i})
</script>
<Page :posts="posts" :pageCurrent="${i}" :pagesNum="${pagesNum}" />
`.trim();

            const file = paths + `/page_${i}.md`
            await fs.writeFile(file, page)

            // // 输出到临时目录
            // const outputPath = resolve(tempDir, `page_${i}.md`);
            // await fs.writeFile(outputPath, page);
        }
    }
    // rename page_1 to index for homepage
    await fs.move(paths + '/page_1.md', paths + '/index.md', { overwrite: true })

    // // 处理首页重命名
    // await fs.copy(resolve(tempDir, "page_1.md"), resolve(tempDir, "index.md"), {
    //     overwrite: true,
    // });
}

function _convertDate(date = new Date().toString()) {
    const json_date = new Date(date).toJSON()
    return json_date.split('T')[0]
}

function _compareDate(
    obj1: { frontMatter: { date: number } },
    obj2: { frontMatter: { date: number } }
) {
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

export { getPosts }
