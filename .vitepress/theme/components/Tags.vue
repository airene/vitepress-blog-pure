<template>
    <div class="tags">
        <span @click="toggleTag(key)" v-for="(item, key) in data" class="tag">
            {{ key }} <strong>{{data[key].length}}</strong>
        </span>
    </div>
    <div class="header">{{ selectTag }}</div>
    <a :href="withBase(article.regularPath)" v-for="(article, index) in data[selectTag]" :key="index" class="article">
        <div class="titleDiv">
            <div class="title-o"></div>
            {{ article.frontMatter.title }}
        </div>
        <div class="date">{{ article.frontMatter.date }}</div>
    </a>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useData,withBase } from 'vitepress'
import { initTags } from '../functions'

const { theme } = useData()
const data = computed(() => initTags(theme.value.posts))
let selectTag = ref('')
const toggleTag = (tag: string) => {
    selectTag.value = tag
}
</script>

<style scoped>
.tags {
    margin-top: 14px;
    display: flex;
    flex-wrap: wrap;
}
.tag {
    display: inline-block;
    padding: 4px 16px;
    margin: 6px 8px;
    font-size: 0.875rem;
    line-height: 25px;
    background-color: var(--vp-c-bg-soft);
    transition: 0.4s;
    border-radius: 3px;
    color: var(--vp-c-text-1);
    cursor: pointer;
}
.tag strong {color:var(--vp-c-brand)}
.header {
    font-size: 2rem;
    font-weight: 600;
    margin: 1rem 0;
    text-align: center;
}

@media screen and (max-width: 700px) {
    .header {
        font-size: 1.5rem;
    }
    .date {
        font-size: 0.75rem;
    }
}
</style>
