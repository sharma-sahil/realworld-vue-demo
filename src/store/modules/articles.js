import { api } from "../api";
import Vue from "vue";
export default {
  namespaced: true,
  state: {
    feed: [],
    count: 0,
    article: {
      author: {},
      title: "",
      description: "",
      body: "",
      tagList: []
    },
    comments: []
  },
  getters: {
    article(state) {
      return state.article;
    },
    comments(state) {
      return state.comments;
    }
  },
  mutations: {
    setArticles(state, { articles, articlesCount }) {
      state.feed = articles;
      state.count = articlesCount;
    },
    setArticle(state, article) {
      state.article = article;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    resetState() {
      this.state.articles.article = {
        author: {},
        title: "",
        description: "",
        body: "",
        tagList: []
      };
      this.state.articles.comments = [];

    }
  },
  actions: {
    async getGlobalFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles";
      if (payload) {
        const {
          tag = null,
          author = null,
          favourited = null,
          page = 1
        } = payload;
        route += tag ? `?tag=${tag}&` : "";
        route += author ? `?author=${author}&` : "";
        route += favourited ? `?favourited=${favourited}&` : "";
        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
      }
      const response = await api.get(route);
      commit("setArticles", response.data);
    },
    async getUserFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles/feed";
      if (payload) {
        const { page = 1 } = payload;
        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
      }
      const response = await api.get(route);
      commit("setArticles", response.data);
    },
    async publishArticle({ commit }, request) {
      try {
        const response = await api.post("articles", {
          article: request
        });
        if (response.data) {
          return response;
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async fetchArticle(context, articleSlug, prevArticle) {
      // avoid extronuous network call if article exists
      if (prevArticle !== undefined) {
        return context.commit("setArticle", prevArticle);
      }
      let url = 'articles';
      if (articleSlug) {
        url += '/' + articleSlug;
      }
      const { data } = await api.get(url);
      context.commit("setArticle", data.article);
      return data;
    },
    async fetchComments(context, articleSlug) {
      const url = 'articles/' + articleSlug + '/comments';
      const { data } = await api.get(url);
      context.commit("setComments", data.comments);
      return data.comments;
    },
    async createComment(context, payload) {
      try {
        const url = 'articles/' + payload.slug + '/comments';
        const request = {
          comment: {
            body: payload.comment
          }
        }
        const response = await api.post(url, request);
        if (response.data) {
          context.dispatch("fetchComments", payload.slug);
          return response;
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async destroyComment(context, payload) {
      const url = 'articles/' + payload.slug + '/comments/' + payload.commentId;
      const response = await api.delete(url);
      if (response.data) {
        context.dispatch("fetchComments", payload.slug);
        return response;
      }
    },
    async deleteArticle(context, slug) {
      const url = 'articles/' + slug;
      return api.delete(url);
    },
    resetArticleState({ commit }) {
      commit("resetState");
    },
    async editArticle({ commit }, payload) {
      const request = {
        article: payload
      };
      try {
        const url = 'articles/' + payload.slug;
        const response = await api.put(url, request)
        if (response.data) {
          return response;
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  }
};
