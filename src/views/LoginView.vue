<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <h1 class="my-5 fs-3 text-center text-dark fw-bold">登入後台</h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="signIn">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="請輸入帳號"
              v-model="user.username"
              required
              autofocus
            />
            <label for="username">帳號</label>
          </div>
          <div class="form-floating">
            <input
              type="psassword"
              class="form-control"
              id="password"
              placeholder="請輸入密碼"
              v-model="user.password"
              required
            />
            <label for="password">密碼</label>
          </div>
          <button class="btn btn-lg btn-dark text-white w-100 mt-3" type="submit">登入</button>
          <RouterLink to="/" class="d-flex justify-content-center mt-3 text-dark"
            >回到首頁</RouterLink
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  inject: ['emitter'],
  methods: {
    signIn () {
      this.$http
        .post(`${process.env.VUE_APP_API}/v2/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `RobotTStoken=${token}; expires=${new Date(expired)};`
          this.$router.push('/admin/products')
          console.log('登入成功:', res.data)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
          this.$router.push('/login')
        })
    }
  }
}
</script>
