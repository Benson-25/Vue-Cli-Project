export default {
  inject: ['emitter'],
  data () {
    const storedFavorite = localStorage.getItem('favorite')
    let favorite = []
    try {
      favorite = storedFavorite ? JSON.parse(storedFavorite) : []
    } catch (e) {
      console.error('JSON 解析錯誤:', e)
      favorite = []
    }
    return {
      favorite
    }
  },
  methods: {
    toggleFav (id) {
      const favID = this.favorite.findIndex((item) => item === id)
      if (favID === -1) {
        this.favorite.push(id)
        this.emitter.emit('push-message', {
          style: 'success',
          title: '已經加入最愛!'
        })
      } else {
        this.favorite.splice(favID, 1)
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '移除最愛!'
        })
      }
      this.emitter.emit('get-fav', this.favorite)
    }
  },
  watch: {
    favorite: {
      deep: true,
      handler () {
        try {
          localStorage.setItem('favorite', JSON.stringify(this.favorite))
        } catch (e) {
          console.error('存儲到 localStorage 時發生錯誤:', e)
        }
      }
    }
  }
}
