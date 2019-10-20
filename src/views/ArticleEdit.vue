<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onPublish()">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="article.description"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model="article.body"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="tagInput"
                  @keypress.enter.prevent="addTag(tagInput)"
                  placeholder="Enter tags"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                :disabled="inProgress"
                type="submit"
              >Edit Articlee</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "NagpArticleEdit",
  props: {
    previousArticle: {
      type: Object,
      required: false
    }
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch("articles/resetArticleState");
    await store.dispatch(
      "articles/fetchArticle",
      to.params.article_slug,
      to.params.previousArticle
    );
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch("articles/resetArticleState");
    next();
  },
  data() {
    return {
      tagInput: null,
      inProgress: false,
      errors: {}
    };
  },
  computed: {
    article() {
      return this.$store.getters["articles/article"];
    }
  },
  methods: {
    onPublish() {
      this.inProgress = true;
      this.$store
        .dispatch("articles/editArticle", this.article)
        .then(({ data }) => {
          this.inProgress = false;
          this.$router.push({
            name: "article",
            params: { article_slug: data.article.slug }
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
    },
    removeTag(tag) {
      this.article.tagList = this.article.tagList.filter(t => t !== tag);
    },
    addTag(tag) {
      console.log({ tag });
      this.article.tagList.push(tag);
      this.tagInput = null;
    }
  }
};
</script>
