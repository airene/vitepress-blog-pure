<template>
    <div style="padding: 0 1.2rem">
        <div v-for="(article, index) in posts" :key="index" class="list">
            <div class="list-header">
                <div class="list-li">
                    <a :href="article.regularPath"> {{ article.frontMatter.title }}</a>
                </div>
                <time datetime="2020-10-25" class="date">
                    {{ article.frontMatter.date }}
                </time>
            </div>
            <p class="describe">
                {{ article.frontMatter.description }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
const { theme } = useData()
const posts = computed(() => theme.value.pages)
</script>

<style scoped>
.list {
    border-bottom: 1px dashed var(--c-divider-light);
    padding: 1rem 0 0 0;
}
.list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.list-li {
    font-size: 1.25rem;
    font-weight: 400;
    margin: 0.1rem 0;
}

.describe {
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: #71717a;
    margin: 0.625rem 0 1rem;
}

@media screen and (max-width: 720px) {
    .list {
        padding: 1rem 0 0 0;
    }
    .list-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .list-li {
        font-size: 1.125rem;
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
    .date {
        font-size: 0.8125rem;
    }
}
</style>
