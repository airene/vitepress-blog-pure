//ESLint 的配置文件，用于定义代码质量和风格的规则
export default {
    env: {
        //启用浏览器环境，允许使用浏览器提供的全局变量（如 window、document 等）
        browser: true,
        es2021: true,
        //启用 Node.js 环境，允许使用 Node.js 提供的全局变量（如 require、module 等）。
        node: true
    },
    //继承其他 ESLint 配置，简化配置过程。
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
    //指定用于解析代码的解析器，这里使用的是 vue-eslint-parser，它支持解析 Vue 文件。
    parser: 'vue-eslint-parser',
    //为解析器提供额外的选项。
    parserOptions: {
        parser: '@typescript-eslint/parser',
        //指定 ECMAScript 版本为 2021
        ecmaVersion: 2021,
        //指定源代码模块类型为 ES 模块
        sourceType: 'module',
        //启用额外的语法特性
        ecmaFeatures: {
            // tsx: true,
            jsx: true
        }
    },
    plugins: ['vue', '@typescript-eslint'],
    //自定义 ESLint 规则，可以覆盖继承的规则。
    rules: {
        //强制数组括号的换行风格要一致
        'array-bracket-newline': ['error', 'consistent']
    }
}
