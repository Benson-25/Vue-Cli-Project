<template>
  <FrontNav />
  <RouterView />
  <FrontFooter />
  <transition name="fade">
    <a
      class="go-to-top bg-white text-center text-primary position-fixed shadow rounded-circle"
      v-if="GoToTop"
      @click.prevent="goToTop"
    >
      <span class="material-icons-outlined position-absolute top-50 start-50 translate-middle">
        keyboard_capslock
      </span>
    </a>
  </transition>
</template>
<script>
import FrontNav from '@/components/frontend/FrontNav.vue'
import FrontFooter from '@/components/frontend/FrontFooter.vue'

export default {
  components: {
    FrontNav,
    FrontFooter
  },
  data () {
    return {
      GoToTop: false
    }
  },
  methods: {
    goToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.GoToTop = true
      } else {
        this.GoToTop = false
      }
    })
  }
}
</script>
<style></style>
