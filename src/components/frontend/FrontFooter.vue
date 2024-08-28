<template>
  <footer class="footer bg-dark pt-5">
    <div
      class="container d-flex flex-column flex-md-row justify-content-between align-items-center"
    >
      <div class="bg-dark text-light">
        <router-link class="navbar-brand modern-antiqua-regular pt-5 fs-2" to="/"
          >Robot. TS</router-link
        >
        <p class="fs-7 d-md-block d-none fs-sm text-white-50 mt-1 lh-sm">
          Stop making excuses do what you want do &copy; Robot .TS
        </p>
      </div>

      <div class="text-white mt-5 mt-md-0 container ">
        <ul class="d-flex flex-column flex-md-row gap-5 fs-5 justify-content-end list-unstyled">
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/products">全部產品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/About">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/contact">聯絡我們</router-link>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link fw-bold" to="/login">後台管理</RouterLink>
          </li>
        </ul>
        <div class="contact ps-md-0 text-white text-center text-lg-end mt-5 pb-3 container">
          <ul class="mt-5 gy-5 list-unstyled">
            <li class="col-5 col-md-3 d-inline">
              <a href="https://www.instagram.com/"><img src="@/assets/image/instagram.png" /></a>
            </li>
            <li class="col-5 col-md-3 d-inline ms-1">
              <a href="https://www.facebook.com/"><img src="@/assets/image/facebook.png" /></a>
            </li>
            <li class="col-5 col-md-3 d-inline ms-1">
              <a href="https://x.com/?lang=zh-Hant"><img src="@/assets/image/twitter.png" /> </a>
            </li>
            <li class="col-5 col-md-3 d-inline ms-1">
              <a href="https://www.youtube.com/"><img src="@/assets/image/youtube.png"/> </a>
            </li>
            <li class="fs-7 pt-1">Robot. TS@server.com.tw</li>
            <li class="fs-6 col-md-2 d-md-none mt-md-1 fs-sm pt-1">
              Stop making excuses do what you want. do &copy; RobotTS
            </li>
            <li class="fs-7 pt-1">本網站僅供個人作品使用，不做任何商業用途</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup></script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Iceberg&family=Modern+Antiqua&display=swap');
.nav-link {
  color: #ffff;
}
.title {
  font-family: cursive;
}
.navbar-brand {
  color: #ffff;
}
.navbar-brand:hover {
  color: black;
}
.modern-antiqua-regular {
  font-family: 'Modern Antiqua', serif;
  font-weight: 400;
  font-style: normal;
}
.nav-link:hover {
  color: black;
}
</style>
