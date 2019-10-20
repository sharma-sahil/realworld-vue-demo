<template>
  <div class="article-preview">
    <NagpArticleMeta isPreview :article="article"></NagpArticleMeta>
    <router-link :to="`/article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>

<script>
import moment from "moment";
import NagpArticleMeta from "@/components/ArticleMeta.vue";
export default {
  name: "NagpArticlePreview",
  components: {
    NagpArticleMeta
  },
  props: ["article"],
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
