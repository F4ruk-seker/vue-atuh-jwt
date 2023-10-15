<template>
<!--  listeye özel filitreleme patternleri veya | liste ürünlerinin ayrıty edici patternleri -->
<!--  db dizyanında dikkat edilecek-->
  <div class="container">
    <strong>Kategoriler</strong>
    <input id="text" type="checkbox" >
    <label for="text">Dolar</label>
    <strong>Marka</strong>
    <strong>Fiyat</strong>
  </div>

  <div class="d-sm-block d-md-none">argos</div>
  <div class="d-md-block">sAD</div>
</template>

<script>
export default {
  name: "ListView"
}
</script>

<style scoped>
</style>