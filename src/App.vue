<template>
  <ToastMessages />
  <RouterView />
</template>

<script>
import emitter from '@/libs/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
export default {
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>

<style lang="scss">
@import './assets/stylesheets/all.scss';
</style>
