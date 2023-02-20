<template>
    <div id="app">
      <div class="container">
        {{ user }}
        <div class="row justify-content-center">
          <h1 class="h3 mb-3 font-weight-normal">
            請先登入
          </h1>
          <div class="col-8">
            <form id="form" class="form-signin">
              <div class="form-floating mb-3">
                <input v-model="user.email" type="email" class="form-control" id="emailInput"
                  placeholder="name@example.com" required autofocus>
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input v-model="user.passWord" type="password"  class="form-control" id="pwInput"
                  placeholder="Password" required>
                <label for="password">Password</label>
              </div>
              <button @click="login()" class="btn btn-lg btn-primary w-100 mt-3" type="submit" id="loginBtn">
                登入
              </button>
            </form>
          </div>
        </div>
        <p class="mt-5 mb-3 text-muted">
          &copy; 2021~∞ - 六角學院
        </p>
      </div>
    </div>
</template>
<script>

const { VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {
      user: {
        email: '',
        passWord: ''
      }
    }
  },
  methods: {
    login () {
      const user = {
        username: this.user.email,
        password: this.user.passWord
      }
      this.$http.post(`${VITE_APP_URL}/v2/admin/signin`, user)
        .then((res) => {
          console.log(res)
          const { token, expired } = res.data
          document.cookie = `ssozrToken=${token}; expires=${new Date(expired)}`
          this.$router.push('/user')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
</style>
