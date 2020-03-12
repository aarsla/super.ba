<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <router-link :to="{ name: 'Article', params: { id: 123 }}">
        Article
      </router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  created () {
    if (this.$store.state.liveMode) {
      this.$connect(process.env.VUE_APP_WS_URL)
    }
  },
  mounted () {
    this.$options.sockets.onmessage = (payload) => {
      try {
        const msg = JSON.parse(payload.data)
        const showMessage = (this.$store.state.params.channels.includes(msg.source.title) || msg.source.title === 'super.ba')

        if (!showMessage) {
          return
        }

        this.$notification.success({
          message: h => {
            return (<div><a href={msg.link} target="_blank">{msg.title}</a></div>)
          },
          description: h => {
            return (<div>{msg.description || ''} - {msg.source.title}</div>)
          },
          duration: 5
        })

        if (this.$store.state.desktopNotifications === true) {
          const notification = new Notification(msg.title, {
            body: msg.description,
            icon: msg.source.logo,
            timestamp: moment(msg.pubDate).unix()
          })
          notification.onclick = function (event) {
            event.preventDefault()
            window.open(msg.link, '_blank')
          }
        }
        // const article = JSON.parse(payload.data)

        // this.articles.unshift(article)
        // this.articles.pop()
      } catch (error) {
        this.$notification.error({
          message: error.name,
          description:
            error.message
        })
      }
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
