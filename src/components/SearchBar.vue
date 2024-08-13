<template>
  <div class="">
    <h1>Compr.AR</h1>
    <form id="search-bar" @submit.prevent="formSubmit">
      <input type="text" placeholder="7799155000173, 7799145459123...">
      <button>Search</button>
      <button type="button" @click="toggleScanner">📷</button>
    </form>
    <h2>Results</h2>
    <ul>
      <li v-for="(product, i) in productList" :key="i">
        {{ product.nombre }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

const API_URL = import.meta.env.VITE_APP_API_URL

export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss">
#search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 600px;

  input {
    flex: 1 1 auto;
    min-width: 200px;
  }

  button {
    flex: 1 1 75px;
  }

  &::after {
    content: "";
    flex-basis: 100%;
    height: 0;
  }
}
</style>
