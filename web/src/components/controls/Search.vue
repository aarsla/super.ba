<template>
  <div>
    <a-input-search
      allow-clear
      placeholder="Search"
      @search="setQuery"
      @change="onChange"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Search',
  computed: {
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
