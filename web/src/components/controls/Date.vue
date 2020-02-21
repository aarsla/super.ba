<template>
  <a-date-picker
    slot="renderExtraFooter"
    @change="setDate"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Date',
  computed: {
    date () {
      return this.$store.state.params.date
    }
  },
  methods: {
    ...mapActions([
      'setDate'
    ])
  }
}
</script>

<style scoped>
</style>
