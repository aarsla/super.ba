<template>
  <div>
    <h1>{{ article.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    article: {
      id: Number,
      title: String
    }
  }
}
</script>

<style scoped>
</style>
