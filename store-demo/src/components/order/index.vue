<template>
  <div>
    <div class="header">
      <i class="fa fa-angle-left fa-2x icon" aria-hidden="true" @click="pre"></i>
      <span class="title">订单</span>
    </div>
    <div class="address">
      <div class="selectAddress">
        <span class="text">订单配送至</span>
        <span class="wrapper" @click="selectAddress">
          <p class="content" :class="{active:isActive}" v-if="!address">选择收货地址</p>
          <p class="content" v-if="address">{{address}}</p>
        </span>
      </div>
    </div>
    <div class="tip" v-if="showTip"><p>已完成订单</p></div>
    <div class="cart" ref="cart">
      <div>
      <div class="good flex flex-align-center" v-for="good in goodCarts">
        <img :src="good.GoodsImage" class="img"/>
        <span class="name">{{good.GoodsName}}</span>
        <span class="count">数量：{{good.count}}</span>
        <span class="price">单价：{{good.GoodsPrice}}</span>
      </div>
      </div>
    </div>
    <div class="foot">
      <span class="totalPrice"><p>总价:￥{{totalPrice}}</p></span>
      <span class="payOrder" @click="pay"><p>确认支付</p></span>
    </div>
    <transition :name="aname">
      <div class="paySuccess" v-show="success">
        <p>支付成功，可至已完成订单查看</p>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        Address: '',
        totalPrice: 0,
        success: false,
        isActive:false,
        aname:'fade',
        showTip:false
      }
    },
    created() {
      this.cartsArr = this.carts
      this.carts.forEach((item) => {
        this.totalPrice += item.GoodsPrice*item.count
      })
      this.$root.eventHub.$on('changePrice', total => {
        this.totalPrice = total
      })
      this.Address = this.address
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    computed: {
      ...mapGetters([
        'carts',
        'address',
        'orders'
      ]),
      goodCarts() {
        let cartArr = []
        cartArr = this.carts
        return cartArr
      },
    },
    methods: {
      ...mapMutations({
        addOrders:'ADD_ORDERS',
        resetCarts:'RESET_CARTS'
      }),
      _initScroll(){
        const initScroll = new BScroll(this.$refs.cart,{
          click:true
        })
      },
      selectAddress() {
        this.$router.push('/address')
      },
      pre() {
        this.$router.push('/home')
      },
      hide(){
        this.success = false
      },
      pay() {
        if(this.totalPrice > 0){
          if(this.address){
            this.success = true
            setTimeout(() => {
              this.hide()
              this.addOrders(this.carts)
              // this.resetCarts()

            },1000)
          } else {
            this.isActive = true
          }
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/variable';

  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    background: rgba(59, 59, 59, .5);
    text-align: center;
    z-index: 11;
    .icon {
      position: absolute;
      color: whitesmoke;
      top: .05rem;
      left: .12rem;
    }
    .title {
      font-size: .2rem;
      z-index: 99;
      color: whitesmoke;
      font-weight: 900;
    }
  }

  .address {
    position: fixed;
    width: 100%;
    text-align: center;
    margin-top: .6rem;
    z-index: 11;
    .selectAddress {
      .text {
      }
      .wrapper {
        .content {
          width: 100%;
          background: rgba(59, 59, 59, .5);
          font-size: .25rem;
          height: .4rem;
          border-radius: 15px;
          line-height: .4rem;
          color: whitesmoke;
        }
        .active{
          background: @base_background;
        }
      }
    }
  }

  .cart {
    position: absolute;
    top:1.5rem;
    bottom: .5rem;
    overflow: hidden;
    width: 100%;
    .good {
      height: 1rem;
      text-align: center;
      font-size: .24rem;
      img {
        height: 1rem;
        width: 1rem;
      }
      .name {
        flex: 0 0 23%;
      }
      .count {
        flex: 0 0 23%;
      }
      .price {
        flex: 0 0 23%;
      }
    }
  }

  .foot {
    position: fixed;
    bottom: 0;
    height: .5rem;
    background: rgba(59, 59, 59, .5);
    line-height: .5rem;
    width: 100%;
    display: flex;
    .totalPrice {
      flex: 1;
      p {
        color: whitesmoke;
        font-size: .24rem;
        margin-left: .2rem;
      }
    }
    .payOrder {
      background: @base_background;
      flex: 0 0 30%;
      text-align: center;
      color: whitesmoke;
      font-size: .3rem;
      font-weight: 800;
    }
  }

  .paySuccess {
    position: fixed;
    top: 0;
    bottom: .5rem;
    width: 100%;
    p {
      position: fixed;
      font-size: .2rem;
      top: 2rem;
      line-height: .4rem;
      width: 100%;
      height: .4rem;
      text-align: center;
      background: rgb(255,69,0);
      border-radius: 20px;
      color: whitesmoke;
      font-weight: 700;
    }
  }

</style>
