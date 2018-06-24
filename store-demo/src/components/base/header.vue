<template>
  <div class="header">
    <slot></slot>
    <p class="title">{{tabname}}</p>
    <div @click="showCart" v-show="cartShow">
      <i class="fa fa-cart-plus icon" aria-hidden="true"></i>
      <transition name="show">
        <div class="total-price" v-show="totalPrice > 0">
          <p>￥{{totalPrice}}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    props: {
      tabname: String,
      totalPrice: Number,
      cartShow:{
        type:Boolean,
        default:true
      }
    },
    methods: {
      showCart(){

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variable";

  .header {
    background: rgba(96, 96, 96, .5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: .4rem;
    text-align: center;
    line-height: .4rem;
    z-index: 999;
    ._icon {
      position: absolute;
      color: whitesmoke;
      top: .05rem;
      left: .12rem;
    }
    .title {
      display: inline-block;
      font-size: .2rem;
      z-index: 99;
      color: whitesmoke;
      font-weight: 900;
    }
    .icon {
      font-size: .2rem;
      position: fixed;
      top: .1rem;
      right: .2rem;
      z-index: 99;
      color: white;
    }
    .total-price {
      position: absolute;
      right: .4rem;
      top: 0.1rem;
      border-radius: 10px;
      background: @base_background;
      color: whitesmoke;
      height: .2rem;
      padding: 0 .1rem;
      p {
        text-align: center;
        font-weight: 500;
        font-size: .15rem;
        line-height: .2rem;
      }
    }
  }

  .show-enter, .show-leave-to {
    opacity: 0;
  }

  .show-enter-active, .show-leave-active {
    transition: all .3s linear;
  }
</style>
