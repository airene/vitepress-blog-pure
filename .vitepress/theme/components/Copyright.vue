<template>
    <div class="site-footer">
        MIT Licensed | Copyright © 2021 <a :href="website">{{ webTitle }}</a> Powered by
        <a class="vitepress" target="_blank" href="//vitepress.vuejs.org/">VitePress</a>
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
    color: #999;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 0.625rem;
    //position: absolute;
    bottom: 0;
    width: 100vw;
    z-index: 1000;
}
</style>
<style scoped>
.vitepress {
    color: #222;
}
</style>
