<template>
  <div>
    <swiper
      :modules="modules"
      :space-between="50"
      :navigation="true"
      :breakpoints="swiper.breakpoints"
      autoplay
    >
      <swiper-slide v-for="item in randomProducts" :key="item.id" class="swiper-slide">
        <div class="card border-width h-100">
          <RouterLink :to="`/product/${item.id}`">
            <div
              class="swiper-slide-inner"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
          </RouterLink>
          <div class="card-body d-flex justify-content-between">
            <h2 class="product-title fw-bold">{{ item.title }}</h2>
            <p class="product-price fw-bold text-dark">NT$ {{ $filters.currency(item.price) }}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  components: { Swiper, SwiperSlide },
  emits: ['get-product'],
  data () {
    return {
      products: [],
      randomProducts: [],
      modules: [Navigation, Pagination, Autoplay, EffectCoverflow],
      swiper: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        breakpoints: {
          0: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50
          }
        }
      }
    }
  },
  methods: {
    getProductsList () {
      this.$http
        .get(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.product = res.data.products
          this.getRandomProducts()
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    getRandomProducts () {
      if (this.$route.params.id) {
        const productItemId = this.this.$route.params.id
        this.randomProducts = this.products.filter((item) => item.id !== productItemId)
      } else {
        this.RandomProducts = this.products
      }
      for (let i = this.randomProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[this.randomProducts[i], this.randomProducts[j]] = [
          this.randomProducts[j],
          this.randomProducts[i]
        ]
      }
      this.randomProducts = this.randomProducts.splice(0, 10)
    }
  },
  watch: {
    $route () {
      if (this.$route.name === 'product') {
        this.getProductsList()
      }
    }
  },
  mounted () {
    this.getProductsList()
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  height: 21rem;
  .card {
    background-color: #ffffff;
    border-radius: 1rem;
    .swiper-slide-inner {
      border-radius: 1rem;
      height: 18rem;
      background-position: center center;
      background-size: cover;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
.product-title {
  font-size: 0.75rem;
}
@media screen and (min-width: 1200px) {
  .product-title {
    font-size: 0.875rem;
  }
}
.product-price {
  font-size: 0.875rem;
}
@media screen and (min-width: 1200px) {
  .product-price {
    font-size: 1rem;
  }
}
</style>
