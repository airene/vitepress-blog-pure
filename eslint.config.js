export default {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            // tsx: true,
            jsx: true
        }
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'array-bracket-newline': ['error', 'consistent']
    }
}
