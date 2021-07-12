<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #page-bottom><div class="comment-hack">My custom sidebar top content</div></template>
    </Layout>
    <!--    <div class="site-footer">MIT Licensed | Copyright © 2021 Powered by VitePress</div>-->
</template>
<style>
.site-footer {
    background: #222;
    color: #888;
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
