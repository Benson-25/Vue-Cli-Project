<template>
  <div class="banner mb-5" :style="{ backgroundImage: `url(${imagePath})` }">
    <div class="position-absolute start-50 top-50 translate-middle text-white">
      <p class="text-nowrap text-wrap-sm title ">
        引領未來 智能科技</p>
      <h2 class="fs-6 mt-4 slogan text-center">
        Do what you can, with what you have, where you are.
      </h2>
    </div>
    <router-link to="/products">
      <button
        type="button"
        class="btn-outline-dark btn fs-5 text-white border-white border-1 rounded-3 px-4 position-absolute start-50 translate-middle cta-btn mt-5"
      >
        深入瞭解
      </button>
    </router-link>
  </div>
  <div class="container mt-6">
    <div class="row mx-1">
      <!-- 機器人 -->
      <div
        class="category-des d-flex flex-column justify-content-center align-items-center col-md-6"
      >
        <h2 class="fs-2 fw-bold category-title">
          機器人<span class="fs-5 sansita-swashed"> Robot</span>
        </h2>
        <h3 class="lh-lg my-3 fs-6">
          在多種語言中，「機器人」（自動控制機器）源自捷克語的Robot一詞，而捷克語的Robot一詞最早出現在西元1920年捷克科幻作家恰配克的《羅索姆的萬能機器人》中，
          原文作「Robota」，在捷克文當中指奴隸制，或者艱辛的勞役，恰佩克稱是其兄長，身為立體派畫家與作家的約瑟夫，提議使用斯拉夫該斯拉夫詞根，後來成為西文中通行的
          「Robot」。
        </h3>
      </div>
      <div
        class="category-img shadow col-md-6 my-5"
        :style="{ backgroundImage: `url(${imagePhoto})` }"
      ></div>
      <!-- 機器貓 -->
      <div class="d-md-flex flex-md-row-reverse">
        <div
          class="category-des d-flex flex-column justify-content-center align-items-center col-md-6 ms-2"
        >
          <h2 class="fs-2 fw-bold category-title">
            機器貓<span class="fs-5 sansita-swashed"> Robot cat</span>
          </h2>
          <h3 class="lh-lg my-3 fs-6">
            主角野比大雄為家中獨子，是住在日本東京都練馬區月見台芒原（虛構的地
            名）的小學生（依照原作所刊載的雜誌不同，年級也隨之不同，單行本裡基
            本上是四年級；日本電視台版與大山版動畫前期也是四年級，而大山版後期
            和水田版動畫則是設定五年級）。他和來自未來22世紀的機器貓哆啦A夢共同生活。
          </h3>
        </div>
        <div
          class="category-img shadow col-md-6 mb-5 mt-5"
          :style="{ backgroundImage: `url(${imagePho})` }"
        ></div>
      </div>
      <!-- 機器狗 -->
      <div
        class="category-des d-flex flex-column justify-content-center align-items-center col-md-6"
      >
        <h2 class="fs-2 fw-bold category-title">
          機器狗<span class="fs-5 sansita-swashed"> Robot dog</span>
        </h2>
        <h3 class="lh-lg my-3 fs-6">
          機械狗項目是由美國國防高等研究計劃署出資資助的。希望研製一種能夠負
          重的機械騾，能夠和士兵一起在傳統機械車輛無法行駛的粗糙地形上作戰。
          它沒有車輪或者履帶，而是採用四條機械腿來運動。機械腿上面有各種傳感
          器，包括關節位置和接觸地面的部位。它還有一個雷射迴轉儀，以及一套立體視覺系統
        </h3>
      </div>
      <div
        class="category-img shadow col-md-6 mb-5 mt-5"
        :style="{ backgroundImage: `url(${imagePhot})` }"
      ></div>
    </div>
    <!-- 送餐機器人 -->
    <div class="d-md-flex flex-md-row-reverse">
      <div
        class="category-des d-flex flex-column justify-content-center align-items-center col-md-6 ms-4"
      >
        <h2 class="fs-2 fw-bold category-title">
          送餐機器人<span class="fs-5 sansita-swashed"> Food delivery Robot</span>
        </h2>
        <h3 class="lh-lg my-3 fs-6">
          送餐機器人是一種服務型機器人。這種機器人除了會把點好的餐點，從餐廳的廚房送到顧客桌上外，還會帶走顧客吃完的剩菜餐盤。2019年2024年冠狀病
          毒
          病疫情期間，送餐機器人開始在各地快速普及，以避免接客涉及的人際接觸。儘管送餐機器人主要用於餐廳，其他非餐廳場所，比如醫院，也會利用送餐機器人運送其他物品。
        </h3>
      </div>
      <div
        class="category-img shadow col-md-6 mb-5 mt-5"
        :style="{ backgroundImage: `url(${imagePh})` }"
      ></div>
    </div>
  </div>

  <div class="container my-6">
    <h2 class="fs-2 fw-bold mb-4">商品 <span class="fs-5 sansita-swashed">Selected</span></h2>
    <RandomSwiper />
    <div class="text-center mt-4 my-sm-5 mb-5">
      <RouterLink class="see-more btn btn-outline-dark" to="/products">查看更多</RouterLink>
    </div>
  </div>

  <div class="container mb-4 mb-sm-5">
    <div class="row align-items-center g-2 d-flex justify-content-center align-items-center">
      <div class="about-des col-md-4">
        <h2 class="fs-2 fw-bold mb-5">
          關於我們 <span class="fs-5 sansita-swashed">About us</span>
        </h2>
        <h3 class="lh-lg fs-6">
          RobotTS正大規模地在機器人等領域開發和部署自主運作系統。我們深信以先進人工智慧為基礎的視覺和規劃
          ，藉助推理硬體的有效運用，是實現應用雙足機器人及其他應用開發的唯一途徑。
        </h3>
      </div>
      <div
        class="about-img shadow col-md-6 ms-xl-5"
        :style="{ backgroundImage: `url(${imagePa})` }"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  height: calc(100vh - 150px);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  .title {
    font-size: 48px;
    text-align: center;
    color: #000000;
    top: 40%;
  }
  .cta-btn {
    top: 62%;
  }
}
.sansita-swashed {
  font-family:
    Comic Sans MS,
    Comic Sans,
    cursive;
}
.category-img {
  height: 25rem;
  border-radius: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.category-title .lh-lg {
  text-shadow: 1px 1px #000000;
  font-family: sans-serif;
}
@media screen and (min-width: 769px) {
  .category-img {
    height: 30rem;
  }
}
.see-more {
  letter-spacing: 5px;
  padding-left: 30px;
  padding-right: 30px;
  border: 2px solid #000000;
}
.about-img {
  height: 25rem;
  border-radius: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
</style>

<script setup>
import imagePath from '@/assets/image/str.jpg'
import imagePhoto from '@/assets/image/801x.jpg'
import imagePhot from '@/assets/image/802x.jpg'
import imagePho from '@/assets/image/800x.jpg'
import imagePh from '@/assets/image/804x.webp'
import imagePa from '@/assets/image/805.jpg'
</script>
<script>
import RandomSwiper from '@/components/frontend/RandomSwiper.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      category: ''
    }
  },
  components: { RandomSwiper },
  mounted () {
    document.documentElement.scrollTop = 0
  }
}
</script>
