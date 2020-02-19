import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    articles: []
  },
  getters: {
  },
  mutations: {
    SET_LOADING_STATUS (state, status) {
      state.isLoading = status
    },
    SET_ARTICLES (state, articles) {
      state.articles = articles
    }
  },
  actions: {
    fetchArticles: function (context) {
      context.commit('SET_LOADING_STATUS', true)
      Vue.axios.get('articles').then((result) => {
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_ARTICLES', result.data.articles)
      }).catch(error => {
        throw new Error(`API ${error}`)
      })
    }
  },
  modules: {
  }
})
