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
export default {
  created () {
    if (this.$store.state.liveMode) {
      this.$connect(process.env.VUE_APP_WS_URL)
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
