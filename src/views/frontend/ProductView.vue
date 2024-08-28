<template>
  <div class="container my-5">
    <div class="product mb-5">
      <div class="row">
        <div class="product-img text-xl-end col-md-7">
          <div
            class="product-img-imageUrl"
            v-if="!product.imagesUrl"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
          <ProductSwiper v-else :productSwiper="product" />
        </div>
        <div class="product-body col-md-5 mt-4 mt-md-0">
          <div class="d-flex justify-content-between">
            <ol class="breadcrumb mb-4 mt-1">
              <li class="breadcrumb-item fs-7 fw-bold">
                <RouterLink class="text-standard" to="/">首頁</RouterLink>
              </li>
              <li class="breadcrumb-item fs-7 fw-bold" aria-current="page">
                <RouterLink class="text-standard" to="/products">全部產品</RouterLink>
              </li>
              <li class="breadcrumb-item fs-7 fw-bold" aria-current="page">
                {{ product.category }}
              </li>
            </ol>
            <div class="fav-icon" @click="toggleFav(product.id)">
              <span
                class="material-icons-outlined favorite text-primary"
                v-if="favorite.includes(product.id)"
              >
                favorite
              </span>
              <span class="material-icons-outlined favorite text-primary" v-else>
                favorite_border
              </span>
            </div>
          </div>
          <h1 class="fw-bold mb-4 fs-2">
            {{ product.title }}
          </h1>
          <div
            class="price fw-bold text-primary mt-3"
            v-if="product.origin_price === product.price"
          >
            NT$ {{ $filters.currency(product.price) }} 元
          </div>
          <div v-else class="origin-price d-flex align-items-end">
            <div class="pe-2 text-primary fw-bold">
              NT$ {{ $filters.currency(product.price) }} 元
            </div>
            <del class="text-decoration-line-through ps-2">
              NT$ {{ $filters.currency(product.origin_price) }} 元</del
            >
          </div>
          <h2 class="product-description lh-lg mt-4 p-3 rounded-3 fs-6">
            {{ product.description }}
          </h2>
          <!-- 產品詳細說明 -->
          <div class="accordion rounded-3 shadow mt-4" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
              <div
                class="accordion-button text-standard"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                產品詳細說明
              </div>
              <div
                id="panelsStayOpen-collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div class="accordion-body lh-lg border-top border-1 border-primary">
                  <ul>
                    <li class="fs-7" v-if="product.specification">
                      <h3 class="text-standard fs-6">規格：</h3>
                      {{ product.specification }}
                    </li>

                    <li class="fs-7 mt-3" v-if="product.color">
                      <h3 class="text-standard fs-6">花朵色系：</h3>
                      {{ product.color }}
                    </li>

                    <li class="fs-7 mt-3" v-if="product.notice">
                      <h3 class="text-standard fs-6">注意事項：</h3>
                      {{ product.notice }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <input type="number" class="form-control mt-4" min="1" max="5" v-model.number="qty" />
          <button
            type="button"
            class="btn btn-primary text-white w-100 mt-4"
            @click="addCart(product.id, qty)"
            :disabled="loadingItem === product.id"
          >
            加入購物車
            <div class="loader" title="1" v-if="loadingItem === product.id">
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
    <ul
      class="nav nav-tabs d-flex justify-content-around mb-3 border-bottom border-1 border-gray-400"
      id="myTab"
      role="tablist"
    >
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          付款/取貨
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          購物須知
        </button>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane active lh-lg" id="home" role="tabpanel" aria-labelledby="home-tab">
        ∙ 付款方式：現金付款、信用卡<br />
        ∙ 取/送貨方式：店面自取、黑貓-常溫（送貨需要2-3日）
      </div>
      <div class="tab-pane lh-lg" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        ∙ 品項有限，每款商品最多限購5個，如需大量訂購請與我們聯繫，將提供報價單！<br />
        ∙ 測量尺寸與實際尺寸可能會有些微誤差，螢幕亮度等可能會有色差，請以實品為主！<br />
        ∙ 有任何問題都可以【聯繫我們】，我們會在看到你的來訊/來信的時候盡快回覆你的訊息！
      </div>
    </div>

    <div class="mt-6">
      <h2 class="text-primary fw-bold mb-4">推薦商品 <span class="fs-5">Recommend</span></h2>
      <RandomSwiper @get-product="getProduct" />
    </div>
  </div>
</template>
<script>
import RandomSwiper from '@/components/frontend/RandomSwiper.vue'
import ProductSwiper from '@/components/frontend/ProductSwiper.vue'
import FavoriteMixin from '@/mixins/FavoriteMixin'
export default {
  components: { ProductSwiper, RandomSwiper },
  mixins: [FavoriteMixin],
  inject: ['emitter'],
  data () {
    return {
      product: {
        imageUrl: ''
      },
      qty: 1,
      loadingItem: '',
      isLoading: false
    }
  },
  methods: {
    getProduct () {
      document.documentElement.scrollTop = 0
      this.isLoading = true
      const { id } = this.$route.params
      this.$http
        .get(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
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
  watch: {
    $route (to) {
      if (to.name === 'product') {
        this.getProduct(`${to.params.id}`)
      }
    }
  },
  mounted () {
    this.getProduct()
    this.emitter.emit('get-fav', this.favorite)
  }
}
</script>
<style lang="scss" scoped>
$black: #0000;

.breadcrumb-item {
  font-size: 0.75rem;
}
@media screen and (min-width: 769px) {
  .breadcrumb-item {
    font-size: 1rem;
  }
}
.origin-price {
  font-size: 1.2rem;
}
@media screen and (min-width: 769px) {
  .origin-price {
    font-size: 1.5rem;
  }
}
del {
  color: $black;
  font-size: 0.75rem;
}
@media screen and (min-width: 769px) {
  del {
    font-size: 1rem;
  }
}
.product-img {
  object-fit: cover;
}
@media screen and (min-width: 1200px) {
  .product-img {
    object-fit: cover;
    padding-right: 4rem;
  }
}

.product-img-imageUrl {
  height: 45rem;
  background-position: center center;
  background-size: cover;
}

.product-description {
  background-color: #e6ccab57;
  border-left: 3px solid $black;
}
.form-control {
  border: 3px solid $black;
}
@media screen and (min-width: 769px) {
  .accordion-body ul li,
  p {
    font-size: 1rem;
  }
}
@media screen and (min-width: 769px) {
  .product-body {
    position: sticky;
    top: 118px;
    height: calc(100vh - 118px);
  }
}

.nav .active {
  border-bottom: 2px solid $black;
}

h2 {
  span {
    font-family: 'Sansita Swashed', cursive;
  }
}
.accordion-button {
  color: $black;
}
.fav-icon {
  cursor: pointer;
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
