---
page: true
title: page_4
aside: false
---
<script setup>
import Page from "../../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(30,40)
</script>
<Page :posts="posts" :pageCurrent="4" :pagesNum="10" />