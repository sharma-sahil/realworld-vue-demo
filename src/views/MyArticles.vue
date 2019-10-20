<template>
  <div class="profile-page">
    <ArticlePreview v-for="article in myArticles" :key="article.slug" :article="article"></ArticlePreview>
  </div>
</template>

<script>
import ArticlePreview from "@/components/ArticlePreview.vue";

export default {
  name: "NagpFavouriteArticles",
  components: {
    ArticlePreview
  },
  computed: {
    author() {
      return this.$route.params.username;
    },
    myArticles() {
      return this.$store.state.articles.feed || [];
    }
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch("articles/fetchArticles", {
        author: this.author
      });
    }
  }
};
</script>
