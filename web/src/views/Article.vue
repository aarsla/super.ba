<template>
  <a-layout class="layout">
    <a-layout-header>
      <Header />
    </a-layout-header>
    <a-layout-header>
      <Source :sources="sources" />
    </a-layout-header>
    <a-layout-content>
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
      >
        <a-col :span="24">
          <ArticleList :articles="articles" />
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-footer>
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
      >
        <a-col :span="1">
          <a-icon
            type="scissor"
          />
        </a-col>
        <a-col :span="23">
          <a-divider :dashed="true" />
        </a-col>
      </a-row>
      © super.ba - Live news feed aggregator
    </a-layout-footer>
    <a-back-top />
  </a-layout>
</template>

<script>
import Header from '@/components/Header.vue'
import Source from '@/components/controls/Source.vue'
import ArticleList from '@/components/ArticleList.vue'
import { mapState } from 'vuex'

export default {
  name: 'SuperBaApp',
  components: {
    Header,
    Source,
    ArticleList
  },
  created () {
    this.$store.dispatch('fetchSources')
    this.$store.dispatch('fetchArticle', this.$route.params.id)
  },
  computed: mapState([
    'header',
    'articles',
    'sources'
  ])
}
</script>

<style scoped>
.layout {
  margin: 0 auto;
  max-width: 768px;
}

.layout .ant-layout-header {
  padding: 0 10px 0 10px;
  text-align: left;
  background: rgba(255, 255, 255, 1.0);
}

.layout .ant-layout-content {
  background: rgba(255, 255, 255, 1.0);
}

.layout .ant-layout-footer {
  background: rgba(255, 255, 255, 1.0);
}

.ant-back-top {
    color: #fff;
  }
</style>
