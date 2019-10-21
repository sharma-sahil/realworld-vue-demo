<template>
  <div class="home-tag">
    <ArticlePreview v-for="article in articles" :key="article.slug" :article="article"></ArticlePreview>
  </div>
</template>

<script>
import ArticlePreview from "@/components/ArticlePreview.vue";
export default {
  name: "NagpViewTag",
  components: {
    ArticlePreview
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    },
    articles() {
      return this.$store.state.articles.feed || [];
    }
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch("articles/fetchArticles", {
        tag: this.tag
      });
    }
  }
};
</script>
