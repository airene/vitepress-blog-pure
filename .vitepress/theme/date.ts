/**
 * 标准化日期时间格式（YYYY-MM-DD HH:mm）
 * @param input 可接受 Date 对象或字符串
 * @returns 标准化后的日期时间字符串
 */
export function convertDateV2(input: Date | string): string {
    // 如果是 ISO 字符串，如 "2025-05-01T12:30:00Z"，转成 Date
    if (typeof input === 'string' && input.includes('T')) {
        input = new Date(input)
    }

    // 如果是 Date 实例，格式化为 "YYYY-MM-DD"
    if (input instanceof Date && !isNaN(input.getTime())) {
        const pad = (n: number) => n.toString().padStart(2, '0')
        return [input.getFullYear(), pad(input.getMonth() + 1), pad(input.getDate())].join('-')
    }

    // 如果是字符串，进行拆解处理
    if (typeof input === 'string') {
        const trimmed = input.trim()
        const parts = trimmed.split(/\s+/)
        const datePart = parts[0]

        if (parts.length < 2 || parts[1].trim() === '') {
            return datePart
        }

        const timeComponents = parts[1].split(':').map((component) => component.padStart(2, '0'))
        return `${datePart} ${timeComponents.join(':')}`
    }

    return ''
}

export function convertDate(date = new Date().toString()) {
    const json_date = new Date(date).toJSON()
    return json_date.split('T')[0]
}
