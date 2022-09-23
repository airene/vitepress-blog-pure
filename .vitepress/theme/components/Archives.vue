<template>
    <div style="padding-top: 10px">
        <div v-for="yearList in data">
            <div class="year">
                {{ yearList[0].frontMatter.date.split('-')[0] }}
            </div>
            <a :href="withBase(article.regularPath)" v-for="(article, index) in yearList" :key="index" class="article">
                <div class="titleDiv">
                    <div class="title-o"></div>
                    {{ article.frontMatter.title }}
                </div>
                <div class="date">{{ article.frontMatter.date.slice(5) }}</div>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useData,withBase } from 'vitepress'
import { computed } from 'vue'
import { useYearSort } from '../functions'

const { theme } = useData()
const data = computed(() => useYearSort(theme.value.posts))
</script>

<style scoped>
.year {
    padding: 16px 0 8px 0;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: var(--date-font-family);
}
</style>
