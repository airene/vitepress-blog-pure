---
page: true
title: page_7
aside: false
---
<script setup>
import Page from "../../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(60,70)
</script>
<Page :posts="posts" :pageCurrent="7" :pagesNum="10" />