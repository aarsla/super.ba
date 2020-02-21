<template>
  <a-row>
    <a-col :span="4">
      <div class="logo">
        <h1>super.ba</h1>
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
            type="secondary"
            shape="circle"
            icon="question"
            @click="showModal"
          />
          <a-modal
            title="Lorem Ipsum"
            v-model="visible"
            @ok="handleOk"
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar neque eget dolor fermentum egestas. Aenean sagittis ipsum et tellus tristique, ornare sodales quam eleifend. Phasellus id leo non arcu convallis pulvinar. Morbi et nunc eget nisl fringilla egestas. Pellentesque fringilla dolor neque, eu sollicitudin nunc iaculis quis. Vestibulum vehicula mollis libero id maximus. Fusce at finibus lorem. Quisque nec quam semper augue porta tempus.</p>
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
</style>
