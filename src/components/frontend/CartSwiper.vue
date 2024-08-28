<template>
  <div>
    <Swiper
      :modules="modules"
      :space-between="50"
      :navigation="true"
      :breakpoints="swiper.breakpoints"
      autoplay
    >
      <SwiperSlide v-for="item in products" :key="item.id" class="swiper-slide">
        <div class="card h-100">
          <RouterLink :to="`/product/${item.id}`">
            <div
              class="swiper-slide-inner"
              style="height: 18rem; background-position: center center; background-size: cover"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
          </RouterLink>
          <div class="card-body d-flex justify-content-between">
            <div>
              <h2 class="product-title fw-bold mb-2">{{ item.title }}</h2>
              <p class="product-price fw-bold text-primary">
                NT$ {{ $filters.currency(item.price) }}
              </p>
            </div>
            <div class="align-self-end" @click="addCart(item.id)">
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
              <a class="cart-icon text-primary" v-else>
                <span class="material-icons-outlined"> add_shopping_cart </span>
              </a>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
export default {
  props: {
    products: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: { Swiper, SwiperSlide },
  inject: ['emitter'],
  data () {
    return {
      loadingItem: '',
      isLoading: false,
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
    addCart (id, qty = 1) {
      this.loadingItem = id
      this.$http
        .post(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`, {
          data: { product_id: id, qty }
        })
        .then((res) => {
          this.loadingItem = ''
          this.emitter.emit('get-cart')
          this.emitter.emit('add-cart')
          this.emitter.emit('push-message', {
            style: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'success',
            title: err.response.data.message
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$primary: #ad795d;
$white: #fffafa;

.swiper-slide {
  height: 22rem;
  .card {
    background-color: #ffffff;
    border-radius: 1rem;
    .swiper-slide-inner {
      border-top-left-radius: 1em;
      border-top-right-radius: 1em;
      &:hover {
        opacity: 0.7;
      }
    }
    .cart-icon {
      height: 2rem;
      width: 2rem;
      cursor: pointer;
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
