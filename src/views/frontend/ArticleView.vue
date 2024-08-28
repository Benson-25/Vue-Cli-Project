<template>
  <div class="container">
    <div class="body">
      <img class="article-img rounded-3" :src="article.image" :alt="article.title" />
      <div class="d-flex justify-content-between mx-5 mt-3">
        <div class="d-flex align-items-center">
          <span class="material-icons-outlined text-primary me-2"> face </span>
          <p class="text-muted me-4">{{ article.author }}</p>
          <span class="material-icons-outlined me-2 text-primary"> event_note </span>
          <p class="fs-7 text-muted me-4">
            {{ $filters.date(article.create_at) }}
          </p>
        </div>
        <div class="d-flex">
          <p
            class="tag py-2 px-2 me-2 rounded-3"
            v-for="(item, index) in article.tag"
            :key="`tags_${index}`"
          >
            <span class="fs-7 text-primary">#{{ item }}</span>
          </p>
        </div>
      </div>
      <div class="my-5 mx-5">
        <h1 class="mb-4 fs-2">{{ article.title }}</h1>
        <div class="lh-lg" v-html="article.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {}
    }
  },
  methods: {
    getArticle () {
      document.documentElement.scrollTop = 0
      this.isLoading = true
      const { id } = this.$route.params
      this.$http
        .get(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/article/${id}`)
        .then((res) => {
          this.article = res.data.article
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>

<style lang="scss" scoped>
$gray-100: #f8f9fa;

@media screen and (min-width: 769px) {
  .body {
    padding: 0 8rem;
  }
}

.tag {
  background-color: $gray-100;
}

.article-img {
  object-fit: cover;
  height: 300px;
  width: 100%;
}
</style>
