<template v-for="article in articles">
  <div class="articles">
    <Article
      v-for="article in articles"
      :key="article._msgid"
      :article="article"
    />
  </div>
</template>

<script>
import Article from './Article.vue'

export default {
  name: 'ArticleList',
  props: {
    articles: {
      type: Array,
      default () {
        return []
      },
      required: false
    }
  },
  // data () {
  //   return {}
  // },
  // created: function () {
  //   // this.fetchItems()
  // },
  components: {
    Article
  }
  // methods: {
  //   fetchItems () {
  //     const uri = 'http://localhost:4000/tickets'
  //     this.axios.get(uri).then((response) => {
  //       this.tickets = response.data
  //     })
  //   }
  // }
}
</script>

<style scoped>
.articles {
  padding: 5px 0 5px 0;
}
</style>
