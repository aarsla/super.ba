<template>
  <a-date-picker
    slot="renderExtraFooter"
    :default-value="date"
    :format="dateFormat"
    @change="setDate"
  />
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'Date',
  data () {
    return {
      moment: moment,
      dateFormat: 'DD MMM YYYY'
    }
  },
  computed: {
    date () {
      return this.$store.state.params.date ? moment(this.$store.state.params.date) : null
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
