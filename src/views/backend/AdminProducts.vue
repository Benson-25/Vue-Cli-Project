<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between">
      <h2 class="fs-2 fw-bold text-dark">產品列表</h2>
      <button class="btn btn-dark text-white" type="button" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4 border border-1 border-muted">
      <thead class="bg-dark text-white fw-bold">
        <tr>
          <th width="120">分類</th>
          <th width="200">產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="100"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id" class="border-bottom border-1 border-muted">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>
            {{ item.origin_price }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-primary text-white btn-sm me-2 rounded"
                type="button"
                @click="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-danger text-white btn-sm rounded"
                type="button"
                @click="openDelProductModal(item)"
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
      @emit-pages="getProductsList"
    />
    <ProductModal
      @update-product="updateProduct"
      :product="tempProduct"
      :isNew="isNew"
      ref="productModal"
    />

    <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct" />
    <VeeLoading :active="isLoading" />
  </div>
</template>

<script>
import ProductModal from '@/components/backend/ProductModal.vue'
import DelModal from '@/components/backend/DelModal.vue'
import PaginationCom from '@/components/PaginationCom.vue'

export default {
  components: {
    ProductModal,
    DelModal,
    PaginationCom
  },
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      currentPage: 1,
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    getProductsList (currentPage = 1) {
      this.currentPage = currentPage
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/products/?page=${currentPage}`
        )
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      const productComponent = this.$refs.productModal
      productComponent.openModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      let api = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product`
      this.isLoading = true
      let httpMethod = 'post'
      let status = '新增產品'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
        status = '更新產品'
      }
      const productComponent = this.$refs.productModal
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res, status)
          productComponent.hideModal()
          this.getProductsList(this.currentPage)
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, status)
        })
    },
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    delProduct () {
      this.isLoading = true
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        )
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res, '刪除產品')
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getProductsList(this.currentPage)
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, '刪除產品')
        })
    }
  },
  mounted () {
    this.getProductsList()
  }
}
</script>
