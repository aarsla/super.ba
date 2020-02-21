<template>
  <a-row
    type="flex"
    justify="space-around"
    align="middle"
  >
    <a-col :span="24">
      <a-select
        mode="multiple"
        placeholder="Remove news sources"
        :value="selectedItems"
        @change="updateSources"
        style="width: 100%"
      >
        <a-select-option
          v-for="item in filteredOptions"
          :key="item"
          :value="item"
        >
          {{ item }}
        </a-select-option>
      </a-select>
    </a-col>
  </a-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Source',
  data () {
    return {
      selectedItems: []
    }
  },
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
    filteredOptions () {
      return this.sources.filter(o => !this.selectedItems.includes(o))
    }
  },
  methods: {
    ...mapActions([
      'setFilters'
    ]),
    updateSources (selectedItems) {
      this.selectedItems = selectedItems
      this.$store.dispatch('setFilters', selectedItems)
    }
  }
}
</script>

<style scoped>
</style>
