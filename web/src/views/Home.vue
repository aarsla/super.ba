<template>
  <a-layout class="layout">
    <a-layout-header>
      <h1>super.ba</h1>
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
import ArticleList from '@/components/ArticleList.vue'
const fixture = require('../fixtures/articles.json')

export default {
  name: 'SuperBaApp',
  data: function () {
    return {
      articles: fixture.articles
    }
  },
  components: {
    ArticleList
  }
}
</script>

<style scoped>
.layout {
  margin: 0 auto;
  max-width: 768px;
}

.layout .ant-layout-header {
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
