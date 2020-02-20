import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    articles: [],
    params: {
      query: '',
      date: null,
      filters: [],
      category: 'BiH',
      limit: 3,
      offset: 0
    }
  },
  getters: {
    encodedFilters: state => {
      return Buffer.from(this.params.filters).toString('base64')
    },
    articlesUrl: state => {
      const params = state.params
      let url = `articles?category=${params.category}&filters=${params.encodedFilters}&limit=${params.limit}&offset=${params.offset}`

      if (params.search !== '') {
        url = `${url}&search=${params.query}`
      }

      if (params.date) {
        url = `${url}&time=${params.date.unix()}`
      }

      return url
    }
  },
  mutations: {
    SET_PARAMS_LIMIT (state, limit) {
      state.params.limit = limit
    },
    SET_PARAMS_DATE (state, date) {
      state.params.date = date
    },
    SET_PARAMS_QUERY (state, query) {
      state.params.query = query
    },
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
      Vue.axios.get(this.getters.articlesUrl).then((result) => {
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_ARTICLES', result.data.articles)
      }).catch(error => {
        throw new Error(`API ${error}`)
      })
    },
    setLimit ({ commit, dispatch }, limit) {
      commit('SET_PARAMS_LIMIT', limit)
      dispatch('fetchArticles')
    },
    setDate ({ commit, dispatch }, date) {
      commit('SET_PARAMS_DATE', date)
      dispatch('fetchArticles')
    },
    setQuery ({ commit, dispatch }, query) {
      commit('SET_PARAMS_QUERY', query)
      dispatch('fetchArticles')
    }
  },
  modules: {
  }
})
