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
        <a-col :span="1" />
        <a-col :span="10">
          <Search />
        </a-col>
        <a-col :span="6">
          <Date />
        </a-col>
        <a-col :span="3">
          <Limit />
        </a-col>
        <a-col :span="1">
          <a-button
            class="right"
            type="secondary"
            shape="circle"
            icon="setting"
            @click="showSettings"
          />
          <Settings
            :is-drawer-visible="isDrawerVisible"
            @hide-settings="hideSettings"
          />
          <a-modal
            title="Super.ba"
            v-model="isAboutModalVisible"
            @ok="hideAboutModal"
          >
            <p>Your friendly news aggregator.</p>
          </a-modal>
        </a-col>
        <a-col :span="1">
          <a-button
            class="right"
            type="secondary"
            shape="circle"
            icon="question"
            @click="showAboutModal"
          />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import Settings from './controls/Settings.vue'
import Search from './controls/Search.vue'
import Limit from './controls/Limit.vue'
import Date from './controls/Date.vue'

export default {
  name: 'Header',
  components: {
    Settings,
    Search,
    Limit,
    Date
  },
  data () {
    return {
      isDrawerVisible: false,
      isAboutModalVisible: false
    }
  },
  // computed: {
  //   isWsConnected () {
  //     return this.$store.state.socket.isConnected
  //   }
  // },
  methods: {
    showAboutModal () {
      this.isAboutModalVisible = true
    },
    hideAboutModal (e) {
      this.isAboutModalVisible = false
    },
    showSettings () {
      this.isDrawerVisible = true
    },
    hideSettings () {
      this.isDrawerVisible = false
    }
    // sendMessage () {
    //   this.$socket.sendObj({ awesome: 'data' })
    // }
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
