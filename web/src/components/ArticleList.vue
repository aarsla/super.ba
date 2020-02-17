<template v-for="article in articles">
  <div>
        <Article
          v-for="article in articles"
          :key="article.id"
          :article="article" />
  </div>
</template>

<script>
import Article from './Article.vue'

export default {
  name: 'ArticleList',
  props: {
    articles: Array
  },
  components: {
    Article
  }
}
</script>

<style scoped>
</style>
