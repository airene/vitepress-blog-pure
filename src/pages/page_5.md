---
page: true
title: page_5
aside: false
---
<script setup>
import Page from "../../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(40,50)
</script>
<Page :posts="posts" :pageCurrent="5" :pagesNum="10" />