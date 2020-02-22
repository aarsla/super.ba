<template>
  <a-row>
    <a-col :span="4">
      <div class="logo">
        <router-link to="/">
          <h1>super.ba</h1>
        </router-link>
      </div>
    </a-col>
    <a-col
      :span="20"
    >
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
      >
        <a-col :span="2" />
        <a-col :span="10">
          <Search />
        </a-col>
        <a-col :span="6">
          <Date />
        </a-col>
        <a-col :span="2">
          <Limit />
        </a-col>
        <a-col :span="2">
          <a-button
            class="right"
            type="secondary"
            shape="circle"
            icon="question"
            @click="showModal"
          />
          <a-modal
            title="Super.ba"
            v-model="visible"
            @ok="handleOk"
          >
            <p>Your friendly news aggregator.</p>
          </a-modal>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import Search from './controls/Search.vue'
import Limit from './controls/Limit.vue'
import Date from './controls/Date.vue'

export default {
  name: 'Header',
  components: {
    Search,
    Limit,
    Date
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      this.visible = false
    }
  }
}
</script>

<style scoped>
.logo {
  font-size: 1rem;
}
.right {
  float: right;
}
</style>
