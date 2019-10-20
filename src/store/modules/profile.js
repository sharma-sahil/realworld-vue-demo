import { api } from "../api";

export default {
    namespaced: true,
    state: {
        errors: {},
        profile: {}
    },
    getters: {
        profile(state) {
            return state.profile;
        }
    },
    mutations: {
        setProfile(state, profile) {
            state.profile = profile;
            state.errors = {};
        }
    },
    actions: {
        fetchProfile(context, payload) {
            const url = 'profiles/' + payload.username;
            return api.get(url)
                .then(({ data }) => {
                    context.commit("setProfile", data.profile);
                    return data;
                })
                .catch(() => {
                    // #todo SET_ERROR cannot work in multiple states
                    // context.commit(SET_ERROR, response.data.errors)
                });
        },
    }
}

