<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">Have an account?</router-link>
          </p>

          <ul class="error-messages">
            <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                v-model="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button @click="createUser" class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      username: "",
      password: "",
      email: "",
      errors: []
    };
  },
  methods: {
    createUser() {
      this.errors = [];
      let validForm = true;
      if (this.email === "") {
        validForm = false;
        this.errors.push("Email is required");
      }
      if (this.password === "") {
        validForm = false;
        this.errors.push("Password is required");
      }
      if (this.username === "") {
        validForm = false;
        this.errors.push("Username is required");
      }

      if (!validForm) {
        return;
      }

      this.$store
        .dispatch("users/createUser", {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/");
          this.errors = [];
        })
        .catch(err => {
          this.errors = [];
          const errorKeys = Object.keys(err.errors);
          for (const key of errorKeys) {
            const errorMessage = key + " " + err.errors[key];
            this.errors.push(errorMessage);
          }
        });
    }
  }
};
</script>
