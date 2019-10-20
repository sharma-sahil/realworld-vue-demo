<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <NagpArticleMeta :article="article" :actions="true"></NagpArticleMeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="parseMarkdown(article.body)"></div>
          <ul class="tag-list">
            <li v-for="(tag, index) of article.tagList" :key="tag + index">
              <!-- <router-link :to="homeRoute" :class="className" v-text="name"></router-link>
              <RwvTag :name="tag" class="tag-default tag-pill tag-outline"></RwvTag>-->
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <NagpArticleMeta :article="article" :actions="true"></NagpArticleMeta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <div>
            <!-- <RwvListErrors :errors="errors" /> -->
            <form class="card comment-form" @submit.prevent="submitComment(article_slug, comment)">
              <div class="card-block">
                <textarea
                  class="form-control"
                  v-model="comment"
                  placeholder="Write a comment..."
                  rows="3"
                ></textarea>
              </div>
              <div class="card-footer">
                <img :src="currentUser.image" class="comment-author-img" />
                <button class="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>
          </div>

          <div class="card" v-for="(com, index) in comments" :key="index">
            <div class="card-block">
              <p class="card-text">{{ com.body }}</p>
            </div>
            <div class="card-footer">
              <a href class="comment-author">
                <img :src="com.author.image" class="comment-author-img" />
              </a>
              <router-link
                class="comment-author"
                :to="{ name: 'profile', params: { username: com.author.username } }"
              >{{ com.author.username }}</router-link>
              <span class="date-posted">{{ formatDate(com.createdAt) }}</span>
              <span v-if="isCurrentUser(com)" class="mod-options">
                <i class="ion-trash-a" @click="destroy(article_slug, com.id)"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import store from "@/store";
import moment from "moment";

import NagpArticleMeta from "@/components/ArticleMeta";

export default {
  name: "nagp-article",
  props: {
    article_slug: {
      type: String,
      required: true
    }
  },
  components: {
    NagpArticleMeta
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("articles/fetchArticle", to.params.article_slug),
      store.dispatch("articles/fetchComments", to.params.article_slug)
    ]).then(() => {
      next();
    });
  },
  data() {
    return {
      comment: "",
      errors: {}
    };
  },
  computed: {
    article() {
      return this.$store.getters["articles/article"];
    },
    comments() {
      return this.$store.getters["articles/comments"];
    },
    isAuthenticated() {
      return this.$store.getters["users/isAuthenticated"];
    },
    currentUser() {
      return this.$store.getters["users/currentUser"];
    }

    // homeRoute: () => ({ name: "home-tag", params: { tag: name } })
    // ...mapGetters(["articles/article", "currentUser", "comments", "isAuthenticated"])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    },
    isCurrentUser(com) {
      if (this.currentUser.username && com.author.username) {
        return com.author.username === this.currentUser.username;
      }
      return false;
    },
    submitComment(slug, comment) {
      this.$store
        .dispatch("articles/createComment", { slug, comment })
        .then(() => {
          this.comment = null;
          this.errors = {};
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    },
    destroy(slug, commentId) {
      this.$store.dispatch("articles/destroyComment", { slug, commentId });
    },
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
