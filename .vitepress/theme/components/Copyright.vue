<template>
    <div class="site-footer">
        Copyright © 2025 - Present  <a class="vitepress" :href="copyrightUrl">{{ copyrightName }}</a><br />
        Powered by <a class="vitepress" target="_blank" href="//vitepress.vuejs.org/">VitePress - 1.6.3</a>
        <!-- Theme by <a class="vitepress" target="_blank" href="//github.com/airene/vitepress-blog-pure">Vitepress-blog</a> -->
    </div>
</template>
<script lang="ts" setup>
import { useData } from 'vitepress'

const { site, theme } = useData()
const webTitle = site.value.title
const copyrightName = theme.value.copyrightName
const copyrightUrl = theme.value.copyrightUrl
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
