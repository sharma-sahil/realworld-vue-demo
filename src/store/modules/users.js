import SessionService from "@/common/session.service";
import { api, setToken, clearToken } from "../api";
export default {
  namespaced: true,
  state: {
    user: null,
    profile: null,
    isAuthenticated: false
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    currentUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.isAuthenticated = true;
      SessionService.saveToken(payload.token)
    },
    removeUser(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.errors = {};
      SessionService.destroyToken();
    }
  },
  actions: {
    getUser: async function ({ commit }) {
      const user = await api.get("/user");
      commit("setUser", user);
    },
    loginUser: async function ({ commit }, { email, password }) {
      clearToken();

      return new Promise((resolve, reject) => {
        api.post("users/login", { user: { email, password } })
          .then(({ data }) => {
            setToken(data.user.token);
            commit("setUser", data.user);
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response.data);
          });
      });
    },
    createUser: async function ({ commit }, { username, email, password }) {
      clearToken();

      return new Promise((resolve, reject) => {
        api.post("users", {
          user: {
            username,
            email,
            password
          }
        })
          .then(({ data }) => {
            setToken(data.user.token);
            commit("setUser", data.user);
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response.data);
          });
      });
    },
    checkUserAuthorized: async function ({ commit }) {
      if (SessionService.getToken()) {
        const token = SessionService.getToken();
        setToken(token);
        const response = await api.get("/user");
        commit("setUser", response.data.user);
      }
    },
    updateuser(context, payload) {
      const user = {
        email: payload.email,
        username: payload.username,
        bio: payload.bio,
        image: payload.image
      };
      if (payload.password) {
        user.password = payload.password;
      }

      return api.put("user", user).then(({ data }) => {
        context.commit("setUser", data.user);
        return data;
      });
    },
    logout(context) {
      context.commit("removeUser");
    }
  }
};
