<template>
  <ProgressBar step="2" />
  <div class="container">
    <div class="row my-5">
      <div class="col-md-6">
        <div class="cart-list rounded-3 shadow p-5">
          <div
            class="d-flex justify-content-between align-items-end fs-7 border-bottom border-2 border-secondary pb-3"
          >
            <h2 class="fw-bold fs-4">購物清單</h2>
          </div>
          <div v-for="item in cartData.carts" :key="item.id">
            <div class="cart-list-body mt-4 d-flex">
              <div class="d-flex flex-grow-1">
                <RouterLink :to="`/product/${item.product.id}`">
                  <img class="cart-img rounded-3" :src="item.product.imageUrl" :alt="item.title" />
                </RouterLink>
                <div class="d-flex flex-column justify-content-start ms-3 mt-2">
                  <RouterLink :to="`/product/${item.product.id}`" class="mb-3">
                    <h1 class="fs-5 fw-bold text-black">
                      {{ item.product.title }}
                    </h1>
                  </RouterLink>
                  <p>數量：{{ item.qty }} {{ item.product.unit }}</p>
                  <div class="d-sm-none d-flex align-items-end">
                    <p class="fw-bold fs-7 mt-3">
                      NT$
                      {{ $filters.currency(item.product.price * item.qty) }}
                    </p>
                    <del class="fs-8 text-dark ms-2">
                      NT$
                      {{ $filters.currency(item.product.origin_price * item.qty) }}
                    </del>
                  </div>
                </div>
              </div>
              <div class="d-sm-flex flex-sm-column mt-1">
                <div class="d-none d-sm-block">
                  <p class="mb-2 fw-bold fs-5">
                    NT$
                    {{ $filters.currency(item.product.price * item.qty) }}
                  </p>
                  <del class="fs-7 text-muted d-flex flex-column align-items-end">
                    NT$
                    {{ $filters.currency(item.product.origin_price * item.qty) }}
                  </del>
                </div>
              </div>
            </div>
          </div>
          <div v-if="cartData.carts?.length">
            <p class="text-end fw-bold text-dark fs-4 mt-5">
              總金額 NT$ {{ $filters.currency(cartData.final_total) }}
            </p>
          </div>
        </div>
      </div>
      <div class="mb-5 justify-content-center col-md-6">
        <VeeForm class="rounded-3 shadow p-5" ref="form" v-slot="{ errors }" @submit="createOrder">
          <div>
            <h2 class="border-bottom border-2 border-secondary fs-4 fw-bold pb-3">填寫資料</h2>
          </div>
          <div class="form-floating form-downline mt-4 mb-3">
            <VeeField
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              rules="required"
              v-model="form.user.name"
              placeholder="請輸入姓名"
            />
            <label for="name" class="form-label"><span class="text-dark">* </span>姓名</label>
            <ErrorMessage name="姓名" class="invalid-feedback" />
          </div>
          <div class="form-floating form-downline mb-3">
            <VeeField
              id="tel"
              name="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              rules="required|min:8|max:10"
              v-model="form.user.tel"
              placeholder="請輸入電話"
            />
            <label for="tel" class="form-label"><span class="text-dark">* </span>聯絡電話</label>
            <ErrorMessage name="電話" class="invalid-feedback" />
          </div>
          <div class="form-floating form-downline mb-3">
            <VeeField
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              rules="required"
              v-model="form.user.address"
              placeholder="請輸入地址"
            />

            <label for="address" class="form-label"
              ><span class="text-danger">* </span>寄送地址</label
            >
            <ErrorMessage name="地址" class="invalid-feedback" />
          </div>
          <div class="form-floating form-downline">
            <VeeField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              rules="email|required"
              v-model="form.user.email"
              placeholder="請輸入Email"
            />
            <label for="email" class="form-label"><span class="text-dark">* </span>Email</label>
            <ErrorMessage name="email" class="invalid-feedback" />
          </div>
          <div class="mt-3">
            <label for="message" class="form-label ps-2">備註</label>
            <textarea
              id="message"
              class="form-control border border-1"
              cols="20"
              rows="5"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="d-flex justify-content-around p-0 mt-4">
            <button
              type="button"
              class="btn text-muted w-50 fs-5 border border-2 me-3"
              @click="goToPreviousPage()"
            >
              返回
            </button>
            <button
              type="submit"
              class="btn btn-dark text-white w-50 fs-5"
              :disabled="Object.keys(errors).length > 0"
            >
              前往付款
            </button>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
  <VeeLoading :active="isLoading" />
</template>

<script>
import ProgressBar from '@/components/frontend/ProgressBar.vue'

export default {
  components: { ProgressBar },
  data () {
    return {
      loadingStatus: {
        loadingItem: ''
      },
      isLoading: false,
      cartPrice: {},
      cartData: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      document.documentElement.scrollTop = 0
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    createOrder () {
      this.isLoading = true
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, {
          data: this.form
        })
        .then((res) => {
          this.isLoading = false
          this.$refs.form.resetForm()
          this.form.message = ''
          const { orderId } = res.data
          this.$router.push(`/checkout/${orderId}`)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, err.response.data.message)
        })
    },
    goToPreviousPage () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.cart-img {
  height: 6.5rem;
  width: 6.5rem;
  object-fit: cover;
}

@media screen and (min-width: 425px) {
  .cart-img {
    height: 7.5rem;
    width: 7.5rem;
  }
}
@media screen and (min-width: 769px) {
  form {
    position: sticky;
    top: 118px;
  }
}
.form-control {
  border-bottom: 1px solid black;
}
</style>
