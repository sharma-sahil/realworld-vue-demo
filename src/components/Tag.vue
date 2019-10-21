<template>
  <router-link :to="homeRoute" :class="className" v-text="name"></router-link>
</template>

<script>
export default {
  name: "NagpTag",
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: "tag-pill tag-default"
    }
  },
  computed: {
    newRoute() {
      const url = "tag/" + this.name;
      return url;
    },
    homeRoute: () => ({ name: "home-tag", params: { tag: name } })
  }
};
</script>
