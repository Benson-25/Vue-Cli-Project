<template>
  <div class="container">
    <div class="row">
      <div class="mx-auto col-md-9 col-xl-7">
        <div class="card-body rounded-3 shadow px-5 py-3 lh-lg">
          <div class="text-center">
            <span class="material-icons-outlined text-primary shopping_bag">
              shopping_bag
            </span>
            <h2 class="fw-bold fs-3">訂單資訊確認</h2>
          </div>
          <div
            class="order-detail border-top border-2 border-secondary pt-3 mt-3"
          >
            <div
              class="accordion rounded-3 shadow mt-4"
              id="accordionPanelsStayOpenExample"
            >
              <div class="accordion-item">
                <div
                  class="accordion-button"
                  data-bs-toggle="collapse"
                  data-bs-target="#order-items"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  訂購商品
                </div>
                <div
                  id="order-items"
                  class="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingOne"
                >
                  <div
                    class="accordion-body lh-lg border-top border-1 border-primary d-flex justify-content-between"
                    v-for="item in order.products"
                    :key="item.id"
                  >
                    <div>
                      <h1 class="text-start fw-bold fs-6">
                        {{ item.product.title }}
                      </h1>
                      <div class="d-flex align-items-end">
                        <p class="fw-bold">
                          NT$
                          {{ $filters.currency(item.product.price * item.qty) }}
                        </p>
                        <del class="fw-bold fs-7 text-muted ms-2">
                          NT$
                          {{
                            $filters.currency(
                              item.product.origin_price * item.qty
                            )
                          }}
                        </del>
                      </div>
                    </div>
                    <div>x {{ item.qty }} {{ item.product.unit }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-form my-4">
              <ul>
                <li class="fw-bold py-1">訂單編號：{{ order.id }}</li>
                <li class="fw-bold py-1">姓名：{{ user.name }}</li>
                <li class="fw-bold py-1">聯絡電話：{{ user.tel }}"></li>
                <li class="fw-bold py-1">Email：{{ user.email }}></li>
                <li class="fw-bold py-1">寄送地址：{{ user.address }}</li>
                <li class="fw-bold py-1">備註：{{ order.message }}</li>
                <li class="fw-bold py-1">
                  總金額：<span class="text-primary"
                    >NTD$ {{ order.total }} 元</span
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="btn d-flex justify-content-around">
            <button
              type="submit"
              class="btn btn-primary text-white w-100 fs-5"
              @click="getPay(order.id)"
            >
              確認付款
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  data () {
    return {
      order: {},
      user: {},
      orderDate: '',
      orderID: ''
    }
  },
  methods: {
    getOrder (id) {
      console.log(this.$route)
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/order/${id}`
        )
        .then((res) => {
          this.order = res.data.order
          this.user = res.data.order.user
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    getPay (id) {
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/pay/${id}`
        )
        .then(() => {
          this.emitter.emit('get-cart')
          this.$router.push('/orderfinished')
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message
          })
        })
    }
  },
  mounted () {
    this.getOrder(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.row {
  margin-top: 50px;
  margin-bottom: 100px;

  .shopping_bag {
    font-size: 3rem;
  }
}
</style>
