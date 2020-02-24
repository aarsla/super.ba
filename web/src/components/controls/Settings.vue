<template>
  <a-drawer
    title="Super Settings"
    placement="right"
    :closable="true"
    @close="hideSettings"
    :visible="isDrawerVisible"
  >
    <a-divider orientation="left">
      Hide news from
    </a-divider>
    <Filters />
    <a-divider :dashed="true" />
    <a-button
      type="primary"
      class="center"
      @click="showAll"
    >
      Show all
    </a-button>
    <a-divider :dashed="true" />
  </a-drawer>
</template>

<script>
import Filters from './Filters.vue'

export default {
  name: 'Settings',
  components: {
    Filters
  },
  props: {
    isDrawerVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    hideSettings () {
      this.$emit('hide-settings')
    },
    showAll () {
      this.$store.dispatch('setFilters', [])
    }
  }
}
</script>

<style scoped>
.center {
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
