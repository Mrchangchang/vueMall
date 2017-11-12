<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods" tag="a">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings" tag="a">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller" tag="a">商家</router-link></div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  const ERR_OK = 0;
export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  components: {
    "v-header": header
  },
  created (){
    this.$http.get("api/seller").then((response) =>{
      response = response.data
      if (response.errorNumber == ERR_OK) {
        this.seller = response.data
        console.log(response)
      }
    });
  }

}
</script>

<style>

.tab{
  display: flex;
  width: 100%;
  line-height: 40px;
  position: relative;
}
.tab:after{
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  width: 100%;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
  .tab:after,.tab:before{
    transform: scaleY(0.7);
    -webkit-transform: scaleY(0.7);
  }
}
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
  .tab:after,.tab:before{
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }
}
.tab .tab-item{
  flex: 1;
  text-align: center}
.tab-item>a{
  display: block;
  font-size: 14px;
  color: rgb(77,85,93);
}
.tab-item>.active{
  color: rgb(240,20,20);
}
</style>
