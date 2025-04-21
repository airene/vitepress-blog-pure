<template>
    <Layout>
        <template #doc-before>
            <div style="padding-top: 20px" class="post-info" v-if="!$frontmatter.page">
                {{ $frontmatter.date?.substring(0, 10) }} &nbsp;&nbsp;
                <span v-for="item in $frontmatter.tags"
                    ><a :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span
                >
            </div>
        </template>
        <template #page-bottom>
            <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;">
                <Comment /> <!-- 评论组件现在位于页面底部 -->
            </div>
        </template>
    </Layout>
    <Copyright />
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import { withBase } from 'vitepress'
const { Layout } = DefaultTheme
</script>
