<template>
  <a-drawer
    title="Super Settings"
    placement="right"
    :closable="true"
    @close="hideSettings"
    :visible="isDrawerVisible"
  >
    <a-divider orientation="left">
      Live mode
    </a-divider>
    <a-row>
      <a-col :span="8">
        <a-switch
          :checked="isWsConnected"
          checked-children="ON"
          un-checked-children="OFF"
          @change="toggleWs"
        />
      </a-col>
      <a-col :span="16">
        Enable to update news feed in real time
      </a-col>
    </a-row>
    <a-button
      type="primary"
      class="center spaced"
      :disabled="! isWsConnected"
      @click="sendTestMessage"
    >
      Test live mode
    </a-button>
    <a-divider orientation="left">
      Hide news from
    </a-divider>
    <Filters />
    <a-button
      type="primary"
      class="center spaced"
      @click="showAll"
    >
      Show all
    </a-button>
    <a-divider orientation="left">
      Status
    </a-divider>
    <a-alert
      v-if="isWsConnected"
      message="Connected"
      type="success"
      show-icon
    />
    <a-alert
      v-else
      message="Disconnected"
      type="warning"
      show-icon
    />
    <a-divider :dashed="true" />
  </a-drawer>
</template>

<script>
import Filters from './Filters.vue'
const { v4: uuidv4 } = require('uuid')

export default {
  name: 'Settings',
  components: {
    Filters
  },
  props: {
    isDrawerVisible: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isWsConnected: function () {
      return this.$store.state.socket.isConnected
    }
  },
  methods: {
    hideSettings () {
      this.$emit('hide-settings')
    },
    showAll () {
      this.$store.dispatch('setFilters', [])
      this.$store.dispatch('setChannels', [])
    },
    sendTestMessage () {
      this.$socket.sendObj({
        _id: uuidv4(),
        title: 'Hello there!',
        description: 'Live mode is working. New articles will show up here.',
        source: { title: 'super.ba', url: '#' }
      })
    },
    toggleWs (checked) {
      if (this.$socket) {
        this.$socket.close()
        this.$disconnect()
      }

      if (checked) {
        this.$connect(process.env.VUE_APP_WS_URL)
      }

      this.$store.dispatch('setLiveMode', checked)
    }
  }
}
</script>

<style scoped>
.center {
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.spaced {
  margin: 30px auto;
}
</style>
