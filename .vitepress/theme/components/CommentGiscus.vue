<template>
    <div id="giscus-container"></div>
</template>

<script setup>
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { useData, useRoute } from 'vitepress'

const { frontmatter, theme } = useData()
const route = useRoute()
let { repo, repoId, categoryId } = theme.value.comment
giscusTalk(
    {
        repo: repo,
        repoId: repoId,
        category: 'General',
        categoryId: categoryId,
        mapping: 'pathname',
        inputPosition: 'top',
        lang: 'en',
        lightTheme: 'light',
        darkTheme: 'transparent_dark'
    },
    {
        frontmatter,
        route
    },
    true
)
</script>
