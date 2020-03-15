<template>
  <a-layout class="layout">
    <a-layout-header>
      <Header />
    </a-layout-header>
    <Sources :sources="sources" />
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
    <Footer />
    <a-back-top />
  </a-layout>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Sources from '@/components/controls/Sources.vue'
import ArticleList from '@/components/ArticleList.vue'
import { mapState } from 'vuex'

export default {
  name: 'SuperBaApp',
  components: {
    Header,
    Footer,
    Sources,
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
  max-width: 900px;
  background: rgba(255, 255, 255, 1.0);
}

.layout .ant-layout-header {
  padding: 0 10px 0 10px;
  margin-bottom: 30px;
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
