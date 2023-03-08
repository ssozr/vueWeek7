<template>
    <div id="app">
      <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openProductModal()">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">
                分類
              </th>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="100">
                是否啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.category }}</td>
              <td>{{ product.title }}</td>
              <td class="text-end">{{ product.origin_price }}</td>
              <td class="text-end">{{ product.price }}</td>
              <td>
                <span v-if="product.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button @click="editProductModal(product, product.id)" type="button" class="btn btn-outline-primary btn-sm">
                    編輯
                  </button>
                  <button @click="openDeleteModal(product.id)" type="button" class="btn btn-outline-danger btn-sm">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination
        :pages="pagination"
        @change-page="changePage"
        ></pagination>
        <Loading v-model:active="isLoading"/>
    </div>
      <!-- Modal -->
      <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span>新增產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-2">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">輸入圖片網址</label>
                      <input type="text" class="form-control"
                             placeholder="請輸入圖片連結" v-model="modal.imageUrl">
                    </div>
                    <img class="img-fluid" :src="modal.imageUrl" alt="">
                  </div>
                  <div>
                    <input type="text" v-model="images">
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImageUrl()">
                      新增圖片
                    </button>
                  </div>
                  <div v-if="showImageUrl">
                    <div v-for="(url, i) in modal.imagesUrl" :key="i">
                      <img class="img-fluid" :src="url" alt="">
                      <button @click="removeImageUrl(i)" class="btn btn-outline-danger btn-sm d-block w-100">
                        刪除圖片
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input v-model="modal.title" id="title" type="text" class="form-control" placeholder="請輸入標題">
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input v-model="modal.category" id="category" type="text" class="form-control"
                             placeholder="請輸入分類">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">單位</label>
                      <input v-model="modal.unit" id="unit" type="text" class="form-control" placeholder="請輸入單位">
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <input v-model="modal.origin_price" id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input v-model="modal.price" id="price" type="number" min="0" class="form-control"
                             placeholder="請輸入售價">
                    </div>
                  </div>
                  <hr>

                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea v-model="modal.description" id="description" type="text" class="form-control"
                              placeholder="請輸入產品描述">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea v-model="modal.content" id="description" type="text" class="form-control"
                              placeholder="請輸入說明內容">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input id="is_enabled" class="form-check-input" type="checkbox"
                      v-model="modal.is_enabled"
                             :true-value="1" :false-value="0">
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button @click="addPorduct()" type="button" class="btn btn-primary">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
           aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="deleteProduct (id)">
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import Swal from 'sweetalert2'
import pagination from '../../components/PaginationView.vue'
import { Modal } from 'bootstrap'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      images: '',
      isLoading: false,
      products: [],
      delModal: '',
      delId: '',
      editId: '',
      changeModal: true,
      productModal: '',
      showImageUrl: 0,
      pagination: {},
      page: '',
      modal: {
        title: '',
        category: '',
        unit: '',
        origin_price: '',
        price: '',
        description: '',
        content: '',
        is_enabled: 0,
        imageUrl: '',
        imagesUrl: []
      }
    }
  },
  components: {
    pagination,
    Loading
  },
  methods: {
    getProducts (page = 1) {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/products/?page=${page}`)
        .then((res) => {
          this.isLoading = false
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openDeleteModal (id) {
      this.delModal.show()
      this.delId = id
    },
    openProductModal () {
      this.changeModal = true
      this.showImageUrl = 0
      this.modal = {
        imagesUrl: []
      }
      this.productModal.show()
    },
    editProductModal (product, id) {
      this.changeModal = false
      this.modal = { ...product }
      const ary = this.modal.imagesUrl
      if (Boolean(ary) === false) {
        this.modal.imagesUrl = []
      }
      this.editId = id
      this.productModal.show()
    },
    addImageUrl () {
      if (this.showImageUrl > 3) {
        alert('新增圖片最多4張')
        return
      }
      this.modal.imagesUrl.push(this.images)
      this.showImageUrl++
      this.images = ''
    },
    removeImageUrl (i) {
      this.modal.imagesUrl.splice(i, 1)
      this.showImageUrl--
    },
    deleteProduct () {
      this.isLoading = true
      const id = this.delId
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/product/${id}`)
        .then((res) => {
          Swal.fire(`${res.data.message}`)
          this.delId = ''
          this.delModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          console.log(err)
          this.delId = ''
          this.delModal.hide()
        })
    },
    addPorduct () {
      this.isLoading = true
      if (this.changeModal === true) {
        const data = { ...this.modal }
        this.$http.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/product`, { data })
          .then((res) => {
            Swal.fire(`${res.data.message}`)
            this.getProducts()
            this.productModal.hide()
          })
          .catch((err) => {
            alert(err.data.message)
          })
      } else {
        const id = this.editId
        const data = { ...this.modal }
        this.$http.put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/product/${id}`, { data })
          .then((res) => {
            Swal.fire(`${res.data.message}`)
            this.getProducts()
            this.productModal.hide()
          })
          .catch((err) => {
            alert(err.data.message)
          })
      }
    },
    changePage (page) {
      this.getProducts(page)
    }
  },
  mounted () {
    this.isLoading = true
    this.getProducts()
    this.delModal = new Modal(this.$refs.delProductModal)
    this.productModal = new Modal(this.$refs.productModal)
  }
}
</script>
