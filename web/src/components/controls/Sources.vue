<template>
  <a-row
    type="flex"
    justify="space-around"
    align="middle"
  >
    <a-col
      :xs="0"
      :lg="24"
    >
      <a-menu mode="horizontal">
        <a-menu-item
          v-for="source in sourceLinks"
          :key="source.title"
          @click="menuClicked"
        >
          {{ source.title }}
        </a-menu-item>
      </a-menu>
    </a-col>
  </a-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Sources',
  props: {
    sources: {
      type: Array,
      default () {
        return []
      },
      required: false
    }
  },
  computed: {
    sourceLinks () {
      return this.$store.state.sources
    }
  },
  methods: {
    ...mapActions([
      'setFilters'
    ]),
    updateSources (selectedSource) {
      this.$store.dispatch('setFilters', selectedSource)
    },
    menuClicked ({ item, key, keyPath }) {
      const filter = this.sourceLinks.filter((o) => o.title !== key).map((o) => o.title)
      this.$store.dispatch('setFilters', filter)
    }
  }
}
</script>

<style scoped>
</style>
