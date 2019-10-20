import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export const api = axios.create({
  baseURL: "https://conduit.productionready.io/api"
});

export function init() {
  Vue.use(VueAxios, axios);
}

export function setToken(jwt) {
  api.defaults.headers.common["Authorization"] = `Token ${jwt}`;
}

export function clearToken() {
  delete api.defaults.headers.common["Authorization"];
}
