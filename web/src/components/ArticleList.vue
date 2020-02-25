<template v-for="article in articles">
  <div class="articles">
    <transition-group name="article">
      <Article
        v-for="article in articles"
        :key="article._id"
        :article="article"
      />
    </transition-group>
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

<style scoped>
.articles {
  padding: 5px 0 5px 0;
}

/* .article-enter-active,
.article-leave-active,
.article-move {
  transition: 500ms ease;
  transition-property: opacity, transform;
}

.article-enter {
  opacity: 0;
  transform: translateY(-150px) scaleY(0);
}

.article-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.article-leave-active {
  position: absolute;
}

.article-leave-to {
  opacity: 0;
  transform: translateY(0px) scaleY(0);
  transform-origin: center top;
} */
</style>
