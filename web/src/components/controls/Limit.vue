<template>
  <div>
    <a-select
      default-value="3"
      @change="setLimit"
    >
      <a-select-option value="3">
        3
      </a-select-option>
      <a-select-option value="5">
        5
      </a-select-option>
      <a-select-option value="10">
        10
      </a-select-option>
      <a-select-option value="20">
        20
      </a-select-option>
      <a-select-option value="30">
        30
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Limit',
  computed: {
    limit () {
      return this.$store.state.params.limit
    }
  },
  methods: {
    ...mapActions([
      'setLimit'
    ])
  }
}
</script>

<style scoped>
</style>
