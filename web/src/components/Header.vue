<template>
  <a-row>
    <a-col :span="1">
      <a-badge
        v-if="isWsConnected"
        class="ws-indicator"
        status="success"
      />
      <a-badge
        v-else
        class="ws-indicator"
        status="default"
      />
    </a-col>
    <a-col :span="4">
      <div class="logo">
        <router-link to="/">
          <h1>super.ba</h1>
        </router-link>
      </div>
    </a-col>
    <a-col :span="19">
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
  computed: {
    isWsConnected: {
      get () {
        return this.$store.state.socket.isConnected
      },
      set (value) {
        return value
      }
    }
  },
  methods: {
    showAboutModal () {
      this.$success({
        title: 'Super.ba',
        // JSX support
        content: (
          <div>
            <blockquote>Your friendly news aggregator</blockquote>
          </div>
        )
      })
    },
    showSettings () {
      this.isDrawerVisible = true
    },
    hideSettings () {
      this.isDrawerVisible = false
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

.ws-indicator {
  margin: 3px;
}

blockquote {
  margin: 2.5em 10px 1.5em;
  font-size: 1rem;
}
</style>
