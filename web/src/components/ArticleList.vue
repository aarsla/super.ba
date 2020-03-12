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
