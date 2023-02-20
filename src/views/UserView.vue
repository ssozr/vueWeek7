<template>
  <h1>這是後台</h1>
  <p>點選要進行的業務</p>
  <router-link to="/userorders">訂單管理</router-link> |
  <router-link to="/userprodeuts">產品管理</router-link> |
  <router-link to="/voucher">優惠券管理</router-link> |
  <hr>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'
const { VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {

    }
  },
  methods: {
    checkLogin () {
      this.$http.post(`${VITE_APP_URL}v2/api/user/check`)
        .then(() => {
        })
        .catch(() => {
          alert('請重新登入')
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)ssozrToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    this.checkLogin()
  },
  components: {
    RouterView
  }
}
</script>

<style scoped>
</style>
