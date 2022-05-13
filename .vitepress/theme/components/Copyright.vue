<template>
    <div class="site-footer">
        MIT Licensed | Copyright © 2021-2022 <a class="vitepress" :href="website">{{ webTitle }}</a
        ><br />
        Powered by
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
    height: 50px;
    text-align: center;
    font-size: 0.75rem;
    width: 100%;
}
.vitepress {
    color: #222;
    font-weight: 700;
}
</style>
