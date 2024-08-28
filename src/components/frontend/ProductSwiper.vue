<template>
  <swiper
    :navigation="false"
    :pagination="true"
    autoplay
    :thumbs="{ swiper: swiper.thumbsSwiper }"
    :modules="modules"
  >
    <swiper-slide>
      <div
        class="swiper-slide-inner"
        :style="{ backgroundImage: `url(${productSwiper.imageUrl})` }"
      ></div>
    </swiper-slide>
    <swiper-slide v-for="(img, index) in productSwiper.imagesUrl" :key="`swiperImage_${index}`">
      <div class="swiper-slide-inner" :style="{ backgroundImage: `url(${img})` }"></div>
    </swiper-slide>
  </swiper>

  <swiper
    @swiper="setThumbsSwiper"
    :slidesPerView="4"
    :watchSlidesProgress="true"
    :watchSlidesVisibility="true"
    :modules="modules"
    :breakpoints="swiper.breakpoints"
    class="mySwiper mt-3"
  >
    <swiper-slide
      ><div class="slides" :style="{ backgroundImage: `url(${productSwiper.imageUrl})` }"></div>
    </swiper-slide>
    <swiper-slide v-for="(img, index) in productSwiper.imagesUrl" :key="`swiperImage_${index}`">
      <div class="slides" :style="{ backgroundImage: `url(${img})` }"></div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectCoverflow, Thumbs } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default {
  prpos: {
    productSwiper: {}
  },
  components: { Swiper, SwiperSlide },
  data () {
    return {
      modules: [Navigation, Pagination, Autoplay, EffectCoverflow, Thumbs],
      swiper: {
        thumbsSwiper: null,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        breakpoints: {
          0: {
            slidesPerView: 3,
            spaceBetween: 60
          },
          425: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 0
          }
        }
      }
    }
  },
  methods: {
    setThumbsSwiper (swiper) {
      this.swiper.thumbsSwiper = swiper
    }
  }
}
</script>
<style lang="scss" scoped></style>
