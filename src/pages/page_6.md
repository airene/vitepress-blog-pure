---
page: true
title: page_6
aside: false
---
<script setup>
import Page from "../../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(50,60)
</script>
<Page :posts="posts" :pageCurrent="6" :pagesNum="10" />