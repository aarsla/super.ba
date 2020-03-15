<template>
  <a-dropdown
    :trigger="['click']"
    class="center"
  >
    <a-menu
      slot="overlay"
      @click="changeCategory"
    >
      <a-menu-item key="BiH">
        Bosnia & Herzegovina
      </a-menu-item>
      <a-menu-item key="Tech">
        Technology
      </a-menu-item>
    </a-menu>
    <a-button> Category <a-icon type="down" /> </a-button>
  </a-dropdown>
</template>

<script>
export default {
  name: 'Limit',
  computed: {
    category () {
      return this.$store.state.params.category
    }
  },
  methods: {
    changeCategory (e) {
      this.$store.dispatch('setCategory', e.key)
    }
  }
}
</script>

<style scoped>
</style>
