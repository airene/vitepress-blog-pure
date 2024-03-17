---
page: true
title: page_12
aside: false
---
<script setup>
import Page from "../../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(88,96)
</script>
<Page :posts="posts" :pageCurrent="12" :pagesNum="12" />