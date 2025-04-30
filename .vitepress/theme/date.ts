/**
 * 标准化日期时间格式（YYYY-MM-DD HH:mm）
 * @param input 可接受 Date 对象或字符串
 * @returns 标准化后的日期时间字符串
 */
export function convertDateV2(input: Date | string): string {
    if (typeof input === 'string' && input.includes('T')) {
        input = new Date(input)
    }
    if (input instanceof Date) {
        const pad = (n: number) => n.toString().padStart(2, '0')
        return [input.getFullYear(), pad(input.getMonth() + 1), pad(input.getDate())].join('-')
    }

    // 处理字符串类型输入
    const parts = input.trim().split(/\s+/)
    const datePart = parts[0]

    // 如果没有时间部分，或时间部分为空，直接返回日期
    if (parts.length < 2 || parts[1].trim() === '') {
        return datePart
    }

    // 处理有效时间部分的补零
    const timeComponents = parts[1].split(':').map((component) => component.padStart(2, '0'))

    return `${datePart} ${timeComponents.join(':')}`
}

export function convertDate(date = new Date().toString()) {
    const json_date = new Date(date).toJSON()
    return json_date.split('T')[0]
}
