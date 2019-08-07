import Vue from 'vue'
import Vuex from 'vuex'

import { defaultClient as apolloClient } from './main';

import {
    GET_POSTS, SIGNIN_USER, SIGNUP_USER,
    GET_CURRENT_USER
} from './queries';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      posts: [],
      user: null,
      loading: false
  },

  mutations: {
      setPosts: (state, payload) => {
          state.posts = payload;
      },

      setUser: (state, payload) => {
          state.user = payload;
      },

      setLoading: (state, payload) => {
          state.loading = payload;
      }
  },

  actions: {
      getCurrentUser: ({ commit }) => {
          commit('setLoading', true);

          apolloClient.query({
              query: GET_CURRENT_USER
          }).then(({ data }) => {
              commit('setLoading', false);
              commit('setUser', data.getCurrentUser);
          }).catch(err => {
              commit("setLoading", false);
              console.error(err);
          });;
      },

      getPosts: ({ commit }) => {
          apolloClient.query({
              query: GET_POSTS
          }).then(({ data }) => {
              commit('setPosts', data.getPosts);
              commit('setLoading', false);
          }).catch((e) => {
              commit('setLoading', true);
              console.error(e);
          });
      },

      signinUser: ({ commit }, payload) => {
          apolloClient.mutate({
              mutation: SIGNIN_USER,
              variables: payload
          }).then(({ data }) => {
              localStorage.setItem("token", data.signinUser.token);
          }).catch((err) => {
              console.log(err);
          });
      }
  },

  getters: {
      posts: state => state.posts,
      loading: state => state.loading
  }
})
