<template>
  <a-drawer
    title="Super Settings"
    placement="right"
    :closable="true"
    @close="hideSettings"
    :visible="isDrawerVisible"
  >
    <a-divider orientation="left">
      Hide news from
    </a-divider>
    <Filters />
    <a-divider :dashed="true" />
    <a-button
      type="primary"
      class="center"
      @click="showAll"
    >
      Show all
    </a-button>
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
    <a-divider
      :dashed="
        true"
    />
    <a-button
      type="primary"
      class="center"
      :disabled="! isWsConnected"
      @click="sendMessage"
    >
      Test live mode
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
    sendMessage () {
      this.$socket.sendObj({ title: 'Hello there!', message: 'Looks like it\'s working' })
    },
    togggleWs (checked) {
      if (checked) {
        this.$connect(process.env.VUE_APP_WS_URL)
      } else {
        this.$socket.close()
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
</style>
