---
page: true
title: page_11
aside: false
---
<script setup>
import Page from "../../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(80,88)
</script>
<Page :posts="posts" :pageCurrent="11" :pagesNum="12" />