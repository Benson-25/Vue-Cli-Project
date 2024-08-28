<template>
  <DashboardNav />
  <RouterView v-if="checkSuccess" />
  <DashboardFooter />
</template>

<script>
import DashboardNav from '@/components/backend/DashboardNav.vue'
import DashboardFooter from '@/components/backend/DashboardFooter.vue'
export default {
  inject: ['emitter'],
  components: {
    DashboardNav,
    DashboardFooter
  },
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLogIn () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)RobotTStoken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        this.$http.defaults.headers.common['.Authorization'] = `${token}`
        this.$http
          .post(`${process.env.VUE_APP_API}/v2/api/user/check`, {
            api_token: this.token
          })
          .then(() => {
            this.checkSuccess = true
          })
          .catch((err) => {
            this.$httpMessageState(err.response, err.response.data.message)
            this.$router.push('/login')
          })
      } else {
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '登入失敗，請重新登入！'
        })
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.checkLogIn()
  }
}
</script>
