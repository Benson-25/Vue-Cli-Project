<template>
  <div class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <h1>
        <router-link class="navbar-brand modern-antiqua-regular ms-5 fs-3 " to="/"
          >Robot.TS</router-link
        >
      </h1>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link fs-5 fw-bold py-3" to="Products">全部產品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fs-5 fw-bold py-3" to="/articles">最新消息</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fs-5 fw-bold py-3" to="About">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fs-5 fw-bold py-3" to="/contact">聯絡我們</router-link>
          </li>
        </ul>
      </div>

      <div class="naverbar d-flex align-items-end">
        <div class="naverbar-item">
          <ul class="d-flex align-items-center">
            <li>
              <RouterLink class="home text-primary" to="/Favorite">
                <span class="material-icons px-3 text-light"> favorite </span>
              </RouterLink>
              <span class="favorite-num rounded-pill bg-secondary position-absolute">{{ product.length }}</span>
            </li>

            <li>
              <a
                class="home text-primary"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <span class="material-icons px-3 text-light"> shopping_cart </span>
                <span class="cart-num rounded-pill bg-secondary position-absolute">{{ cartData.carts.length }}</span>
              </a>
            </li>
        <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
              ref="offcanvas"
            >
              <div class="offcanvas-header p-4">
                <h5 class="offcanvas-title fs-4 fw-bold" id="offcanvasRightLabel">購物車</h5>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body p-4" v-if="cartData.carts?.length">
                <div v-for="item in cartData.carts" :key="item.id">
                  <div
                    class="card-item d-flex mb-3"
                    :to="`/product/${item.product.id}`"
                  >
                    <span
                      class="material-icons align-self-center text-muted del-icon"
                      @click="delProduct(item.id)"
                    >
                      highlight_off
                    </span>
                    <div class="mx-3">
                      <img
                        class="cart-img rounded-3"
                        :src="item.product.imageUrl"
                        :alt="item.title"
                      />
                    </div>
                    <div
                      class="d-flex flex-column justify-content-start pt-2 pb-1"
                    >
                      <h3 class="fw-bold fs-5 mb-3">
                        {{ item.product.title }}
                      </h3>
                      <div class="d-flex align-items-end mb-3">
                        <p class="fw-bold fs-5">
                          NT$
                          {{ $filters.currency(item.product.price * item.qty) }}
                        </p>
                        <del class="fw-bold fs-7 ms-2 text-muted">
                          NT$
                          {{
                            $filters.currency(
                              item.product.origin_price * item.qty
                            )
                          }}
                        </del>
                      </div>
                      <p class="fs-7">
                        數量：{{ item.qty }} {{ item.product.unit }}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-primary text-white mt-4 w-100"
                  data-bs-dismiss="offcanvas"
                  @click="goToCart"
                >
                  前往購物車
                </button>
                </div>
                <template v-else>
                <div class="p-4 text-center">
                  <span
                    class="material-icons sentiment_dissatisfied text-primary pb-3"
                  >
                    sentiment_dissatisfied
                  </span>
                  <p>購物車空空的唷！</p>
                  <button
                    type="button"
                    class="btn btn-primary text-white mt-4 w-100"
                    data-bs-dismiss="offcanvas"
                    @click="goToProducts"
                  >
                    來去逛逛！
                  </button>
                </div>
              </template>
            </div>
            <li class="d-md-none d-block">
              <div class="dropdown">
                <a
                  class="btn text-primary p-0"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="material-icons mt-1 px-3 text-white">
                    menu
                  </span></a
                >
                <ul
                  class="dropdown-menu border-0 shadow rounded p-3 ps-2"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li class="pb-3">
                    <RouterLink class="dropdown-item link" to="/products">
                      全部產品</RouterLink
                    >
                  </li>
                  <li class="pb-3">
                    <RouterLink class="dropdown-item link" to="/articles"
                      >最新消息</RouterLink
                    >
                  </li>
                  <li class="pb-3">
                    <RouterLink class="dropdown-item link" to="/About"
                      >關於我們</RouterLink
                    >
                  </li>
                  <li class="pb-3">
                    <RouterLink class="dropdown-item link" to="/contact"
                      >聯絡我們</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FavoriteMixin from '@/mixins/FavoriteMixin'

export default {
  mixins: [FavoriteMixin],
  inject: ['emitter'],
  data () {
    return {
      products: [],
      product: [],
      cartData: {
        carts: []
      },
      offcanvas: ''
    }
  },
  methods: {
    getCart () {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
        )
        .then((res) => {
          this.cartData = res.data.data
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    delProduct (id) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((res) => {
          if (this.cartData.carts.length === 0) {
            this.hideoffcanvas()
          }
          this.getcart()
          this.emitter.emit('get-cart')
          this.emitter.emit('push-message', {
            style: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message
          })
        })
    },
    goToCart () {
      this.$router.push('/cart')
    },
    goToProducts () {
      this.$router.push('/products')
    },

    getProductsList () {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products
          this.isLoading = false
          this.getFavoriteProducts()
        })
        .catch((err) => {
          console.error('API 請求錯誤:', err)
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    getFavoriteProducts () {
      this.product = this.products.filter((item) => this.favorite.includes(item.id))
    }
  },
  mounted () {
    this.getProductsList()
    this.getCart()
    this.emitter.on('get-cart', () => {
      this.getCart()
    })
    this.emitter.on('get-fav', (favorite) => {
      this.getFavoriteProducts()
      this.favorite = favorite
    })
  }
}
</script>

<style lang="scss" scoped>
$white: #fffafa;
.modern-antiqua-regular {
  font-family: 'Modern Antiqua', serif;
  font-weight: 400;
  font-style: normal;
}
.navbar-brand {
  color: $white;
}
.navbar-brand:hover {
  color: black;
}
.material-icons {
  font-size: 1.8rem;
  cursor: pointer;
}
.favorite-num {
  font-size: 0.75rem;
  color: $white;
  padding: 0.3rem 0.5rem 0.4rem;
  top: 11px;
  right: 82px;
}
@media screen and (max-width: 768px) {
  .favorite-num {
    font-size: 0.75rem;
    color: $white;
    padding: 0.3rem 0.5rem 0.4rem;
    top: 6px;
    right: 138px;
  }
}
.cart-num {
  font-size: 0.75rem;
  color: $white;
  padding: 0.3rem 0.5rem 0.4rem;
  top: 10px;
  right: 25px;
}
@media screen and (max-width: 768px) {
  .cart-num {
    font-size: 0.75rem;
    color: $white;
    padding: 0.3rem 0.5rem 0.4rem;
    top: 6px;
    right: 81px;
  }
}
</style>
