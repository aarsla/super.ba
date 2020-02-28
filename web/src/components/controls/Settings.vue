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
          @change="togggleWs"
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
    <a-divider :dashed="true" />
  </a-drawer>
</template>

<script>
import Filters from './Filters.vue'

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
    },
    sendTestMessage () {
      this.$socket.sendObj({
        _id: 'super.ba',
        title: 'Hello there!',
        description: 'Live mode is working',
        source: { title: 'super.ba' }
      })
    },
    togggleWs (checked) {
      if (this.$socket) {
        this.$socket.close()
      }

      if (checked) {
        this.$connect(process.env.VUE_APP_WS_URL)
        this.subscribeToChannels()
      }

      this.$store.dispatch('setLiveMode', checked)
    },
    subscribeToChannels () {
      if (this.$store.state.isConnected) {
        this.$disconnect()
      }

      const channels = this.$store.state.params.channels
      channels.forEach(channel => {
        const url = `${process.env.VUE_APP_WS_URL}/${channel}`
        this.$connect(url)
        console.log(`Connecting ${url}`)
      })
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
