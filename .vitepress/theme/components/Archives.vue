<template>
    <div v-for="yearList in data">
        <div class="year">
            {{ yearList[0].frontMatter.date.split('-')[0] }}
        </div>
        <a :href="withBase(article.regularPath)" v-for="(article, index) in yearList" :key="index" class="posts">
            <div class="post-container">
                <div class="post-dot"></div>
                {{ article.frontMatter.title }}
            </div>
            <div class="date">{{ article.frontMatter.date.slice(5) }}</div>
        </a>
    </div>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { useYearSort } from '../functions'

const { theme } = useData()
const data = computed(() => useYearSort(theme.value.posts))
</script>

<style scoped>
.year {
    padding: 28px 0 10px 0;
    font-size: 1.375rem;
    font-weight: 600;
    color: var(--bt-theme-title);
    font-family: var(--date-font-family),serif;
}
</style>
