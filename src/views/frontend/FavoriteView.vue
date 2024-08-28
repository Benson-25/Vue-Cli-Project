<template>
  <div
    class="banner mt-3 d-md-none d-block"
    :style="{ backgroundImage: `url(${robotImage})` }"
  ></div>
  <div class="container">
    <div
      class="banner mt-3 d-md-block d-none"
      :style="{ backgroundImage: `url(${robotImage})` }"
    ></div>
    <h2 class="fs-2 text-dark fw-bold text-center mt-5">我的最愛</h2>
    <template v-if="product.length === 0">
      <div class="p-5 text-center">
        <span class="material-icons heart_broken mb-3"> heart_broken </span>
        <p class="text-muted mb-4">您目前沒有收藏任何商品！</p>

        <RouterLink to="/products" class="bg-dark text-white py-2 px-5 rounded-3"
          >查看商品！</RouterLink
        >
      </div>
    </template>
    <template v-else>
      <div class="fav-list my-5">
        <div v-for="item in product" :key="item.id">
          <div class="fav-item rounded-3 shadow p-4 mb-4 d-flex row">
            <div class="col-sm-5 col-md-3">
              <RouterLink :to="`/product/${item.id}`">
                <img class="fav-item-img rounded-3" :src="item.imageUrl" :alt="item.title" />
              </RouterLink>
            </div>
            <div class="col-sm-7 col-md-9 mt-4 mt-sm-1 d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex justify-content-between">
                  <span
                    class="badge bg-primary fav-item-tag mb-3 d-flex align-items-center justify-content-center"
                  >
                    {{ item.category }}</span
                  >
                  <div class="fav-icon text-end" @click="toggleFav(item.id), getFavoriteProducts()">
                    <span
                      class="material-icons-outlined text-primary favorite"
                      v-if="favorite.includes(item.id)"
                    >
                      favorite
                    </span>
                    <span class="material-icons-outlined text-primary favorite" v-else>
                      favorite_border
                    </span>
                  </div>
                </div>
                <div class="fav-body mt-sm-1">
                  <RouterLink :to="`/product/${item.id}`">
                    <h1 class="fav-item-title text-primary fw-bold mb-3 lh-base">
                      {{ item.title }}
                    </h1>
                  </RouterLink>
                  <h2 class="fav-item-description fs-7 text-muted mb-4 lh-base">
                    {{ item.description }}
                  </h2>
                  <div class="d-flex align-items-end fw-bold">
                    <p class="fs-5 text-black me-2">NT$ {{ $filters.currency(item.price) }}</p>
                    <del class="fs-7 text-muted"
                      >NT$ {{ $filters.currency(item.origin_price) }}</del
                    >
                  </div>
                </div>
              </div>
              <div class="d-md-flex flex-md-column align-self-md-end">
                <button
                  @click="addCart(item.id)"
                  type="button"
                  class="add-cart-btn btn bg-primary rounded-3 text-white mt-3 px-3 d-flex align-items-center"
                  :disabled="loadingItem === item.id"
                >
                  加入購物車
                  <div class="loader" title="1" v-if="loadingItem === item.id">
                    <svg
                      version="1.1"
                      id="loader-1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="20px"
                      height="20px"
                      viewBox="0 0 50 50"
                      style="enable-background: new 0 0 50 50"
                      xml:space="preserve"
                    >
                      <path
                        fill="#000"
                        d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
                      >
                        <animateTransform
                          attributeType="xml"
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <VeeLoading :active="isLoading" />
</template>

<script setup>
import robotImage from '@/assets/image/robot-3.jpg'
</script>
<script>
import FavoriteMixin from '@/mixins/FavoriteMixin'

export default {
  mixins: [FavoriteMixin],
  inject: ['emitter'],
  data () {
    return {
      products: [],
      product: [],
      loadingItem: '',
      isLoading: false
    }
  },
  methods: {
    getProductsList () {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products
          this.isLoading = false
          this.getFavoriteProducts()
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    getFavoriteProducts () {
      this.product = this.products.filter((item) => this.favorite.includes(item.id))
    },
    addCart (id, qty = 1) {
      this.loadingItem = id
      this.$http
        .post(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`, {
          data: { product_id: id, qty }
        })
        .then((res) => {
          this.loadingItem = ''

          this.emitter.emit('push-message', {
            style: 'success',
            title: res.data.message
          })
          this.emitter.emit('get-cart')
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'success',
            title: err.response.data.message
          })
        })
    }
  },
  mounted () {
    this.getProductsList()
    this.emitter.emit('get-fav', this.favorite)
  }
}
</script>
<style lang="scss" scoped>
$black: #0000;
.banner {
  height: calc(100vh - 450px);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.heart_broken {
  font-size: 5rem;
}
@media screen and (min-width: 769px) {
  .row {
    padding: 0 7.5rem;
  }
}
@media screen and (min-width: 769px) {
  .fav-list {
    padding: 0 7.5rem;
  }
}
.fav-item {
  margin: 0 auto;
  &-img {
    height: 18rem;
    width: 100%;
    object-fit: cover;
  }
  &-title {
    font-size: 1.5rem;
  }
  &-description {
    display: none;
  }

  .favorite {
    cursor: pointer;
  }
}
@media screen and (min-width: 576px) {
  .fav-img {
    height: 15rem;
    width: 15rem;
  }
}

@media screen and (min-width: 769px) {
  .fav-item-description {
    display: block;
  }
}

.loader {
  text-align: center;
  display: inline-block;
  vertical-align: top;
}
svg path,
svg rect {
  fill: $black;
}
</style>
