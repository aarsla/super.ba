<template>
  <a-card
    :loading="this.$store.state.isLoading"
    :hoverable="true"
    class="card"
    :key="article._id"
  >
    <a-row align="bottom">
      <a-col
        :span="23"
      >
        <a
          class="title"
          :href="article.link"
          target="_blank"
        >{{ article.title }}</a>
      </a-col>
      <a-col
        class="right"
        :span="1"
      >
        <a-button
          title="Copy article link"
          size="small"
          shape="circle"
          type="dashed"
          icon="copy"
          v-clipboard:copy="shareLink"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        />
      </a-col>
    </a-row>
    <a-divider />
    <a-row
      type="flex"
      justify="space-around"
      align="top"
    >
      <a-col
        :span="8"
      >
        <a
          class="title"
          :href="article.link"
          target="_blank"
        >
          <img
            v-if="article.image"
            class="image"
            :alt="article.title"
            :src="article.image"
          >
          <a-empty v-else>
            <span slot="description" />
          </a-empty>
        </a>
      </a-col>
      <a-col :span="16">
        <div v-if="article.description">
          {{ formattedDescription }}
        </div>
        <div v-else>
          ...
        </div>
      </a-col>
    </a-row>
    <a-card-meta class="meta">
      <template slot="description">
        <a
          class="left"
          :href="article.source.url"
          target="_blank"
        >
          <img
            v-if="article.source.logo"
            class="logo"
            :alt="article.source.title"
            :src="article.source.logo"
          >
          {{ article.source.title }}
        </a>
        <div class="pubDate right">
          <div v-if="pubDate">
            {{ pubDate }}
          </div>
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script>
import moment from 'moment'

const descriptionLength = 650

export default {
  name: 'Article',
  created () {
    this.isLoading = true
  },
  props: {
    article: {
      type: Object,
      default () {
        return {
          title: 'Title',
          description: 'Description',
          image: {
            type: String
          },
          pubDate: moment
        }
      }
    }
  },
  computed: {
    shareLink: function () {
      return `${process.env.VUE_APP_URL}/#/article/${this.article._id}`
    },
    pubDate: function () {
      return moment(this.article.pubDate).format('DD MMM YYYY HH:mm')
    },
    formattedDescription: function () {
      return this.article.description.length > descriptionLength ? this.article.description.substring(0, descriptionLength) + '...' : this.article.description
    }
  },
  methods: {
    onCopy: function (e) {
      this.$notification.info({
        message: 'Share away',
        description:
            'Link is in your clipboard now'
      })
    },
    onError: function (e) {
      this.$notification.open({
        message: 'Error copying link',
        description:
            'We were not able to copy share link to your clipboard!',
        onClick: () => {}
      })
    }
  }
}
</script>

<style scoped>
.card {
  cursor: auto;
  margin: 10px;
  padding: 10px;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}

.card .title {
  font-size: 1rem;
  font-weight: bolder;
  font-feature-settings: 'tnum';
  line-height: 1em;
}

.card .extra {
  float: right;
  font-size: 1em;
  font-weight: 500;
  font-feature-settings: 'tnum';
}

.card .image {
  width: 200px;
  border-radius: 5px;
}

a {
  color: #0275d8;
}

p {
  font-size: 1rem;
  color: #111;
}

.meta {
  margin: 35px 0 0 0;
}

.meta .left {
  float: left;
  text-decoration: none;
}

.meta .left .logo {
  width: 20px;
}

.meta .pubDate {
  color:#0275d8;
  font-size: 0.7rem;
}

.meta .right {
  float: right;
  font-weight: 500;
}
</style>
