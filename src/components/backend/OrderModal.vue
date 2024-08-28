<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3 class="fs-5 fw-bold text-primary mb-3">用戶資料</h3>
              <div class="lh-lg" v-if="tempOrder.user">
                <p>姓名：{{ tempOrder.user.name }}</p>
                <p>Email：{{ tempOrder.user.email }}</p>
                <p>電話：{{ tempOrder.user.tel }}</p>
                <p>地址：{{ tempOrder.user.address }}</p>
              </div>
            </div>
            <div class="col-md-8">
              <h3 class="fs-5 fw-bold text-primary mb-3">訂單細節</h3>
              <div class="lh-lg" v-if="tempOrder.user">
                <p>訂單編號：{{ tempOrder.id }}</p>
                <p>下單時間：{{ $filters.date(tempOrder.create_at) }}</p>
                <p>
                  付款時間：
                  <span v-if="tempOrder.is_paid">
                    {{ $filters.date(tempOrder.paid_date) }}
                  </span>
                  <span v-else>尚未付款</span>
                </p>
                <div>
                  付款狀態：
                  <div class="d-flex align-items-center">
                    <div>
                      <strong v-if="tempOrder.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted me-2">尚未付款 </span>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        v-model="tempOrder.is_paid"
                      />
                    </div>
                  </div>
                </div>
                <p>總金額： {{ $filters.currency(tempOrder.total) }}</p>

                <p class="fs-5 fw-bold text-primary mb-3">選購商品</p>
                <table class="table">
                  <thead>
                    <tr>
                      <th class="fw-bold p-0">品項</th>
                      <th class="fw-bold p-0">數量</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in tempOrder.products"
                      :key="`選購商品_${index}`"
                    >
                      <th class="p-0">
                        {{ item.product.title }}
                      </th>
                      <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success text-white"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary text-white"
            @click="$emit('update-paid', tempOrder)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: {
    order: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      modal: '',
      tempOrder: {},
      isPaid: ''
    }
  },
  emits: ['update-paid'],
  mixins: [modalMixin],
  watch: {
    order () {
      this.tempOrder = this.order
    }
  }
}
</script>
