<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li v-if="isAuthenticated" class="nav-item">
          <router-link class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>
        <li v-if="isAuthenticated" class="nav-item">
          <router-link class="nav-link" to="/settings">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li v-if="!isAuthenticated" class="nav-item">
          <router-link class="nav-link" to="/login">Sign in</router-link>
        </li>
        <li v-if="!isAuthenticated" class="nav-item">
          <router-link class="nav-link" to="/register">Sign up</router-link>
        </li>
        <li v-if="isAuthenticated" class="nav-item">
          <router-link class="nav-link" :to="`/@${username}`">
            {{ username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    username() {
      return this.$store.getters["users/username"];
    },
    isAuthenticated() {
      return this.$store.getters["users/isAuthenticated"];
    }
  }
};
</script>
