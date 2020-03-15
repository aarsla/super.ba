<template>
  <a-layout-footer>
    <a-row
      type="flex"
      justify="space-around"
      align="middle"
    >
      <a-col :span="1">
        <a-icon
          type="scissor"
        />
      </a-col>
      <a-col :span="23">
        <a-divider :dashed="true" />
      </a-col>
    </a-row>
    <p>© super.ba - Live news feed aggregator</p>
    <p>
      <a
        class="github"
        href="https://github.com/aarsla/super.ba"
        target="_blank"
      >
        <a-icon type="github" /> GitHub
      </a>
    </p>
  </a-layout-footer>
</template>

<script>

export default {
  name: 'Footer',
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
.github {
  color: black;
  text-decoration: none;
}
</style>
