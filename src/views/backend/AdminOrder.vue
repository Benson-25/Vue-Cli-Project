<template>
  <div class="container mt-4">
    <h2 class="fs-2 fw-bold text-dark">訂單列表</h2>
    <table class="table mt-4 border border-1 border-muted">
      <thead class="bg-dark text-white fw-bold">
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th class="lh-lg">購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr v-if="orders.length" :class="{ 'text-success': item.is_paid }"
            class="border-bottom border-1 border-muted">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in item.products" :key="product.product.title">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`" v-model="item.is_paid"
                  @change="updatePaid(item)" />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-primary text-white btn-sm me-2 rounded" type="button" @click="openModal(item)">
                  檢視
                </button>
                <button class="btn btn-danger text-white btn-sm rounded" type="button" @click="openDelOrderModal(item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <PaginationCom class="d-flex justify-content-end" :pages="pagination" @emitPages="getOrders" />
    <OrderModal :order="tempOrder" ref="orderModal" @update-paid="updatePaid" />
    <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder" />
    <VeeLoading :active="isLoading" />
  </div>
</template>

<script>
import DelModal from '@/components/backend/DelModal.vue'
import OrderModal from '@/components/backend/OrderModal.vue'
import PaginationCom from '@/components/PaginationCom.vue'

export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1
    }
  },
  components: {
    PaginationCom,
    DelModal,
    OrderModal
  },
  methods: {
    getOrders (currentPage = 1) {
      this.currentPage = currentPage
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
        )
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    openModal (item) {
      this.tempOrder = { ...item }
      this.isNew = false
      const orderComponent = this.$refs.orderModal
      orderComponent.openModal()
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    updatePaid (item) {
      this.isLoading = true
      const paid = {
        is_paid: item.is_paid
      }
      this.$http
        .put(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`,
          { data: paid }
        )
        .then((res) => {
          this.isLoading = false
          const orderComponent = this.$refs.orderModal
          orderComponent.hideModal()
          this.getOrders(this.currentPage)
          this.$httpMessageState(res, '更新付款狀態')
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    delOrder () {
      this.isLoading = true
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
        )
        .then(() => {
          this.isLoading = false
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getOrders(this.currentPage)
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, err.response.data.message)
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
