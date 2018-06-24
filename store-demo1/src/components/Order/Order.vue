<template>
  <div class="page orderpage">
    <v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()">
      <header-sec tabname="我的订单" ref="noback"></header-sec>
      <ordertab :urlRouter="$route.path"></ordertab>
      <transition :name="slidename">
        <div class="container" v-show="mainarea">
          <div v-show="!havepage">
            <nopage></nopage>
          </div>
          <div class="order-item" v-show="havepage" v-cloak>
            <div v-for="itemPay in $store.state.pays">
              <div class="order-top flex-between">
                <p>订单号xxxx</p>
                <p>已支付</p>
              </div>
              <div class="order-content">
                <div class="flex">
                  <div class="order-img">
                    <img :src="itemPay.GoodsImage"/>
                  </div>
                  <div class="order-text">
                    <p class="goods-name text-ellipsis">{{itemPay.GoodsName}}</p>
                    <P class="goods-num">x{{itemPay.GoodsNum}}</P>
                    <p class="goods-price">￥{{itemPay.GoodsPrice}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </v-touch>
  </div>
</template>

<script>
  import HeaderSec from "../base/HeaderSec";
  import Ordertab from '../base/OrderTab'
  import Nopage from '../base/NoPage'
  import {mapGetters,mapMutations} from 'vuex'

  export default {
    components: {
      HeaderSec,
      Ordertab,
      Nopage
    },
    data(){
      return{
        mainarea:false,
        havepage:false,
        slidename:'slide-go'
      }
    },
    computed:{
      ...mapGetters([
        'pays',
        'ordercur',
        'ordertab'
      ])
    },
    mounted(){
      this.mainarea = true;
      this.setOrdercur(1);
      if(this.$store.state.pays === undefined){
        this.havepage = false
      }else{
        this.havepage = true
      }
      this.$refs.noback.isBack = false;
      if(this.$store.state.ordercur<this.$store.state.ordertab){
        this.slidename = 'slide-back'
      }else{
        this.slidename = 'slide-go'
      }
      this.setOrdertab(1);
    },
    methods:{
      ...mapMutations({
        setOrdercur:'SET_ORDERCUR',
        setOrdertab:'SET_ORDERTAB'
      }),
      onSwipeLeft(){
        this.$router.push('./waitpay')
      },
      onSwipeRigth(){
        this.$router.push('./orderdown')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/less/variable";
  .container{
    padding-top: 1.6rem;
  }
  .order-item{
    padding-bottom: .2rem;
    border-bottom: 1px solid #ccc;
    margin-bottom: .2rem;
  }
  .order-top{
    height: .8rem;
    font-size: .28rem;
    line-height: .8rem;
    padding: 0 .2rem;
    border-bottom: 1px solid #cccccc;
  }
  .order-content{
    padding-top: .2rem;
  }

</style>
