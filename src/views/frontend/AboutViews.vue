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
      <h1 class="text-dark fw-bold lh-lg fs-2">" 有Robot .TS機器人相伴，智慧生活每一天 "</h1>
      <h2 class="fw-bold mt-5 mb-4 fs-4">機器人突破極限，讓人類專注創新</h2>
      <h3 class="lh-lg fs-6">
        機器人可以代人類不想做的工作，做一些因為尺寸限制，人類無法作的工作，甚至是像外太空或是深海中，不適人類生存的環境。社會上對越來越多的機器人及其角色有些疑慮，機器人因為在越來越多方面可以取代人類，因此被認為是增加失業人口的主因之一
      </h3>
      <h2 class="fw-bold mt-5 mb-4 fs-4">關於 Robot .TS</h2>
      <h3 class="lh-lg fs-6">
        高效性能：先進AI和強大處理器，迅速適應環境。多功能設計：
        支持語音指令、智能導航、即時數據分析。 友好界面：直觀觸控屏和移動應用，輕鬆操作。
        自定義設定：適應不同需求，提供量身訂製解決方案。環保節能：低能耗設計，符合現代環保需求。
        「Robot .TS」— 智慧生活的最佳夥伴，立即體驗科技帶來的便利！
      </h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

p {
  font-size: 0.875rem;
}

@media screen and (min-width: 576px) {
  p {
    font-size: 1rem;
  }
}
</style>

<script setup>
import imageRobot from '@/assets/image/robot-1.jpg'
</script>
