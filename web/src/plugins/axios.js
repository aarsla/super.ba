'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '../store'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  // timeout: 60 * 1000, // Timeout
}

const _axios = axios.create(config)

function getAccessToken () {
  return store.getters.jwt
}

async function updateAccessToken () {
  store.dispatch('setJWT')
}

_axios.interceptors.request.use(
  async function (config) {
    const token = getAccessToken()

    if (!token) {
      updateAccessToken()
    }

    config.headers.Authorization = `Bearer ${getAccessToken()}`

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response &&
      error.response.data &&
      error.response.data.statusCode === 401 &&
      error.response.data.message === 'Authorization token expired') {
      return updateAccessToken().then(() => {
        error.config.headers.Authorization = `Bearer ${getAccessToken()}`
        return axios.request(error.response.config)
      })
    }

    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
