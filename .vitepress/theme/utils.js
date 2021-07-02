const fs = require('mz/fs')
const globby = require('globby')
const matter = require('gray-matter')

function _rTime(date) {
    const json_date = new Date(date).toJSON()
    return json_date.split('T')[0]
}

function _compareDate(obj1, obj2) {
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}

module.exports = async () => {
    const paths = await globby(['**.md'], {
        ignore: ['node_modules', 'README.md']
    })
    let pages = await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, 'utf-8')
            const { data } = matter(content)
            data.date = _rTime(data.date)
            return {
                frontMatter: data,
                regularPath: `/${item.replace('.md', '.html')}`
            }
        })
    )
    pages = pages.filter((item) => !item.frontMatter.page)
    pages.sort(_compareDate)
    return pages
}
