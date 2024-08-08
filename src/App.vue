<template>
  <SearchBar/>
  <h2>Pruebas</h2>
  <section>
    <h3>Buscar producto por nombre - pendiente</h3>
  </section>
  <section>
    <h3>Buscar producto por codigo de barras - pendiente</h3>
  </section>
  <section>
    <h3>Leer codigo de barras - pendiente</h3>
  </section>
  <section>
    <h3>Listar productos de manera local - pendiente</h3>
  </section>
  <section>
    <h3>Agregar productos de manera local - pendiente</h3>
  </section>
  <section>
    <h3>Eliminar productos de manera local - pendiente</h3>
  </section>
  <section>
    <h3>Buscar productos de manera local - pendiente</h3>
  </section>
  <section>
    <h3>Agregar productos manualmente - pendiente</h3>
  </section>
  <section>
    <h3>Script buscar mejor precio - pendiente</h3>
  </section>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import searchService from './services/searchService'

export default {
  name: 'App',
  components: {
    SearchBar
  },
  setup () {
    searchService.getProductByName('tomate')
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  padding: 1em;
}
</style>
