<template>
    <table class="table">
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td><img :src="product.imageUrl" width="200" alt=""></td>
                <td>{{ product.title }}</td>
                <td>{{ product.price }}</td>
                <td>
                    <RouterLink :to= "`/product/${product.id}`">詳細資訊</RouterLink>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { RouterLink } from 'vue-router'
const { VITE_APP_PATH, VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {
      products: []
    }
  },
  components: {
    RouterLink
  },
  methods: {
    getProducts () {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          console.log(res)
          this.products = res.data.products
          console.log('產品列表', this.products)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
