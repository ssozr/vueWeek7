<template>
  <table class="table">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in orders" :key="item.id">
        <td>{{ time(item.create_at) }}</td>
        <td>{{ item.user.email }}</td>
        <td>
          <ul class="list-unstyled">
            <li v-for="(product, i) in item.products" :key="i">
              {{ product.product.title }}*{{ product.qty }}={{ product.total }}
            </li>
          </ul>
        </td>
        <td>
          {{ item.total }}
        </td>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="item.id" :checked="item.is_paid" @click="upDataPaid(item)">
            <label class="form-check-label" :for="item.id">
              <p v-if="item.is_paid">已付款</p>
              <p v-else>未付款</p>
            </label>
          </div>
        </td>
        <td>
        <button type="button" class="btn btn-outline-primary" @click="opOrderModal(item)">檢視</button>
        <button type="button" class="btn btn-outline-primary" @click="opDelModal(item.id)">刪除</button>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination
  :pages="pagination"
  @change-page="changePage"
  ></pagination>
  <loading v-model:active="isLoading"/>

<!--刪除 modal -->
<div class="modal" tabindex="-1" id="delModal" ref="delModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">確認刪除?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>訂單編號:{{ delModalId }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" @click="deleteOrder()" class="btn btn-primary">確定刪除</button>
      </div>
    </div>
  </div>
</div>
<!-- 訂單資訊 modal -->
<div class="modal" tabindex="-1" id="orderModal" ref="orderModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">訂單編號{{ orderData.id }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ul>
          <li v-for="product in orderData.products" :key="product.id">
            {{ product.product.title }} 數量:{{ product.qty }}
          </li>
        </ul>
        <ul v-if="orderData">
          <li>訂單人姓名{{ orderData.user.name }}</li>
          <li>信箱{{ orderData.user.email }}</li>
          <li>電話{{ orderData.user.tel }}</li>
          <li>備註{{ orderData.user.address }}</li>
        </ul>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap'
import pagination from '../../components/PaginationView.vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      isLoading: false,
      orders: [],
      delModal: '',
      delModalId: '',
      orderModal: '',
      orderModalId: '',
      orderData: '',
      pagination: {},
      page: ''
    }
  },
  components: {
    pagination,
    Loading
  },
  methods: {
    getOrders (page = 1) {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/orders/?page=${page}`)
        .then((res) => {
          this.isLoading = false
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err)
        })
    },
    opDelModal (id) {
      this.delModalId = id
      this.delModal.show()
    },
    deleteOrder () {
      const id = this.delModalId
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/order/${id}`)
        .then((res) => {
          Swal.fire(`${res.data.message}`)
          this.getOrders()
          this.delModal.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    opOrderModal (item) {
      this.orderModal.show()
      this.orderData = { ...item }
    },
    upDataPaid (item) {
      const paid = {
        is_paid: !item.is_paid
      }
      this.$http.put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/order/${item.id}`, { data: paid })
        .then((res) => {
          Swal.fire(`${res.data.message}`)
          this.getOrders()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changePage (page) {
      this.getOrders(page)
    },
    time (at) {
      const date = new Date(at * 1000)
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      return date.toLocaleString('zh-TW', options)
    }
  },
  mounted () {
    this.isLoading = true
    this.getOrders()
    this.delModal = new Modal(this.$refs.delModal)
    this.orderModal = new Modal(this.$refs.orderModal)
  }
}
</script>

<style scoped>
</style>
