<template>
  <progressBar step="1" />
  <div class="container">
    <div class="my-5">
      <div class="cart-list rounded-3 shadow p-5">
        <div
          class="d-flex justify-content-between align-items-end fs-5 border-bottom border-2 border-secondary pb-3"
        >
          <h2 class="fw-bold fs-4">購物車</h2>
          <button
            class="text-dark d-block boder-0"
            type="button"
            @click="delAllProduct"
            :disabled="cartData.carts?.length === 0"
          >
            清除購物車
          </button>
        </div>
        <template v-if="CharacterData.carts?.length === 0">
          <div v-for="item in CharacterData.carts" :key="item.id">
            <div class="cart-list-body mt-4 d-flex">
              <div class="d-flex flex-grow-1">
                <Router-Link :to="`/product/${item.product.id}`">
                  <img class="cart-img rounded-3" :src="item.product.imageUrl" :alt="item.title" />
                </Router-Link>
                <div class="d-flex flex-column justify-content-statt ms-3 mt-2">
                  <Router-Link :to="`/product/${item.product.id}`" class="mb-3">
                    <h1 class="fs-5 fw-bold text-black">
                      {{ item.product.title }}
                    </h1>
                  </Router-Link>
                  <div class="select-num">
                    <select
                      id=""
                      class="form-select border border-1"
                      v-model="item.qty"
                      @change="updateCartItem(item)"
                      :disabled="loadingItem === item.id"
                    >
                      <option :value="num" v-for="num in 20" :key="`${num}${item.id}`">
                        {{ num }}
                      </option>
                    </select>
                  </div>
                  <div class="d-sm-none d-flex align-items-end">
                    <p class="fw-bold fs-7 mt-3">
                      NT$
                      {{ $filters.currency(item.product.price * item.qty) }}
                    </p>
                    <del class="fs-8 text-dark ms-2">
                      NT$
                      {{ $filters.currency(item.product.origin_price * item.qty) }}
                    </del>
                  </div>
                </div>
              </div>
              <div class="d-sm-flex flex-sm-column justify-content-sm-between mt-1">
                <a class="text-dark flex-shrink-1" @click="delProduct(item.id)">
                  <span class="material-icons text-end d-block">delete</span>
                </a>
                <div class="d-none d-sm-block">
                  <p class="mb-2 fw-bold fs-5">
                    NT$ {{ $filters.currency(item.product.price * item.qty) }}
                  </p>
                  <del class="fs-7 text-dark d-flex flex-column align-items-end">
                    NT$ {{ $filters.currency(item.product.origin_price * item.qty) }}
                  </del>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column align-items-end mt-4 pt-4">
            <div class="price-group">
              <ul>
                <li class="text-end text-dark fs-6 d-flex justify-content-between">
                  原售價
                  <span>NT$ {{ $filters.currency(cartData.total) }}</span>
                </li>
                <li class="text-end text-dark fs-6 d-flex justify-content-between mt-2">
                  優惠卷
                  <span>-NT$ {{ $filters.currency(cartData.total - cartData.final_total) }}</span>
                </li>
                <li
                  class="text-end fw-bold text-dark fs-6 d-flex justify-content-betweem border-top border-2 pt-3 mt-3"
                >
                  總金額
                  <span class="fs-4">NT$ {{ $filters.currency(cartData.final_total) }}</span>
                </li>
              </ul>
            </div>
            <div class="d-flex apply my-3">
              <input
                type="text"
                class="form-control apply-input fs-7 rounded-0 border border-2 border-dark"
                v-model="couponCode"
                :placeholder="message"
              />
              <button
                class="btn btn-outline-dark text-white apply-btn fs-7 rounded-0"
                type="button"
                @click="ApplyCoupon"
              >
                套用
              </button>
            </div>
            <button
              type="button"
              to="/checkOrder"
              class="btn btn-dark text-white chekout-btn fs-6"
              @click="goToCheckOrder()"
            >
              前往結帳
            </button>
          </div>
        </template>
        <template v-else>
          <div class="text-center pt-4">
            <span class="material-icons add_shopping_cart text-primary pb-3">
              add_shopping_cart
            </span>
            <p class="text-muted mb-4">購物車空空的唷！</p>
            <RouterLink to="/products" class="bg-primary text-white py-2 px-5 rounded-3"
              >來去挑選商品！</RouterLink
            >
          </div>
        </template>
      </div>
    </div>
    <div class="my-6">
      <h2 class="text-primary fw-bold mb-4">推薦商品 <span class="fs-5">Recommend</span></h2>
      <CartSwiper :products="randomProducts" />
    </div>
  </div>
  <VeeLoading :active="isLoading" />
</template>

<script>
import ProgressBar from '@/components/frontend/ProgressBar.vue'
import CartSwiper from '@/components/frontend/CartSwiper.vue'
export default {
  components: { CartSwiper, ProgressBar },
  inject: ['emitter'],
  data () {
    return {
      couponCode: '',
      message: '',
      products: [],
      randomProducts: [],
      loadingItem: '',
      isLoading: false,
      cartPrice: {},
      cartData: {}
    }
  },
  methods: {
    getProductList () {
      this.$http
        .get(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products
          this.getCart()
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    getRandomProducts () {
      const cartItemsId = this.cartData.carts.map((item) => item.product_id)
      const filterId = [...cartItemsId]
      this.randomProducts = this.products.filter((item) => !filterId.includes(item.id))
      for (let i = this.randomProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.randomProducts[i], this.randomProducts[j]] = [
          this.randomProducts[j],
          this.randomProducts[i]
        ]
      }
    },
    updateCartItem (item) {
      this.loadingItem = item.id
      this.$http
        .put(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, {
          data: { product_id: item.id, qty: item.qty }
        })
        .then((res) => {
          this.get.getCart()
          this.loadingItem = ''
          this.isLoading = false
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
    getCart () {
      document.documentElement.scrollTop = 0
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    delProduct (id) {
      this.isLoading = true
      this.$http
        .delete(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          this.getCart()
          this.isLoading = false
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
    delAllProduct () {
      this.isLoading = true
      this.$http
        .delete(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          this.getCart()
          this.emitter.emit('push-message', {
            style: 'success',
            title: res.data.message
          })
          this.emitter.emit('get-cart')
          this.isLoading = false
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message
          })
        })
    },
    goToCheckOrder () {
      this.$router.push('//checkOrder')
    },
    ApplyCoupon () {
      const data = {
        code: this.couponCode
      }
      this.$http
        .post(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/coupon`, { data })
        .then((res) => {
          this.message = res.data.message
          this.couponCode = ''
          this.getCart()
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
    watch: {
      cartData () {
        this.getRandomProducts()
      }
    },
    mounted () {
      this.getProductsList()
      this.emitter.on('add-cart', () => {
        this.getCart()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$white: #fffafa;
$gray-600: #6c757d;

.cart-img {
  height: 7.5rem;
  width: 7.5rem;
  object-fit: cover;
}

.add_shopping_cart {
  font-size: 3rem;
}
.material-icons-outlined {
  cursor: pointer;
}
.select-num {
  width: 120px;
}
.material-icons-outlined {
  cursor: pointer;
}

.select-num {
  width: 120px;
}

h2 {
  span {
    font-family: 'Sansita Swashed', cursive;
  }
}

.price-group {
  width: 100%;
}

@media screen and (min-width: 769px) {
  .price-group {
    width: 30%;
  }
}

.apply {
  width: 100%;
  &-btn {
    width: 5rem;
    background-color: $gray-600;
  }
}

@media screen and (min-width: 769px) {
  .apply {
    width: 30%;
  }
}
.chekout-btn {
  width: 100%;
}

@media screen and (min-width: 769px) {
  .chekout-btn {
    width: 30%;
  }
}
</style>
