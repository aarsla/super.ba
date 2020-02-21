import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueClipboard from 'vue-clipboard2'
import moment from 'moment'

Vue.use(Vuex)
Vue.use(VueClipboard)

export default new Vuex.Store({
  state: {
    isLoading: false,
    sources: [],
    articleId: String,
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
    joinedFilters: state => {
      return state.params.filters.join()
    },
    articleUrl: (state, getters) => {
      return `articles/${state.articleId}`
    },
    articlesUrl: (state, getters) => {
      const params = state.params
      let url = `articles?category.title=${params.category}&source.title!=${getters.joinedFilters}&skip=${params.offset}&limit=${params.limit}`

      if (params.query && params.query !== '') {
        url = `${url}&title=/${params.query}/i`
      }

      if (params.date) {
        const fromDate = moment(params.date).format('YYYY-MM-DD')
        url = `${url}&pubDate=${fromDate}`
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
    SET_PARAMS_FILTERS (state, filters) {
      state.params.filters = filters
    },
    SET_PARAMS_QUERY (state, query) {
      state.params.query = query
    },
    SET_LOADING_STATUS (state, status) {
      state.isLoading = status
    },
    SET_SOURCES (state, sources) {
      state.sources = sources.map(source => source.title)
    },
    SET_ARTICLE_ID (state, articleId) {
      state.articleId = articleId
    },
    SET_ARTICLES (state, articles) {
      state.articles = articles
    }
  },
  actions: {
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
    },
    setFilters ({ commit, dispatch }, filters) {
      commit('SET_PARAMS_FILTERS', filters)
      dispatch('fetchArticles')
    },
    setArticle ({ commit, dispatch }, articleId) {
      commit('SET_ARTICLE_ID', articleId)
    },
    fetchSources: function (context) {
      context.commit('SET_LOADING_STATUS', true)
      Vue.axios.get('sources').then((result) => {
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_SOURCES', result.data.results)
      }).catch(error => {
        throw new Error(`API ${error}`)
      })
    },
    fetchArticle: function (context, articleId) {
      context.commit('SET_LOADING_STATUS', true)
      context.commit('SET_ARTICLE_ID', articleId)
      Vue.axios.get(this.getters.articleUrl).then((result) => {
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_ARTICLES', [result.data])
        context.commit('SET_ARTICLE_ID', null)
      }).catch(error => {
        throw new Error(`API ${error}`)
      })
    },
    fetchArticles: function (context) {
      context.commit('SET_LOADING_STATUS', true)
      Vue.axios.get(this.getters.articlesUrl).then((result) => {
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_ARTICLES', result.data.results)
      }).catch(error => {
        throw new Error(`API ${error}`)
      })
    }
  },
  modules: {
  },
  plugins: [new VuexPersistence({
    key: 'super.ba',
    reducer: (state) => ({ params: state.params })
  }).plugin]
})
