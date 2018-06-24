<template>
  <div>
  <div class="shopCart">
    <div class="content">
      <div class="content-left" @click="list">
        <div class="logo-wrapper">
          <div class="badge" v-show="totalCount">
            {{totalCount}}
          </div>
          <div class="logo" :class="{'active-a':totalCount}">
            <i class="fa fa-shopping-cart fa-2x"></i>
          </div>
        </div>
        <div class="price" :class="{'active-b':totalPrice}">
          ￥{{totalPrice}}
        </div>
        <div class="desc">另需要配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'enough':totalPrice>=minPrice}">
        {{payDesc}}
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-for="(ball,index) in balls" :key="ball.id">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="flide-up">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="setEmpty">清空</span>
        </div>
        <div class="list-content" ref="foodlist">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="fade-backdrop">
    <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
  </transition>
  </div>
</template>

<script>
  import CartControl from "./cartControl";
  import BScroll from 'better-scroll'

  export default {
    components: {CartControl},
    name: "shop-cart",
    props:{
      selectFoods:{
        type:Array,
        default:[]
      },
      deliveryPrice:{
        type:Number,
        default:0
      },
      minPrice:{
        type:Number,
        default:0
      }
    },
    data(){
      return{
        balls:[{
          show:false
        },{
          show:false
        },{
          show:false
        },{
          show:false
        },{
          show:false
        }],
        dropBalls:[],
        listShow:false,
      }
    },
    created() {
      this.$root.eventHub.$on('cart.add', this.drop)
    },
    computed:{
      showBackdrop(){
        if (this.listShow && this.totalPrice) {
          return true
        }
        this.listShow = false
        return false
      },

      payDesc(){
        if(this.totalPrice < this.minPrice){
          return '还差￥' + (this.minPrice-this.totalPrice-0) + '元'
        }
        if(this.totalPrice >= this.minPrice){
          return '去结算'
        }
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food)=>{
            count += food.count
        });
        return count
      },
      totalPrice(){
        let totalPrice = 0;
        this.selectFoods.forEach((food)=>{
          totalPrice += food.price*food.count
        })
        return totalPrice
      },
    },
    methods:{
      _initScroll(){
        this.foodlistScroll = new BScroll(this.$refs.foodlist,{
          click:true
        })
      },
      drop(el) {
        for (let i = 0, l = this.balls.length; i < l; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = 'translate3d(0,(y-0)px,0)'
            el.style.transform = 'translate3d(0,(y-0)px,0)'
            let inner = el.querySelector('.inner-hook')
            inner.style.webkitTransform = 'translate3d((x-0)px,0,0)'
            inner.style.transform = 'translate3d((x-0)px,0,0)'
          }
        }
      },
      enter(el) {
        el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      hideBackdrop(){
        this.listShow = !this.listShow
        this.showBackdrop = !this.showBackdrop
      },
      list(){
        if(!this.selectFoods.length){
          return
        }
        this.listShow = !this.listShow
        this.showBackdrop = !this.showBackdrop
        if(this.listShow){
          this.$nextTick(()=>{
            if(!this.foodlistScroll){
              this._initScroll()
            }else{
              this.foodlistScroll.refresh()
            }
          })
        }
      },
      setEmpty(){
        this.selectFoods.forEach((food)=>{
          food.count = 0
          this.listShow = false
          this.showBackdrop = false
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .shopCart {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1rem;
    z-index: 99;
    .content {
      z-index: 9999;
      display: flex;
      .content-left {
        flex: 1;
        background: #141d27;
        height: 1rem;
        color: #72777d;
        font-weight: 800;
        font-size: 110%;
        .logo-wrapper {
          z-index: 99;
          position: relative;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background: #141d27;
          top: -0.2rem;
          padding: .1rem;
          margin: 0 .4rem;
          border-radius: 50%;
          .badge {
            position: absolute;
            right: 0;
            top: 0;
            width: .4rem;
            height: .3rem;
            background: #f01414;
            border-radius: 30%;
            color: white;
            text-align: center;
            font-size: 80%;
          }
          .logo {
            background: #2b343c;
            width: .9rem;
            height: .9rem;
            border-radius: 50%;
            margin-left: .05rem;
            text-align: center;
            line-height: .9rem;
          }
          .active-a {
            background: #007aff;
            i {
              color: white;
            }
          }
        }
        .price {
          display: inline-block;
          font-size: .35rem;
          margin-left: -.2rem;
          border-right: 1px solid #72777d;
          padding-right: .2rem;
        }
        .active-b {
          color: white;
        }
        .desc {
          display: inline-block;
          font-size: .25rem;
          font-weight: 800;
          vertical-align: top;
          padding: .3rem 0 0 .2rem;
        }

      }
      .content-right {
        flex: 0 0 1.9rem;
        background: #2b343c;
        height: 1rem;
        width: 24%;
        text-align: center;
        line-height: 1rem;
        color: #72777d;
        font-size: .28rem;
      }
      .enough {
        background: green;
        color: white;
      }
    }
    .shopcart-list{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 1rem;
      .list-header{
        width: 100%;
        height: .9rem;
        background: #f3f5f7;
        .title{
          display: inline-block;
          font-size: .3rem;
          color: gray;
          margin: .25rem 0 0 .4rem;
        }
        .empty{
          color: rgb(0,160,220);
          font-size: 110%;
          font-weight: 800;
          position: absolute;
          right: .4rem;
          top: .25rem;
        }
      }
      .list-content{
        max-height: 6rem;
        overflow: hidden;
        background: white;
        .food{
          display: flex;
          height: 1rem;
          line-height: 1rem;
          margin: 0 .3rem 0 .4rem;
          border-bottom: 1px solid lightgray;
          .name{
            flex: 1;
            font-size: 120%;
          }
          .cartcontrol-wrapper{
            margin-right: .2rem;
          }
          .price{
            padding: 0 .4rem;
            color: red;

          }

        }
      }

    }
    .ball-container{
      .ball{
        position: fixed;
        left: .64rem;
        bottom: .44rem;
        z-index: 99999;
        .drop-enter,.drop-enter-active{
          transition: all .4s cubic-bezier(.49, -.29, .75, .41);
          .inner{
            width: .32rem;
            height: .32rem;
            border-radius: 50%;
            background: rgb(0,160,220);
            transition: all .4s linear;
          }
        }
      }
    }
  }
  .backdrop{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 40;
  }
  .fade-backdrop-enter,.fade-backdrop-leave-to{
    opacity: 0;
  }
  .fade-backdrop-enter-active,.fade-backdrop-leave-active{
    transition: all .4s ease;
  }
  .flide-up-enter,.flide-up-leave-to{
    transform: translate3d(100%,0,0);
    opacity: 0;
  }
  .flide-up-enter-active,.flide-up-leave-active{
    transition: all .4s ease-in-out;
  }

</style>
