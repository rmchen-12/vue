<template>
  <div>
    <transition :name="slideName">
      <div class="detail" v-if="showDetail">
        <div class="img">
          <img :src="good.GoodsImage"/>
        </div>
        <div class="info">
          <p class="name">{{good.GoodsName}}</p>
          <p class="price"><b class="icon">￥</b>{{good.GoodsPrice}}</p>
          <v-cartControl :good="good" class="cart-control"></v-cartControl>
        </div>
        <div class="division"></div>
        <div class="introduce">
          <p class="title">简介</p>
          <p class="text">{{good.GoodsInfo}}</p>
          <p class="text" v-if="!good.GoodsInfo">暂无信息</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import CartControl from '../base/cartControl'

  export default {
    components: {
      'v-cartControl': CartControl
    },
    props: {
      good: Object
    },
    data() {
      return {
        showDetail: false,
        slideName:'slideLeft'
      }
    },
    methods: {
      showToggle() {
        this.showDetail = !this.showDetail
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/variable';

  .detail {
    position: absolute;
    width: 100%;
    top:.4rem;
    text-align: center;
    .img {
      width:100% ;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
    .info {
      padding-top: .1rem;
      position: relative;
      background: lightgray;
      height: .5rem;
      border-radius: 20px;
      .name {
        display: inline-block;
        font-size: .25rem;
        font-weight: 600;
      }
      .price {
        display: inline-block;
        .icon {
          color: @base_background;
          font-weight: 500;
          font-size: .2rem;
        }
      }
      .cart-control {
        position: absolute;
        right: .16rem;
        top: .2rem;
        overflow: hidden;
        height: .2rem;
      }
    }
    .introduce {
      border-radius: 20px;
      background: lightgray;
      margin-top: .2rem;
      height: 1rem;
      .title{
        font-size: .2rem;
        font-weight: 800;
        padding: .05rem 0;
      }
      .text{
        padding: 0 .2rem;
      }
    }
  }
</style>
