<template>
  <div id="app">
    <Layout>
      <Header>
        <h1>super.ba</h1>
      </Header>
      <Content>
        <ArticleList v-bind:articles="articles" />
      </Content>
      <Footer>© super.ba - Live news feed aggregator</Footer>
    </Layout>
  </div>
</template>

<script>
import ArticleList from './components/ArticleList.vue'

export default {
  name: 'SuperBaApp',
  data: function () {
    return {
      articles: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ]
    }
  },
  components: {
    ArticleList
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
  margin-top: 60px;
}
</style>
