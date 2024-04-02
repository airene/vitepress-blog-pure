<template>
    <div v-for="(article, index) in posts" :key="index" class="post-list">
        <div class="post-header -mt-1">
            <div class="post-title">
                <a :href="withBase(article.regularPath)"> {{ article.frontMatter.title }}</a>
            </div>
        </div>
        <p
            v-if="article.frontMatter.description"
            class="describe indent-8"
            v-html="article.frontMatter.description"
        ></p>
        <div v-else class="mt-4"></div>
        <div class="post-info">
            <span class="mr-2">
                <img :src="timePng" class="time-img" />
                <span class="mt-2"> {{ article.frontMatter.date }}</span>
            </span>
            <span
                v-for="item in article.frontMatter.tags"
                class="hover:.dark:bg-blue-500 hover:.dark:text-slate-800 hover:bg-blue-200 tag rounded-full hover:font-extrabold"
            >
                <a :href="withBase(`/tags.html?tag=${item}`)"> {{ item }}</a>
            </span>
        </div>
    </div>

    <div class="pagination">
        <a
            class="link ml-1"
            :class="{ active: pageCurrent === i }"
            v-for="i in pagesNum"
            :key="i"
            :href="withBase(i === 1 ? '/pages/index.html' : `/pages/page_${i}.html`)"
            >{{ i }}</a
        >
    </div>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
import { PropType } from 'vue'

import timePng from '../assets/icon/time.png'

interface Article {
    regularPath: string
    frontMatter: {
        title: string
        description: string
        date: string
        tags: string[]
    }
}

const props = defineProps({
    posts: {
        type: Array as PropType<Article[]>,
        required: true
    },
    pageCurrent: {
        type: Number as PropType<number>,
        required: true
    },
    pagesNum: {
        type: Number as PropType<number>,
        required: true
    }
})
</script>

<style scoped>
.post-list {
    border-bottom: 1px solid rgba(78, 145, 200, 0.586);
    padding: 24px 0 14px 0;
}

.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.post-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0.1rem 0;
}

.describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    margin: 10px 0;
    line-height: 1.5rem;
}

.pagination {
    margin-top: 24px;
    display: flex;
    justify-content: center;
}

.link {
    display: inline-block;
    width: 24px;
    text-align: center;
    border: 1px var(--vp-c-divider-light) solid;
    border-right: none;
    font-weight: 400;
    border-radius: 25%;
}

.link.active {
    background: var(--vp-c-text-1);
    color: var(--vp-c-neutral-inverse);
    background-color: var(--vp-c-brand);
}

.dark .link.active {
    color: var(--vp-c-neutral-inverse);
    font-weight: bolder;
}

@media screen and (max-width: 768px) {
    .post-list {
        padding: 14px 0 14px 0;
    }
    .post-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .post-title {
        font-size: 1.0625rem;
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width: 17rem;
    }
    .describe {
        font-size: 0.9375rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin: 0.5rem 0 1rem;
    }
}
</style>
