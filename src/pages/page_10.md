---
page: true
title: page_10
aside: false
---
<script setup>
import Page from "../../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(90,100)
</script>
<Page :posts="posts" :pageCurrent="10" :pagesNum="10" />