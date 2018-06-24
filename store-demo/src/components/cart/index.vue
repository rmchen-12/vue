<template>
  <transition :name="slideName">
    <div class="page" v-show="showCart" ref="cart">
      <div class="cart">
        <div class="title flex flex-around">
          <span class="name">商品名称</span>
          <span class="price">单价</span>
          <span class="number">数量</span>
        </div>
        <div class="carts">
          <div class="good flex flex-around" v-for="item in goodCarts">
            <span class="good-name">{{item.GoodsName}}</span>
            <span class="good-price">￥{{item.GoodsPrice}}</span>
            <span class="cart-control">
            <v-cartControl :good="item"></v-cartControl>
            </span>
          </div>
        </div>
        <div class="check flex flex-around">
          <span class="text">需支付</span>
          <span class="total"><b class="icon">￥</b>{{totalPrice}}</span>
          <span class="clear" @click="pay"><p>去结算</p></span>
          <!--<transition name="fade">-->
            <!--<div class="success" v-show="success"><p>支付成功</p></div>-->
          <!--</transition>-->
        </div>
      </div>
      <div class="cover" @click.stop="closeCart"></div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CartControl from '../base/cartControl'

  export default {
    components: {
      'v-cartControl': CartControl
    },
    props: {
      totalPrice: Number
    },
    data() {
      return {
        showCart: false,
        success: false,
        slideName:'slideDown'
      }
    },
    watch: {
      totalPrice(curVal, oldVal) {
        if (curVal === 0) {
          this.showCart = false
        }
      }
    },
    computed: {
      ...mapGetters([
        'carts'
      ]),
      goodCarts() {
        let cartArr = []
        cartArr = this.carts
        return cartArr
      },
    },
    methods: {
      closeCart() {
        this.showCart = false
      },
      cartShow() {
        this.showCart = true
        this.success = false
      },
      pay() {
        // this.success = true
        // setTimeout(() => {
        //   this.closeCart()
        // }, 1200)
        this.$router.push('/order')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/variable';

  .page {
    .cart {
      z-index: 22;
      position: absolute;
      bottom: 0;
      width: 100%;
      background: white;
      .title {
        background: lightgray;
        padding: .1rem .1rem .2rem .1rem;
        font-size: .15rem;
        font-weight: 800;
        .name {
        }
        .price {
        }
        .number {
        }
      }
      .carts {
        margin-top: -.1rem;
        z-index: 11;
        background: lightgray;
        .good {
          padding: .02rem;
          .good-name {
            flex: 1;
            padding-left: .46rem;
          }
          .good-price {
            flex: 0 0 28%;
          }
          .cart-control {
            flex: 0 0 23%;
          }
        }
      }
      .check {
        height: .5rem;
        width: 100%;
        background: lightgray;
        line-height: .5rem;
        font-weight: 800;
        .text {
          flex: 1;
          padding-left: .49rem;
        }
        .total {
          flex: 0 0 19%;
          .icon {
            color: @base_background;
          }
        }
        .clear {
          flex: 0 0 23%;
          background: @base_background;
          color: whitesmoke;
          margin: .05rem .23rem .05rem .1rem;
          border-radius: 20px;
          text-align: center;
          p {
            margin-top: -.05rem;
          }
        }
        .success {
          position: fixed;
          top: 2rem;
          width: 100%;
          text-align: center;
          background: @base_background;
          border-radius: 20px;
          color: whitesmoke;
          font-weight: 700;
        }
      }
    }
    .cover {
      position: fixed;
      top: 0;
      bottom: .5rem;
      width: 100%;
      background: rgba(55, 55, 55, .7);
      z-index: 11;
    }
  }


</style>
