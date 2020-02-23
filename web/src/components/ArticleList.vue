<template v-for="article in articles">
  <div class="articles">
    <Article
      v-for="article in articles"
      :key="article._id"
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
  components: {
    Article
  },
  created () {
    this.$options.sockets.onmessage = (msg) => {
      this.$notification.success({
        message: 'New article',
        description:
            msg.data
      })
    }
  }
}
</script>

<style scoped>
.articles {
  padding: 5px 0 5px 0;
}
</style>
