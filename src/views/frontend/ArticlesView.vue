<template>
  <div
    class="banner mt-3 d-md-none d-block"
    :style="{
      backgroundImage: `url(${imageRobot}
        )`
    }"
  ></div>
  <div class="container">
    <div
      class="banner mt-3 d-md-block d-none"
      :style="{
        backgroundImage: `url(${imageRobot}
        )`
      }"
    ></div>
    <div class="body my-5">
      <h2 class="text-dark fw-bold mb-5 fs-3">最新消息</h2>
      <div class="p-5 text-center">
        <span class="material-icons heart_broken text-dark mb-3"> heart_broken </span>
        <p class="text-muted mb-4">目前沒有發佈任何文章唷！</p>
        <RouterLink to="/products" class="bg-dark text-white py-2 px-5 rounded-3"
          >來去逛逛！</RouterLink
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import imageRobot from '@/assets/image/robot-2.jpg'
</script>
<script>
export default {
  inject: ['emitter'],
  data () {
    return {
      articles: [],
      currentPage: 1,
      isLoading: false
    }
  },
  methods: {
    getArticles (page = 1) {
      this.currentPage = page
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${page}`)
        .then((res) => {
          this.isLoading = false
          this.articles = res.data.articles
        })
        .catch((err) => {
          this.isLoading = false
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message
          })
        })
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>
<style lang="scss" scoped>
$gray-100: #f8f9fa;

.banner {
  height: calc(100vh - 500px);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

@media screen and (min-width: 769px) {
  .body {
    padding: 0 8rem;
  }
}
.heart_broken {
  font-size: 5rem;
}

.article-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.tag {
  background-color: $gray-100;
}
</style>
