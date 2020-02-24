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
    this.$options.sockets.onmessage = (payload) => {
      try {
        const msg = JSON.parse(payload.data)

        this.$notification.success({
          message: msg.title,
          description:
            msg.message
        })
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

<style scoped>
.articles {
  padding: 5px 0 5px 0;
}
</style>
