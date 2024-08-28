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
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
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
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control border border-1 border-muted"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" :alt="tempProduct.title" />
              <div class="mt-5" v-if="tempProduct.imagesUrl">
                <div
                  v-for="(image, index) in tempProduct.imagesUrl"
                  class="mb-3"
                  :key="`多圖_${index}`"
                >
                  <input
                    type="url"
                    class="form-control form-control"
                    v-model="tempProduct.imagesUrl[index]"
                    placeholder="請輸入連結"
                  />
                  <div>
                    <img class="img-fluid" :src="image" :alt="產品多圖" />
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="tempProduct.imagesUrl.splice(index, 1)"
                  >
                    移除
                  </button>
                </div>
                <div
                  v-if="
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] ||
                    !tempProduct.imagesUrl.length
                  "
                >
                  <button
                    type="button"
                    class="btn btn-dark text-white btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control border border-1 border-muted"
                  id="title"
                  v-model="tempProduct.title"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    type="text"
                    class="form-control border border-1 border-muted"
                    id="category"
                    v-model="tempProduct.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control border border-1 border-muted"
                    id="unit"
                    v-model="tempProduct.unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control border border-1 border-muted"
                    id="origin_price"
                    min="0"
                    v-model.number="tempProduct.origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control border border-1 border-muted"
                    id="price"
                    v-model.number="tempProduct.price"
                    min="0"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <div class="mb-3">
                  <label for="content" class="form-label">說明</label>
                  <textarea
                    type="text"
                    class="form-control border border-1 border-muted"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入說明"
                  ></textarea>
                </div>
                <!-- 文案 -->
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  type="text"
                  class="form-control border border-1 border-muted"
                  id="description"
                  v-model="tempProduct.description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <!-- 尺寸、支數 -->
              <div class="mb-3">
                <label for="specification" class="form-label">規格</label>
                <textarea
                  type="text"
                  class="form-control border border-1 border-muted"
                  id="specification"
                  v-model="tempProduct.specification"
                  placeholder="請輸入規格"
                ></textarea>
              </div>
              <!-- 花朵色系 -->
              <div class="mb-3">
                <label for="color" class="form-label">色系</label>
                <textarea
                  type="text"
                  class="form-control border border-1 border-muted"
                  id="color"
                  v-model="tempProduct.color"
                  placeholder="請輸入色系"
                ></textarea>
              </div>
              <!-- 注意事項 -->
              <div class="mb-3">
                <label for="notice" class="form-label">注意事項</label>
                <textarea
                  type="text"
                  class="form-control border border-1 border-muted"
                  id="notice"
                  v-model="tempProduct.notice"
                  placeholder="請輸入注意事項"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger text-white" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-dark text-white"
            @click="$emit('update-product', tempProduct)"
          >
            確認
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
    product: {
      type: Object,
      default () {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      status: {},
      modal: '',
      tempProduct: {}
    }
  },
  emits: ['update-product'],
  mixins: [modalMixin],
  inject: ['emitter'],
  methods: {
    uploadFile () {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      this.status.fileUploading = true
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((res) => {
          this.status.fileUploading = false
          this.tempProduct.imageUrl = res.data.imageUrl
          this.$refs.fileInput.value = ''
          this.emitter.emit('push-message', {
            style: 'success',
            title: '圖片已上傳',
            content: res.data.message
          })
           console.log(res.data)
        })
        .catch((err) => {
          this.status.fileUploading = false
          this.$httpMessageState(err.response, '圖片失敗')
        })
    }
  },
  watch: {
    product () {
      this.tempProduct = this.product
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = []
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = ''
      }
    }
  }
}
</script>
