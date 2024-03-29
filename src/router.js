import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "tag/:tag",
          name: "home-tag",
          component: () => import("@/views/ViewTag")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/Settings.vue")
    },
    {
      path: "/editor",
      name: "editor_new",
      component: () => import("@/views/ArticleCreate.vue")
    },
    {
      path: "/editor/:article_slug",
      name: "editor_edit",
      component: () => import("@/views/ArticleEdit.vue")
    },
    {
      path: "/article/:article_slug",
      name: "article",
      component: () => import("@/views/Article.vue"),
      props: true
    },
    {
      path: "/@:username",
      component: () => import("@/views/Profile.vue"),
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("@/views/MyArticles")
        },
        {
          name: "profile-favorites",
          path: "favorites",
          component: () => import("@/views/FavoriteArticles")
        }
      ]
    }
  ]
});
