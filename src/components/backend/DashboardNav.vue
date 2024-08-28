<template>
  <div class="bg-dark position-sticky top-0">
    <div class="container py-3">
      <div class="d-flex  justify-content-between">
        <RouterLink class=" modern-antiqua-regular  fs-3 mt-1 navbar-brand" to="/"
          >Robot.TS</RouterLink
        >
        <button
          class="btn text-dark bg-white fw-bold px-3"
          type="button"
          @click.prevent="signOut"
        >
          登出
        </button>
      </div>
    </div>
  </div>
  <div class="container mt-4 d-flex justify-content-end ">
    <RouterLink class="text-color" to="/admin/products">產品列表</RouterLink>
    <RouterLink class="text-color"  to="/admin/articles">|文章列表</RouterLink>
    <RouterLink class="text-color"  to="/admin/coupon">| 優惠卷列表 |</RouterLink>
    <RouterLink class="text-color"  to="/admin/order">訂單列表</RouterLink>
  </div>
</template>

<script>
export default {
  methods: {
    signOut () {
      document.cookie = 'RobotTStoken=;expires=;'
      alert('token已清除')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
$white: #fffafa;
$black: #000000;
.text-color{
  color:$black
}
.text-color:hover{
  color:gray
}
.modern-antiqua-regular {
  font-family: 'Modern Antiqua', serif;
  font-weight: 400;
  font-style: normal;
}
.navbar-brand {
  color:$white
}
.navbar-brand:hover {
  color:$black
}
</style>
