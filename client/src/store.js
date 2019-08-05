import Vue from 'vue'
import Vuex from 'vuex'

import { gql } from 'apollo-boost';
import { defaultClient as apolloClient } from './main';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      posts: [],
      loading: false
  },

  mutations: {
      setPosts: (state, payload) => {
          state.posts = payload;
      },

      setLoading: (state, payload) => {
          state.loading = payload;
      }
  },

  actions: {
      getPosts: ({ commit }) => {
          apolloClient.query({
              query: gql`
                query {
                    getPosts {
                        _id
                        title
                        imageUrl
                    }
                }
              `
          }).then(({ data }) => {
              commit('setPosts', data.getPosts);
              commit('setLoading', false);
          }).catch((e) => {
              commit('setLoading', true);
              console.error(e);
          });
      }
  },

  getters: {
      posts: state => state.posts,
      loading: state => state.loading
  }
})
