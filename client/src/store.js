import Vue from 'vue'
import Vuex from 'vuex'

import { gql } from 'apollo-boost';
import { defaultClient as apolloClient } from './main';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      posts: []
  },

  mutations: {
      setPosts: (state, payload) => {
          state.posts = payload;
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
          }).catch(e => console.error(e));
      }
  },

  getters: {
      posts: state => state.posts
  }
})
