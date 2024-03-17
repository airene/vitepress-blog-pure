---
page: true
title: page_8
aside: false
---
<script setup>
import Page from "../../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(70,80)
</script>
<Page :posts="posts" :pageCurrent="8" :pagesNum="10" />