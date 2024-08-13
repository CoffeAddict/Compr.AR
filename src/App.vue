<template>
  <h2>Pruebas</h2>
  <section>
    <h3>Buscar producto por nombre - Service Ready</h3>
  </section>
  <section>
    <h3>Buscar producto por codigo de barras - Service Ready</h3>
  </section>
  <section>
    <h3>Leer codigo de barras - Component Ready, needs optimization and error handling</h3>
    <BarcodeButton/>
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
import BarcodeButton from './components/BarcodeButton.vue'
import DBService from './services/dbService'

export default {
  name: 'App',
  components: {
    SearchBar,
    BarcodeButton
  },
  async mounted () {
    DBService.addProduct({id: 1, name: 'Celusal'})
    DBService.addProduct({id: 2, name: 'Celusal'})
    DBService.addProduct({id: 3, name: 'Celusal'})
    // DBService.deleteProduct(1)
    DBService.getAll()
    .then(resp => console.log(resp))
    .catch(error => console.error(error))
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
