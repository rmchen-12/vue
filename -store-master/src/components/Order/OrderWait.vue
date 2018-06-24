<template>
  <div class="page">
    <header-sec tabname="订单详情"></header-sec>
    <transition :name="slidename">
      <div class="container" v-show="mainarea">
        <div v-show="!havepage">
          <nopage></nopage>
        </div>
        <div v-show="havepage">
          <div class="chooseAddress" @click="onAddress()">
            <div class="flex-align-center chooseBox">
              <img src="../../../static/img/icon/item_address.png"/>
              <div class="flex-align-center flex-between">
                <p v-show="!this.$store.state.chooseaddress">选择送货地址</p>
                <p v-show="this.$store.state.chooseaddress">{{this.$store.state.chooseaddress}}</p>
                <img src="../../../static/img/icon/arrowBack.png" alt=""/>
              </div>
            </div>
          </div>
          <div class="orderItem flex" v-for="orderItem in $store.state.orders">
            <img :src="orderItem.GoodsImage" class="goodsImg"/>
            <div>
              <p class="goods-name">{{orderItem.GoodsName}}</p>
              <p class="goods-num">x{{orderItem.GoodsNum}}</p>
              <p class="goods-price">￥{{orderItem.GoodsPrice}}</p>
            </div>
          </div>
          <div class="orderBottom flex-between">
            <span>总金额：{{allCoach}}</span>
            <span @click="onOrder">结算</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import HeaderSec from "../base/HeaderSec";
  import Nopage from '../base/NoPage'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    components: {
      HeaderSec,
      Nopage
    },
    data() {
      return {
        allCoach: 0,
        havepage: false,
        mainarea: false,
        slidename: 'slide-go'
      }
    },
    mounted() {
      this.mainarea = true;
      let sums = [];
      const that = this;
      if (this.$store.state.orders === undefined) {
        this.havepage = false
      } else {
        this.havepage = true;
        this.$store.state.orders.forEach((item) => {
          sums.push(item.GoodsPrice)
        });
        for (let i = 0; i < sums.length; i++) {
          that.allCoach += parseInt(sums[i])
        }
      }
      if (this.$store.state.comname === 'goodsdetail' || this.$store.state.comname === 'cart') {
        this.slidename = 'slide-go'
      } else {
        this.slidename = 'slide-back'
      }
      this.setComname('orderwait')
    },
    computed: {
      ...mapGetters([
        'comname',
        'orders',

      ])
    },
    methods: {
      ...mapMutations({
        setComname: 'SET_COMNAME',
        setIschoose:'SET_ISCHOOSE',
        setPays:'SET_PAYS'
      }),
      onAddress(){
        this.setIschoose(1);
        this.$router.push('./address')
      },
      onOrder(){
        this.$router.push('./order')
        this.setPays(this.$store.state.orders)
      }
    }
  }

</script>

<style lang="less" scoped>
  @import '../../../static/less/variable';
  .chooseBox{
    margin-top: .2rem;
    margin-bottom: .2rem;
    height: 1rem;
    padding: 0 .2rem;
    font-size: .28rem;
    border: 1px dashed @theme_background;
    img{
      width: .4rem;
      height: .4rem;
      margin-right: .2rem;
    }
    div{
      width: 100%;
    }
    p{
      text-align: center;
    }
  }
  .orderItem{
    padding: .2rem;
    border-bottom: 1px solid #cccccc;
  }
  .goodsImg{
    width: 2rem;
    height: 2rem;
  }
  .orderBottom{
    position: fixed;
    bottom: 0;
    height: .8rem;
    background: @theme_background;
    color: @base_color;
    font-size: .28rem;
    width: 100%;
    line-height: .8rem;
    padding: 0 .2rem;
    box-sizing: border-box;
  }
</style>



