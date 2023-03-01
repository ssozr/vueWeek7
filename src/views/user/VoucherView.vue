<template>
  <div class="text-end my-4">
    <button type="button" class="btn btn-primary" @click="openCouponMadl()">建立優惠券</button>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
        <tbody>
        <tr v-for="(item, i) in coupons.coupons" :key="i">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}</td>
        <td>{{ time(item.due_date) }}</td>
        <td>
            <p v-if="item.is_enabled">已啟用</p>
            <p v-else>未啟用</p>
        </td>
        <button type="button" class="btn btn-outline-primary" @click="openEdit(item)">編輯</button>
        <button type="button" class="btn btn-outline-danger" @click="openDelCoupon(item)">刪除</button>
        </tr>
    </tbody>
  </table>
  <pagination
    :pages="pagination"
    @change-page="changePage"
  ></pagination>

  <!-- 新增優惠券modal -->
  <div class="modal" tabindex="-1" ref="couponModal" id="couponModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">建立優惠券</h5>
        {{  couponData.due_date }}
        <button type="button" class="btn-cslose" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
            {{ couponData }}
            <label for="title" class="form-label">優惠券名稱</label>
            <input type="text" class="form-control" id="title" v-model="couponData.title">
        </div>
        <div class="mb-3">
            <label for="coupon_code" class="form-label">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code" v-model="couponData.code">
        </div>
        <div class="mb-3">
            <label for="due_date" class="form-label">到期日</label>
            <p v-if="!modal" class="py-0 my-0">目前到期日{{ time(editDate) }}</p><br>
            <input type="date" class="form-control" id="due_date" v-model="couponData.due_date">
        </div>
        <div class="mb-3">
            <label for="percent" class="form-label">折扣百分比</label>
            <input type="number" class="form-control" id="percent" v-model="couponData.percent">
        </div>
        <div class="mb-3">
            <div class="form-check">
                <label for="is_enabled" class="form-label">是否啟用</label>
                <input type="checkbox" class="form-check-input" :true-value="1" :false-value="0" id="is_enabled" v-model="couponData.is_enabled">
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="newCoupon()">確定編輯</button>
      </div>
    </div>
  </div>
  </div>
  <!-- 刪除優惠券modal刪除優惠券modal -->
  <div class="modal" tabindex="-1" ref="delCouponModal">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">{{ couponData.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>是否確認刪除此優惠券?</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="delCoupon()">確認刪除</button>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import pagination from '../../components/PaginationView.vue'
import { Modal } from 'bootstrap'
const { VITE_APP_PATH, VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {
      modal: true,
      coupons: '',
      couponModal: '',
      delCouponModal: '',
      editDate: '',
      editId: '',
      delId: '',
      pagination: {},
      couponData: {
        title: '',
        code: '',
        due_date: '',
        percent: '',
        is_enabled: 0
      }
    }
  },
  methods: {
    getCoupons (page = 1) {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/coupons?page=${page}`)
        .then((res) => {
          console.log(res)
          this.coupons = res.data
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openCouponMadl () {
      this.modal = true
      this.couponData = {}
      this.couponModal.show()
    },
    openEdit (item) {
      this.couponData = {}
      this.modal = false
      this.couponData = { ...item }
      this.editId = item.id
      this.editDate = this.couponData.due_date
      this.couponData.due_date = this.couponData.due_date * 1000
      this.couponModal.show()
    },
    newCoupon () {
      if (this.modal === false) {
        this.timeChange()
        const data = { ...this.couponData }
        this.$http.put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/coupon/${this.editId}`, { data })
          .then((res) => {
            console.log(res)
            this.getCoupons()
            alert('更新完成')
            this.couponModal.hide()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.timeChange()
        const data = { ...this.couponData }
        this.$http.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/coupon`, { data })
          .then((res) => {
            alert(res.data.message)
            this.getCoupons()
            this.couponModal.hide()
          })
          .catch((err) => {
            alert(err.data.message)
          })
      }
    },
    timeChange () {
      const date = new Date(this.couponData.due_date)
      date.setHours(0, 0, 0, 0)
      const timestamp = date.getTime() / 1000
      this.couponData.due_date = timestamp
    },
    time (at) {
      const date = new Date(at * 1000)
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      return date.toLocaleString('zh-TW', options)
    },
    openDelCoupon (item) {
      this.couponData = { ...item }
      this.delCouponModal.show()
      this.delId = item.id
      console.log(this.delId)
    },
    delCoupon () {
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/coupon/${this.delId}`)
        .then((res) => {
          console.log(res)
          alert('已刪除優惠券')
          this.getCoupons()
          this.delCouponModal.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changePage (page) {
      this.getCoupons(page)
    }
  },
  components: {
    pagination
  },
  mounted () {
    this.getCoupons()
    this.couponModal = new Modal(this.$refs.couponModal)
    this.delCouponModal = new Modal(this.$refs.delCouponModal)
  }
}

</script>
