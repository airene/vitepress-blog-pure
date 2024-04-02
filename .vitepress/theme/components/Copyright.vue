<template>
    <div class="site-footer">
        <a class="vitepress" :href="website">{{ webTitle }}</a>
        <a class="ml-4" href="https://beian.miit.gov.cn/">沪ICP备2024051666号</a>
        <br />
        Powered by
        <a class="vitepress" target="_blank" href="//vitepress.vuejs.org/">VitePress</a>
        Theme by
        <a class="vitepress" target="_blank" href="//github.com/airene/vitepress-blog-pure">Vitepress-blog</a>
    </div>
</template>
<script lang="ts" setup>
import { useData } from 'vitepress'

const { site, theme } = useData()
const website = theme.value.website
const webTitle = site.value.title
</script>

<style>
.site-footer {
    color: #888;
    text-align: center;
    font-size: 0.75rem;
    width: 100%;
    padding: 15px 0;
    overflow: auto;
}
.vitepress {
    color: var(--vp-c-text-1);
    font-weight: 700;
}
</style>
