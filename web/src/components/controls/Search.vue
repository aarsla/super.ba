<template>
  <a-input-search
    allow-clear
    placeholder="Search"
    :default-value="query"
    @search="setQuery"
    @change="onChange"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Search',
  computed: {
    defaultValue () {
      return 'test'
    },
    query () {
      return this.$store.state.params.query
    }
  },
  methods: {
    ...mapActions([
      'setQuery'
    ]),
    onChange (e) {
      if (!e.data) {
        this.$store.dispatch('setQuery', '')
      }
    }
  }
}
</script>

<style scoped>
</style>
