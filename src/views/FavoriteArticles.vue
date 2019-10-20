<template>
  <div class="profile-page">
    <!-- <RwvArticleList :favorited="favorited" :items-per-page="5">
    </RwvArticleList>-->
    <ArticlePreview v-for="article in favoriteArticles" :key="article.slug" :article="article"></ArticlePreview>
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
    favorited() {
      return this.$route.params.username;
    },
    favoriteArticles() {
      return this.$store.state.articles.feed || [];
    }
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch("articles/fetchArticles", {
        favourited: this.favorited
      });
    }
  }
};
</script>
