<template>
  <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click=" openModal()">
            建立新的文章
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th>文章名稱</th>
              <th>
                日期
              </th>
              <th>
                作者
              </th>
              <th>
                是否啟用
              </th>
              <th>
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in ariticleData.articles" :key="i">
              <td>{{ item.title }}</td>
              <td>{{ time(item.create_at) }}</td>
              <td>{{ item.author }}</td>
              <td>
                <span class="text-success" v-if="item.isPublic">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" @click="openEditModla(item)">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="delArticle(item.id)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div id="productModal" ref="articleModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
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
                {{ data }}
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-2">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">輸入圖片網址</label>
                      <input type="text" class="form-control"
                             placeholder="請輸入圖片連結" v-model="data.image">
                    </div>
                    <img class="img-fluid" src="" alt="">
                  </div>
                  <div>
                    <button class="btn btn-outline-primary btn-sm d-block w-100">
                      新增圖片
                    </button>
                  </div>
            <!--       <div v-else>
                    <button class="btn btn-outline-danger btn-sm d-block w-100">
                      刪除圖片
                    </button>
                  </div> -->
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="data.title">
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">作者</label>
                      <input id="category" type="text" class="form-control" v-model="data.author"
                             placeholder="請輸入作者">
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">標籤</label>
                      <input id="origin_price" type="text" min="0" class="form-control" placeholder="請輸入標籤" v-model="data.tag">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="date" class="form-label" v-if="!date">日期</label>
                      <label for="date" v-else>發布日期:{{  time(date) }}</label>
                      <input id="date" type="date" min="0" class="form-control" v-model="data.create_at"
                             placeholder="請輸入日期">
                    </div>
                  </div>
                  <hr>

                  <div class="mb-3">
                    <label for="description" class="form-label">文章描述</label>
                    <textarea id="description" type="text" class="form-control" v-model="data.description"
                              placeholder="請輸入產品描述">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">這是內容</label>
                    <textarea id="description" type="text" class="form-control" v-model="data.content"
                              placeholder="請輸入說明內容">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input"  id="is_enabled" v-model="data.isPublic">
                      <label class="form-check-label" for="is_enabled" >是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="newArticle()">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { Modal } from 'bootstrap'
const { VITE_APP_PATH, VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      date: '',
      modal: true,
      ariticleData: {},
      articleModal: '',
      dataId: '',
      data: {
        title: '',
        description: '',
        image: '',
        tag: '',
        create_at: '',
        author: '',
        isPublic: false,
        content: ''
      }
    }
  },
  methods: {
    getAriticle () {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/articles`)
        .then((res) => {
          console.log(res)
          this.ariticleData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openEditModla (item) {
      this.modal = false
      this.date = item.create_at
      this.articleModal.show()
      this.data = { ...item }
      this.data.create_at = this.time(item.create_at)
      this.dataId = item.id
      console.log(this.data)
    },
    openModal () {
      this.modal = true
      this.articleModal.show()
    },
    newArticle () {
      if (this.modal === true) {
        this.timeChange()
        const data = { ...this.data }
        this.$http.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/article`, { data })
          .then((res) => {
            console.log(res)
            this.data = {}
            this.getAriticle()
            this.articleModal.hide()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.timeChange()
        const data = { ...this.data }
        this.$http.put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/article/${this.dataId}`, { data })
          .then((res) => {
            console.log('修改', res)
            this.data = {}
            this.getAriticle()
            this.articleModal.hide()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    timeChange () {
      const date = new Date(this.data.create_at)
      date.setHours(0, 0, 0, 0)
      const timestamp = date.getTime() / 1000
      this.data.create_at = timestamp
    },
    time (at) {
      const date = new Date(at * 1000)
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      return date.toLocaleString('zh-TW', options)
    },
    delArticle (id) {
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/article/${id}`)
        .then((res) => {
          console.log(res)
          this.getAriticle()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getAriticle()
    this.articleModal = new Modal(this.$refs.articleModal)
  }
}
</script>
