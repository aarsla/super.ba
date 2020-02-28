<template>
  <a-row>
    <a-col>
      <a-checkbox-group
        :options="plainOptions"
        v-model="checkedList"
        @change="onChange"
      />
    </a-col>
  </a-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Filters',
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
    checkedList: {
      get () {
        return this.$store.state.params.filters
      },
      set (value) {
        return value
      }
    },
    plainOptions () {
      return this.$store.state.sources.map(source => source.title)
    }
  },
  methods: {
    onChange (checkedList) {
      this.$store.dispatch('setFilters', checkedList)
      this.$store.dispatch('setChannels', checkedList)
    },
    ...mapActions([
      'setFilters'
    ])
  }
}
</script>

<style>
.ant-checkbox-wrapper {
  width: 100%;
  display: block;
  margin-right: 0;
}
</style>
