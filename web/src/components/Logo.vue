<template>
  <a-row>
    <a-col :span="1">
      <a-badge
        class="ws-indicator"
        status="default"
      />
    </a-col>
    <a-col :span="23">
      <div class="logo">
        <router-link to="/">
          <h1>super.ba</h1>
        </router-link>
      </div>
    </a-col>
  </a-row>
</template>

<script>

export default {
  name: 'Logo',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
.logo {
  font-size: 1rem;
}
</style>
