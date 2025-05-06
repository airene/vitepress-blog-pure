<template>
    <Layout>
        <template #doc-before>
            <div style="padding-top: 20px" class="post-info" v-if="!$frontmatter.page">
                {{ convertDateV2($frontmatter.date) }} &nbsp;&nbsp;
                <span v-for="item in $frontmatter.tags"
                    ><a :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span
                >
            </div>
        </template>
        <template #doc-bottom>
            <Comment />
        </template>
    </Layout>
    <Copyright />
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import { withBase } from 'vitepress'
import { convertDateV2 } from '../date'
const { Layout } = DefaultTheme
</script>
