<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'
const { theme } = useData()
const { repo, issueTerm = 'pathname', themes = 'github-light' } = theme.value.comment
const utterancesRef = ref()
onMounted(() => {
    if (repo) {
        let utterances = document.createElement('script')
        utterances.async = true
        utterances.setAttribute('src', 'https://utteranc.es/client.js')
        utterances.setAttribute('repo', repo)
        utterances.setAttribute('issue-term', issueTerm)
        utterances.setAttribute('theme', themes)
        utterances.setAttribute('crossorigin', 'anonymous')
        utterancesRef.value.appendChild(utterances)
    }
})
</script>

<template>
    <div ref="utterancesRef"></div>
</template>

<style>
/*global  style*/
.utterances {
    max-width: inherit !important;
}
</style>
