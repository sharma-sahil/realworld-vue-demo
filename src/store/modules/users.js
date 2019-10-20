import SessionService from "@/common/session.service";
import { api, setToken, clearToken } from "../api";
export default {
  namespaced: true,
  state: {
    user: null,
    profile: null,
    isAuthenticated: !!SessionService.getToken()
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
      try {
        const response = await api.post("/users/login", {
          user: {
            email,
            password
          }
        });
        if (response.data.user) {
          SessionService.saveToken(response.data.user.token);
          await setToken(response.data.user.token);
          await commit("setUser", response.data.user);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    createUser: async function ({ commit }, { username, email, password }) {
      clearToken();
      try {
        const response = await api.post("/users", {
          user: {
            username,
            email,
            password
          }
        });
        if (response.data.user) {
          setToken(response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
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
