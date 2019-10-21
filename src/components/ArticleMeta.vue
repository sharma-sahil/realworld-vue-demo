<template>
  <div class="article-meta">
    <router-link :to="{ name: 'profile', params: { username: article.author.username } }">
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{ name: 'profile', params: { username: article.author.username } }"
        class="author"
      >{{ article.author.username }}</router-link>
      <span class="date">{{ formatDate(article.createdAt) }}</span>
    </div>
    <template v-if="actions">
      <!-- Used when user is also author -->
      <span v-if="isCurrentUser()">
        <router-link class="btn btn-sm btn-outline-secondary" :to="editArticleLink">
          <i class="ion-edit"></i>
          <span>&nbsp;Edit Article</span>
        </router-link>
        <span>&nbsp;&nbsp;</span>
        <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
          <i class="ion-trash-a"></i>
          <span>&nbsp;Delete Article</span>
        </button>
      </span>
      <!-- Used in ArticleView when not author -->
      <span v-else>
        <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
          <i class="ion-plus-round"></i>
          <span>&nbsp;</span>
          <span v-text="followUserLabel" />
        </button>
        <span>&nbsp;&nbsp;</span>
        <button class="btn btn-sm" @click="toggleFavorite" :class="toggleFavoriteButtonClasses">
          <i class="ion-heart"></i>
          <span>&nbsp;</span>
          <span v-text="favoriteArticleLabel" />
          <span>&nbsp;</span>
          <span class="counter" v-text="favoriteCounter" />
        </button>
      </span>
    </template>
    <template v-else>
      <button
        class="btn btn-sm pull-xs-right"
        v-if="!actions"
        :class="{
          'btn-primary': article.favorited,
          'btn-outline-primary': !article.favorited
        }"
      >
        <i class="ion-heart"></i>
        <span class="counter">{{ article.favoritesCount }}</span>
      </button>
    </template>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "NagpArticleMeta",
  props: {
    article: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters["users/currentUser"];
    },
    editArticleLink() {
      return { name: "article-edit", params: { slug: this.article.slug } };
    },
    toggleFavoriteButtonClasses() {
      return {
        "btn-primary": this.article.favorited,
        "btn-outline-primary": !this.article.favorited
      };
    },
    // followUserLabel() {
    //   return `${this.profile.following ? "Unfollow" : "Follow"} ${
    //     this.article.author.username
    //   }`;
    // },
    favoriteArticleLabel() {
      return this.article.favorited ? "Unfavorite Article" : "Favorite Article";
    },
    favoriteCounter() {
      return `(${this.article.favoritesCount})`;
    }
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    },
    isCurrentUser() {
      if (null !== this.currentUser) {
        if (this.currentUser.username && this.article.author.username) {
          return this.article.author.username === this.currentUser.username;
        }
      }
      return false;
    },
    // toggleFavorite() {
    //   if (!this.isAuthenticated) {
    //     this.$router.push({ name: "login" });
    //     return;
    //   }
    //   const action = this.article.favorited ? FAVORITE_REMOVE : FAVORITE_ADD;
    //   this.$store.dispatch(action, this.article.slug);
    // },
    // toggleFollow() {
    //   if (!this.isAuthenticated) {
    //     this.$router.push({ name: "login" });
    //     return;
    //   }
    //   const action = this.article.following
    //     ? FETCH_PROFILE_UNFOLLOW
    //     : FETCH_PROFILE_FOLLOW;
    //   this.$store.dispatch(action, {
    //     username: this.profile.username
    //   });
    // },
    async deleteArticle() {
      try {
        await this.$store.dispatch("articles/deleteArticle", this.article.slug);
        this.$router.push("/");
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
