function generatePaginationArray(pagesNum: number, currentPage: number, margin: number = 1): (number | string)[] {
    // 参数保护
    pagesNum = Math.max(1, pagesNum)
    margin = Math.max(0, margin)
    currentPage = Math.min(Math.max(currentPage, 1), pagesNum)

    const result: (number | string)[] = []
    const pagesSet = new Set<number>()

    // 始终显示第一页和最后一页
    pagesSet.add(1)
    pagesSet.add(pagesNum)

    if (pagesNum <= margin * 2 + 5) {
        // 页数很少，不需要插入省略号
        for (let i = 2; i < pagesNum; i++) {
            pagesSet.add(i)
        }
    } else if (currentPage <= margin + 2) {
        // 当前页靠前
        for (let i = 2; i <= Math.max(margin * 2 + 2, currentPage + margin); i++) {
            if (i < pagesNum) pagesSet.add(i)
        }
    } else if (currentPage >= pagesNum - (margin + 1)) {
        // 当前页靠后
        for (let i = Math.max(2, pagesNum - (margin * 2 + 1)); i < pagesNum; i++) {
            pagesSet.add(i)
        }
    } else {
        // 当前页在中间
        for (let i = currentPage - margin; i <= currentPage + margin; i++) {
            if (i > 1 && i < pagesNum) pagesSet.add(i)
        }
        // 额外保留前后两个页码
        pagesSet.add(2)
        pagesSet.add(pagesNum - 1)
    }

    const sortedPages = Array.from(pagesSet).sort((a, b) => a - b)

    // 插入省略号
    let prev = 0
    for (const page of sortedPages) {
        if (page - prev > 1) {
            result.push('...')
        }
        result.push(page)
        prev = page
    }

    return result
}

export { generatePaginationArray }
