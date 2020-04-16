<template>
  <div id="app">
    <Carousel :itemList="itemList" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Carousel from './components/Carousel.vue'

// Lorem Picsumでサンプル表示用の画像urlを10枚用意
// https://picsum.photos/
const itemList = [...new Array(10)].map(
  (_, i) => `https://picsum.photos/id/${i + 20}/640/360.jpg`
)
export default Vue.extend({
  name: 'App',
  components: {
    Carousel,
  },
  data() {
    return {
      itemList,
    }
  },
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
