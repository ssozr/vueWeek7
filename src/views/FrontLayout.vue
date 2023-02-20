<template>
    <h1>這是前台</h1>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/products">產品列表</router-link> |
    <router-link to="/cart">購物車列表</router-link>|
    <router-link to="/login">登入</router-link>
    <hr>
    <RouterView></RouterView>
</template>
<script>
import { RouterView } from 'vue-router'
export default {
  components: {
    RouterView
  }
}
</script>

<style scoped>
</style>
