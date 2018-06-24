<template>
  <div class="flex page">
    <v-header :seller="seller"></v-header>
    <div class="tab flex-around flex-align-center">
      <div>
        <router-link to="/goods"  class="tab-item">商品</router-link>
      </div>
      <div>
        <router-link to="/ratings"  class="tab-item">评论</router-link>
      </div>
      <div>
        <router-link to="/seller"  class="tab-item">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import '../static/js/rem'
  import Headers from './components/base/headers'
  import axios from 'axios'
  export default {
    components:{
      'v-header':Headers
    },
    data(){
      return{
        seller:{}
      }
    },
    name: 'App',
    mounted(){
      const that = this
      axios.get('../static/data.json').then((res)=>{
        that.seller = res.data.seller
      })
        .catch(function (error) {
          console.log(error)
        })
      this.$router.push('./goods')
    }
  }
</script>

<style lang="less">
  @import "../static/less/reset.less";
  @import "../static/less/base.less";
  .tab{
    width: 100%;

    font-size: .28rem;
    height: .8rem;
    border-bottom: 1px solid @base_background;
  }
  .tab-item{
    color: @base_color;
    text-decoration: none;
  }
  .active{
    color: red;
  }

</style>
