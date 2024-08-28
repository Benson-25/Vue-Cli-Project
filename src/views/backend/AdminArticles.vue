<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between">
      <h2 class="fs-2 fw-bold text-dark">文章列表</h2>
      <button
        class="btn btn-dark text-white"
        type="button"
        @click="openModal(true)"
      >
        建立新的文章
      </button>
    </div>
    <table class="table mt-4 border border-1 border-muted">
      <thead class="bg-dark text-white fw-bold">
        <tr>
          <th width="250">標題</th>
          <th width="100">作者</th>
          <th>描述</th>
          <th width="120">建立時間</th>
          <th width="100">是否公開</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in articles"
          :key="item.id"
          class="border-bottom border-1 border-muted"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.description }}</td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>
            <span v-if="item.isPublic" class="text-success">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-primary text-white btn-sm me-2 rounded"
                type="button"
                @click="getArticle(item.id)"
              >
                編輯
              </button>
              <button
                class="btn btn-danger text-white btn-sm rounded"
                type="button"
                @click="openDelArticleModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationCom
      class="d-flex justify-content-end"
      :pages="pagination"
      @emit-pages="getArticles"
    />
    <ArticleModal
      ref="articleModal"
      :article="tempArticle"
      :isNew="isNew"
      @update-article="updateArticle"
    ></ArticleModal>
    <DelModal :item="tempArticle" ref="delModal" @del-item="delArticle" />
    <VeeLoading :active="isLoading" />
  </div>
</template>

<script>
import ArticleModal from '@/components/backend/ArticleModal.vue'
import DelModal from '@/components/backend/DelModal.vue'
import PaginationCom from '@/components/PaginationCom.vue'

export default {
  data () {
    return {
      articles: [],
      pagination: {},
      isLoading: false,
      isNew: false,
      tempArticle: {},
      currentPage: 1
    }
  },
  inject: ['emitter'],
  components: {
    ArticleModal,
    DelModal,
    PaginationCom
  },
  methods: {
    getArticles (page = 1) {
      this.currentPage = page
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`
        )
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.articles = res.data.articles
            this.pagination = res.data.pagination
          }
        })
        .catch((err) => {
          this.isLoading = false
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message
          })
        })
    },
    getArticle (id) {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`
        )
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.openModal(false, res.data.article)
            this.isNew = false
          }
        })
        .catch((err) => {
          this.isLoading = false
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message
          })
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: []
        }
        this.isNew = true
      } else {
        this.tempArticle = { ...item }
        this.isNew = false
      }
      this.$refs.articleModal.openModal()
    },
    updateArticle (item) {
      this.tempArticle = item
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`
      let httpMethod = 'post'
      let status = '新增貼文'
      this.isLoading = true
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
        httpMethod = 'put'
        status = '更新貼文'
      }
      const articleComponent = this.$refs.articleModal
      this.$http[httpMethod](api, { data: this.tempArticle })
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res, status)
          articleComponent.hideModal()
          this.getArticles(this.currentPage)
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    openDelArticleModal (item) {
      this.tempArticle = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    delArticle () {
      this.isLoading = true
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
        )
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res, '刪除貼文')
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getArticles(this.currentPage)
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, '刪除貼文')
        })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>
