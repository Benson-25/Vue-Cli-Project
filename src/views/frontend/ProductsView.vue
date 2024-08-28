<template>
  <div class="main container">
    <div class="d-sm-flex justify-content-sm-between mb-5">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">首頁</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">
          <RouterLink  to="/products" @click="getProductsList"
            >全部產品</RouterLink
          >
        </li>
      </ol>
      <div>
        <div class="d-flex">
          <input
            type="search"
            v-model.trim="search"
            placeholder="請輸入關鍵字"
            class="from-control fs-7 px-2 rounded-0 border border-1 border-muted w-100"
          />
          <button
            type="submit"
            class="btn bg-dark d-flex align-items-center rounded-0"
            @click="searchProducts"
          >
            <span class="material-icons text-white"> search </span>
          </button>
        </div>
        <ul class="search-list  shadow mt-2 position-absolute" :class="{ 'd-none': !searchComplete }">
          <h1>
            <li class="search-result p-3 fs-3" v-for="item in matchProducts" :key="item.title">
              <RouterLink class="text-dark" :to="`/product/${item.id}`">{{ item.title }}</RouterLink>
            </li>
          </h1>
        </ul>
      </div>
    </div>
    <div class="meun row mt-5">
      <div class="category ps-md-5 col-md-6 col-lg-3">
        <h2
          class="mb-4 fs-4 fw-bold text-dark d-flex align-items-center justify-content-center justify-content-md-start"
          @click="getCategory('')"
        >
          全部產品
          <span class="material-icons text-dark ms-2">smart_toy</span>
        </h2>
        <ul class="d-flex d-md-block justify-content-evenly mt-3">
          <li
            class="mb-4"
            v-for="item in categories"
            :key="`類別_${item}`"
            @click="getCategory(item)"
          >
            <a>
              <h2 class="fs-5">{{ item }}</h2>
            </a>
          </li>
        </ul>
      </div>
      <div calss="col-md-6 col-lg-9">
        <template v-if="products.length === 0">
          <div class="text-center pt-4">
            <span class="material-icons text-dark pb-3">sentiment_dissatisfied</span>
            <p class="text-dark mb-4 fs-5 fw-bold">沒有符合條件的搜尋結果!</p>
          </div>
        </template>
        <template v-else>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4">
            <div class="col" v-for="item in products" :key="item.id">
              <div class="fav-icon position-absolute" @click="toggleFav(item.id)">
                <span
                  class="material-icons favorite position-absolute text-white"
                  v-if="favorite.includes(item.id)"
                >
                  favorite
                </span>
                <span class="material-icons favorite position-absolute text-white" v-else>
                  favorite_border
                </span>
              </div>
              <RouterLink :to="`/product/${item.id}`">
                <div class="card-img" :style="{ backgroundImage: `url(${item.imageUrl})` }" ></div>
              </RouterLink>
              <div class="card-body d-flex align-items-end justify-content-between">
                <div class="card-body-content">
                  <RouterLink
                    class="card-title fs-5 text-dark fw-bold lh-base mb-2"
                    :to="`/product/${item.id}`"
                    >{{ item.title }}</RouterLink
                  >
                  <div
                    class="price fs-6 fw-bold text-dark mt-3"
                    v-if="item.origin_price === item.price"
                  >
                    NT$ {{ $filters.currency(item.price) }} 元
                  </div>
                  <div class="origin-price d-flex align-item-end mt-3" v-else>
                    <p class="fs-6 text-dark fw-bold">NT$ {{ $filters.currency(item.price) }} 元</p>
                    <del class="fs-7 text-dark">NT$ {{ $filters.currency(item.origin_price) }}</del>
                  </div>
                </div>
                <div @click="addCart(item.id)">
                  <div class="loader" title="1" v-if="loadingItem === item.id">
                    <svg
                      version="1.1"
                      id="loader-1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="24px"
                      height="24px"
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
                  <a class="cart-icon text-dark" v-else>
                    <span class="material-icons"> add_shopping_cart </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <PaginationCom
      class="d-flex justify-content-md-end justify-content-center mt-5"
      :pages="pagination"
      @emit-pages="getProductsList"
    />
  </div>
  <VeeLoading :active="isLoading" />
</template>

<script>
import PaginationCom from '@/components/PaginationCom.vue'
import FavoriteMixin from '@/mixins/FavoriteMixin'

export default {
  data () {
    return {
      product: {},
      products: [],
      allProducts: [],
      pagination: {},
      category: '',
      categories: [],
      loadingItem: '',
      isLoading: false,
      currentPage: 1,
      search: [],
      searchComplete: false
    }
  },
  mixins: [FavoriteMixin],
  inject: ['emitter'],
  components: {
    PaginationCom
  },
  methods: {
    getProductsList (page = 1) {
      document.documentElement.scrollTop = 0
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/?page=${page}&category=${this.category}`
        )
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
          console.log(res.data)
        })
        .catch((err) => {
          this.$httpMessageSate(err.response, err.response.data.message)
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
          this.loadingItem = ''
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    getAllProducts () {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.allProducts = res.data.products
          this.isLoading = false
          this.getCategories()
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    getCategories () {
      const MapCategories = this.allProducts.map((item) => item.category)
      this.categories = new Set(MapCategories)
    },
    getCategory (category) {
      this.category = category
    },
    searchProducts () {
      this.products = this.matchProducts
      this.searchComplete = false
      this.search = ''
    }
  },
  watch: {
  search(newVal) {
    if (typeof newVal === 'string') {
      this.search = newVal.split(' ')
    }
    if (newVal) {
      this.searchComplete = true
      this.pagination.current_page = 1
      this.pagination.total_pages = 1     
      this.pagination.has_next = false
    }else{
      this.searchComplete = false
    }
  }
},
  computed: {
    matchProducts () {
      const arr = []
    this.search.forEach((str) => {
      this.allProducts.forEach((item) => {
        if (item.title.includes(str)) {
          arr.push(item)
        }
      })
    })
    return [...new Set(arr)];
  }
},
  mounted () {
    this.getProductsList()
    this.getAllProducts()
    this.emitter.emit('get-fav', this.favorite)
  }
}
</script>

<style lang="scss" scoped>
$dark: #000;
a.active {
  color: $dark !important;
  text-decoration: none !important;
}

a.active:hover {
  color: gray !important;
}
.main {
  margin-top: 60px;
  margin-bottom: 60px;
}
.breadcrumb {
  padding-left: 0rem;
}
@media screen and (min-width: 769px) {
  .breadcrumb {
    padding-left: 2.2rem;
  }
}
.router-link-active {
  color: black;
  &:hover {
    color: gray
  }
}
.router-link-exact-active {
  color: black;
  font-weight: bold;
  &:hover {
    color: gray
  }
}
.category li a {
  color: black;
  width: 200px;
  transition: all 0.5s;
}
.category li a h2 {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
.category li a h2:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
.category li a:hover h2 {
  color: #c6cace;
  padding-right: 25px;
}
.category li a:hover h2:after {
  opacity: 1;
  right: 0;
}
@media screen and (min-width: 769px) {
  .category {
    position: sticky;
    top: 118px;
    height: calc(100vh - 118px);
  }
}

.card {
  border-radius: 1rem;
  transition-duration: 0.3s;
  &:hover {
    transform: translateY(-6px);
  }
  .card-img {
    height: 22rem;
    background-size: cover;
    background-position: center;
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
  }
  .cart-icon {
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
  .fav-icon {
    top: 3%;
    right: 3%;
    height: 2.5rem;
    width: 2.5rem;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    cursor: pointer;
    .favorite {
      top: 21%;
      left: 20%;
    }
  }
}

@media screen and (min-width: 769px) {
  .fav-icon {
    top: 3%;
    right: 3%;
    height: 2.5rem;
    width: 2.5rem;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    cursor: pointer;
    display: none;
    .favorite {
      top: 21%;
      left: 20%;
    }
  }
  .card {
    &:hover {
      .fav-icon {
        display: block;
        animation: fav-animation;
        animation-duration: 0.5s;
        transition: all 0.3s ease;
      }
    }
  }
}

.search-list {
  width: 351px;
  background-color: #fff;
  z-index: 1;
}

@media screen and (min-width: 424px) {
  .search-list {
    width: 401px;
  }
}

@media screen and (min-width: 576px) {
  .search-list {
    width: 222px;
  }
}

.menu {
  .sentiment_dissatisfied {
    font-size: 3rem;
  }
}

.loader {
  text-align: center;
  display: inline-block;
  vertical-align: top;
}

svg path,
svg rect {
  fill: $dark;
}

@keyframes fav-animation {
  from {
    top: 0;
  }
  to {
    top: 3%;
  }
}
</style>
