<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <li v-for="(value, key) in errors" :key="key">
              <span v-text="key" />
              <span v-for="err in value" :key="err" v-text="err" />
            </li>
          </ul>
          <form @submit.prevent="onPublish()">
            <fieldset>
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
                  placeholder="Enter tags"
                  v-model="tagInput"
                  @keypress.enter.prevent="addTag(tagInput)"
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
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "createArticle",
  data() {
    return {
      tagInput: null,
      inProgress: false,
      errors: {},
      article: {
        tagList: []
      }
    };
  },
  methods: {
    onPublish() {
      this.inProgress = true;
      this.$store
        .dispatch("articles/publishArticle", this.article)
        .then(({ data }) => {
          console.log(data);
          this.inProgress = false;
          console.log(data.article.slug);
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
      this.article.tagList.push(tag);
      this.tagInput = null;
    }
  }
};
</script>