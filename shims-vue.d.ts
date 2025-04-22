//声明一个模块，用于处理所有以 .vue 扩展名的文件。
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    //声明一个常量 component，其类型为 DefineComponent。
    const component: DefineComponent<{}, {}, any>
    export default component
}

/*
shims-vue.d.ts 文件是一个 TypeScript 的类型声明文件，它为 Vue 组件文件（.vue）提供类型定义

这个 shims-vue.d.ts 文件为 Vue 组件文件（.vue）提供了 TypeScript 的类型声明。它帮助 TypeScript 理解 .vue 文件的结构和类型信息，使得在使用 Vue 组件时可以享受类型检查和智能提示等 TypeScript 的优势。

*/
