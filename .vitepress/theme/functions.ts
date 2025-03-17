type Post = {
    frontMatter: {
        date: string
        title: string
        category: string
        tags: string[]
        description: string
    }
    regularPath: string
}

export function initTags(posts: Post[]): Record<string, Post[]> {
    const data: Record<string, Post[]> = {}
    posts.forEach((post) => {
        post.frontMatter.tags?.forEach((tag) => {
            data[tag] = data[tag] || []
            data[tag].push(post)
        })
    })

    return Object.fromEntries(Object.entries(data).sort(([, posts1], [, posts2]) => posts2.length - posts1.length))
}

export function initCategory(posts: Post[]) {
    const data: Record<string, Post[]> = {}
    for (let index = 0; index < posts.length; index++) {
        const element = posts[index]
        const category = element.frontMatter.category
        if (category) {
            if (data[category]) {
                data[category].push(element)
            } else {
                data[category] = []
                data[category].push(element)
            }
        }
    }
    return data
}

export function useYearSort(post: Post[]) {
    const data: Post[][] = []
    let year = '0'
    let num = -1
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        if (element.frontMatter.date) {
            const y = element.frontMatter.date.split('-')[0]
            if (y === year) {
                data[num].push(element)
            } else {
                num++
                data[num] = []
                data[num].push(element)
                year = y
            }
        }
    }
    return data
}
