<template>
  <div class="tags">
    <span
      @click="toggleTag(String(key))"
      v-for="(_, key, index) in data"
      :key="`tag-${index}`"
      class="tag hover:.dark:bg-blue-500 hover:bg-blue-200 rounded-full"
      :class="{ active: selectTag == String(key) }"
    >
      {{ key }}
      <span class="count">{{ data[key].length }}</span>
    </span>
  </div>
  <div
    class="tag-header mt-6 mb-2"
    v-if="selectTag.length"
  >
    <img
      :src="tagPng"
      class="w-8 h-8 inline tag-img"
    />
    <span class="h-80">{{ selectTag }}</span>
  </div>
  <a
    :href="withBase(article.regularPath)"
    v-for="(article, index) in data[selectTag]"
    :key="index"
    class="posts"
  >
    <div class="post-container .dark:text-slate-200 font-bold mt-1 text-slate-900">
      <div class="post-dot"></div>
      {{ article.frontMatter.title }}
    </div>
    <div class="date">{{ article.frontMatter.date }}</div>
  </a>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { initTags } from '../utils'
import tagPng from '../assets/icon/tag.png'

const url = location.href.split('?')[1]
const params = new URLSearchParams(url)
const { theme } = useData()
const data = computed(() => initTags(theme.value.posts))

const selectTag = ref(params.get('tag') ? params.get('tag') : '')
const toggleTag = (tag: string) => {
  selectTag.value = tag
}
</script>

<style scoped>
.tags {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  font-weight: 600;
}

.tags .count {
  margin-left: 2px;
  font-weight: 600;
  font-size: 1rem;
  margin-left: 8px;
  color: var(--vp-c-brand);
}

.tags .count:hover {
  color: var(--tag-hover-color);
}

.tag {
  display: inline-block;
  padding: 1px 12px;
  margin: 4px 4px 6px 4px;
  font-size: 0.875rem;
  line-height: 25px;
  border: 1px solid var(--tag-border-color);
  transition: 0.4s;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.tags .tag.active {
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-sizing: border-box;
  font-weight: 900;
}

.tags .tag.active .count {
  color: var(--vp-c-brand);
  transition: 0.4s;
}

.tag:hover {
  border: 1px solid var(--tag-info-color);
  font-weight: 600;
}

.tag:hover .count {
  color: var(--tag-hover-color);
  transition: 0.4s;
}

.tag-header {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: left;
  color: var(--vp-c-brand);
}

.tag-img {
  margin-right: 8px;
  vertical-align: -45%;
}

@media screen and (max-width: 768px) {
  .tag-header {
    font-size: 1.5rem;
  }
  .date {
    font-size: 0.75rem;
  }
}
</style>
