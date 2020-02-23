<template>
  <a-drawer
    title="Super Settings"
    placement="right"
    :closable="true"
    @close="hideSettings"
    :visible="isDrawerVisible"
  >
    <a-divider orientation="left">
      Remove sources
    </a-divider>
    <Filters />
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
    }

  }
}
</script>

<style scoped>
</style>
