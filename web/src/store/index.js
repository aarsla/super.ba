import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueClipboard from 'vue-clipboard2'
import moment from 'moment'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)
Vue.use(VueClipboard)

export default new Vuex.Store({
  state: {
    currentJWT: null,
    isLoading: false,
    sources: [],
    articleId: String,
    articles: [],
    liveMode: Boolean,
    desktopNotifications: false,
    notifications: Boolean,
    params: {
      query: '',
      date: null,
      filters: [],
      channels: [],
      category: 'BiH',
      limit: 3,
      offset: 0
    },
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    }
  },
  getters: {
    jwt: (state) => (state.currentJWT),
    jwtData: (state, getters) => (state.currentJWT ? JSON.parse(atob(getters.jwt.split('.')[1])) : null),
    jwtSubject: (state, getters) => (getters.jwtData ? getters.jwtData.sub : null),
    jwtIssuer: (state, getters) => (getters.jwtData ? getters.jwtData.iss : null),
    joinedFilters: state => {
      return state.params.filters.join()
    },
    sourcesUrl: (state, getters) => {
      return `sources/${state.params.category}`
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
    SET_JWT (state, token) {
      state.currentJWT = token
    },
    SET_PARAMS_LIMIT (state, limit) {
      state.params.limit = limit
    },
    SET_PARAMS_DATE (state, date) {
      state.params.date = date
    },
    SET_PARAMS_CATEGORY (state, category) {
      state.params.category = category
    },
    SET_PARAMS_FILTERS (state, filters) {
      state.params.filters = filters
    },
    SET_PARAMS_CHANNELS (state, channels) {
      state.params.channels = channels
    },
    SET_PARAMS_QUERY (state, query) {
      state.params.query = query
    },
    SET_LOADING_STATUS (state, status) {
      state.isLoading = status
    },
    SET_SOURCES (state, sources) {
      const sourcesSortedByTitle = sources.sort((a, b) => a.title.localeCompare(b.title))
      state.sources = sourcesSortedByTitle
    },
    SET_LIVE_MODE (state, liveMode) {
      state.liveMode = liveMode
    },
    SET_DESKTOP_NOTIFICATIONS (state, allow) {
      state.desktopNotifications = allow
    },
    SET_NOTIFICATIONS (state, notifications) {
      state.notifications = notifications
    },
    SET_ARTICLE_ID (state, articleId) {
      state.articleId = articleId
    },
    SET_ARTICLES (state, articles) {
      state.articles = articles
    },
    SOCKET_ONOPEN (state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, event) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event) {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message) {
      state.socket.message = message
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT (state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
    }
  },
  actions: {
    async setJWT (context, commit) {
      context.commit('SET_LOADING_STATUS', true)
      const token = jwt.sign({ sub: 'super.ba' }, process.env.VUE_APP_APP_SECRET, { expiresIn: '1h' })
      context.commit('SET_JWT', token)
      context.commit('SET_LOADING_STATUS', false)
    },
    setLimit ({ commit, dispatch }, limit) {
      commit('SET_PARAMS_LIMIT', limit)
      dispatch('fetchArticles')
    },
    setDate ({ commit, dispatch }, date) {
      commit('SET_PARAMS_DATE', date)
      dispatch('fetchArticles')
    },
    setCategory ({ commit, dispatch }, category) {
      commit('SET_PARAMS_CATEGORY', category)
      dispatch('fetchSources')
      dispatch('setFilters', [])
    },
    setQuery ({ commit, dispatch }, query) {
      commit('SET_PARAMS_QUERY', query)
      dispatch('fetchArticles')
    },
    setFilters ({ commit, dispatch }, filters) {
      commit('SET_PARAMS_FILTERS', filters)
      dispatch('setChannels')
    },
    setChannels ({ commit, dispatch }) {
      const sources = this.state.sources.map((o) => o.title)
      const filters = this.state.params.filters
      const inversedChannels = sources.filter((o) => !filters.includes(o))

      commit('SET_PARAMS_CHANNELS', inversedChannels)
      dispatch('fetchArticles')
    },
    setArticle ({ commit, dispatch }, articleId) {
      commit('SET_ARTICLE_ID', articleId)
    },
    setLiveMode ({ commit }, liveMode) {
      commit('SET_LIVE_MODE', liveMode)
    },
    setDesktopNotifications ({ commit }, allow) {
      commit('SET_DESKTOP_NOTIFICATIONS', allow)
    },
    setNotifications ({ commit }, notifications) {
      commit('SET_NOTIFICATIONS', notifications)
    },
    async fetchSources ({ commit, dispatch }) {
      commit('SET_LOADING_STATUS', true)

      try {
        const result = await Vue.axios.get(this.getters.sourcesUrl)
        commit('SET_SOURCES', result.data.results)
        dispatch('setChannels')
      } catch (error) {
        throw new Error(`API ${error}`)
      } finally {
        commit('SET_LOADING_STATUS', false)
      }
    },
    async fetchArticle (context, articleId) {
      context.commit('SET_LOADING_STATUS', true)
      context.commit('SET_ARTICLE_ID', articleId)

      try {
        const result = await Vue.axios.get(this.getters.articleUrl)
        context.commit('SET_ARTICLES', [result.data])
      } catch (error) {
        throw new Error(`API ${error}`)
      } finally {
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_ARTICLE_ID', null)
      }
    },
    async fetchArticles (context) {
      context.commit('SET_LOADING_STATUS', true)
      try {
        const result = await Vue.axios.get(this.getters.articlesUrl)
        context.commit('SET_ARTICLES', result.data.results)
      } catch (error) {
        throw new Error(`API ${error}`)
      } finally {
        context.commit('SET_LOADING_STATUS', false)
      }
    }
  },
  modules: {},
  plugins: [
    new VuexPersistence({
      key: 'super.ba',
      reducer: state => (
        {
          token: state.currentJWT,
          liveMode: state.liveMode,
          desktopNotifications: state.desktopNotifications,
          notifications: state.notifications,
          params: state.params
        })
    }).plugin
  ]
})
