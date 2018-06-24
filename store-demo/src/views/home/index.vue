<style lang="less" scoped>
  @import "../../assets/less/variable";

  .page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: .5rem;
    overflow: hidden;
    .content {
      .swiper-wrapper {
      }
      .category {
        width: 100%;
        height: 1rem;
        .title {
          font-weight: 800;
          color: whitesmoke;
          height: .3rem;
          width: 100%;
          text-align: center;
          background: @base_background;
          line-height: .3rem;
          margin-top: -.06rem;
        }
        .content {
          overflow: hidden;
          width: 100%;
          .wrapper {
            width: 4.2rem;
            .category-item {
              display: inline-block;
              img {
                width: .7rem;
                height: .7rem;
                border-radius: 50%;
              }
              p {
                font-weight: 800;
                font-size: .11rem;
                text-align: center;
                vertical-align: sub;
              }
            }
          }
        }
      }
      .recommend {
        width: 100%;
        height: 5.9rem;
        overflow: hidden;
        .title {
          position: relative;
          margin-top: .3rem;
          height: .3rem;
          width: 100%;
          text-align: center;
          background: @base_background;
          line-height: .3rem;
          p {
            font-weight: 800;
            color: whitesmoke;
          }
          .icon {
            position: absolute;
            color: whitesmoke;
            line-height: .3rem;
            top: 0;
            right: .15rem;
            p {
              display: inline;
              font-size: .1rem;
              color: whitesmoke;
              padding-left: .05rem;
            }
          }
        }
        .end{
          text-align: center;
          margin-top: 1rem;
          font-size: .2rem;
          font-weight: 500;
          background: lightgray;
          border-radius: 10px;
        }
        .recommend-item {
          width: 50%;
          height: 1.5rem;
          display: inline-block;
          text-align: center;
          img {
            width: 1.3rem;
            height: 1.3rem;
          }
          .goodsinfo {
            .name {
              font-weight: 700;
            }
            .info {
              background: rgba(89, 89, 89, .5);
              margin: 0 .1rem;
              height: .2rem;
              border-radius: 5px;
              .price {
                margin-left: .1rem;
              }
              .control {
                margin-right: .1rem;
              }
            }
          }
        }
      }
    }
  }

  .img {
    width: 100%;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(-100%, 0, 0);
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .2s ease;
  }

  .fade-enter, .fade-leave-to {
    transform: translate3d(3000%, 0, 0);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease;
  }
</style>


<template>
  <div>
    <div @click.stop="showCart">
      <v-header :totalPrice="totalPrice" tabname="零食超市" class="header">
        <transition name="fade">
          <i class="fa fa-angle-left fa-2x _icon" aria-hidden="true" v-show="selectedGood" @click.stop="_return"></i>
        </transition>
      </v-header>
    </div>
    <transition name="slide">
      <div class="page" ref="home" v-show="showHome">
        <div class="content">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="pic in pics">
                <img :src="pic.img" class="img"/>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="category">
            <div class="title"><p>商品分类</p></div>
            <div class="content" ref="category">
              <div class="wrapper">
                <div class="category-item" v-for="(item,index) in foods" @click="goCategory(index)">
                  <img v-lazy="item.SalesProduct[0].GoodsImage"/>
                  <p>{{item.Category.TopText}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="recommend">
            <div class="title">
              <p>热门推荐</p>
              <i class="fa fa-refresh icon" @click.stop.prevent="refresh" aria-hidden="true"><p>换一批</p></i>
            </div>
            <div class="recommend-item" v-for="good in recommendList">
              <img v-lazy="good.GoodsImage" @click="goDetail(good)"/>
              <div class="goodsinfo">
                <p class="name">{{good.GoodsName}}</p>
                <div class="info flex flex-between">
                  <p class="price">￥{{good.GoodsPrice}}</p>
                  <v-cartControl :good="good" ref="cartControl"></v-cartControl>
                </div>
              </div>
            </div>
            <div class="end" v-if="arrayCarts.length === 0">已无更多推荐</div>
          </div>
        </div>
      </div>
    </transition>
    <v-footer></v-footer>
    <v-cart :totalPrice="totalPrice" ref="cart"></v-cart>
    <v-detail :good="selectedGood" v-if="selectedGood" ref="detail"></v-detail>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import Cart from '../../components/cart'
  import Detail from '../../components/detail/detail'
  import CartControl from '../../components/base/cartControl'
  import Header from '../../components/base/header'
  import Footer from '../../components/base/footer'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import BScroll from 'better-scroll'
  import VCart from "../../components/cart/index";

  export default {
    components: {
      VCart,
      'v-header': Header,
      'v-footer': Footer,
      'v-cartControl': CartControl,
      'v-detail': Detail,
      'v-cart': Cart
    },
    data() {
      return {
        pics: [],
        foods: [],
        productList: [],
        recommendList: [],
        arrayCarts: [],
        selectedGood: '',
        showHome: true
      }
    },
    created() {
      this._getCategory()
    }
    ,
    mounted() {
      this._getPics()
      this._getFoods()
      //确保加载
      setTimeout(() => {
        this._getArrayCarts()
        this._getRecommend()
        this._initScroll()
        const swiper = new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination',
          },
          spaceBetween: 10,
          autoplay: true,
          speed: 500,
        })
      }, 200)
      this.$router.push('/home')
    }
    ,
    computed: {
      ...mapGetters([
        'carts'
      ]),
      totalPrice() {
        let total = 0
        this.carts.forEach(item => {
          total += item.count * item.GoodsPrice
        })
        this.$root.eventHub.$emit('changePrice',total)
        return total
      },

    },
    methods: {
      ...
        mapMutations({
          setCarts: 'SET_CARTS',
          setGoods: 'SET_GOODS'
        }),
      _initScroll() {
        let homeScroll = new BScroll(this.$refs.home, {
          click: true
        })
        let categoryScroll = new BScroll(this.$refs.category, {
          scrollX: true,
          scrollY: false
        })
      }
      ,
      _getPics() {
        this.$http.get('/api/bannerdata').then(res => {
          this.pics = res.data.data
        })
      }
      ,
      _getFoods() {
        this.$http.get('/api/homedata').then(res => {
          this.foods = res.data.data
        })
      }
      ,
      _getCategory() {
        this.$http.get('/api/categorydata').then(res => {
          this.productList = res.data.data
        })
      }
      ,
      _getArrayCarts() {
        const arrayCarts = this.cartsArray(this.productList)
        let _carts = arrayCarts.reduce((pre, cur) => {
          return pre.concat(cur)
        })
        this.arrayCarts = _carts
      },
      _getRecommend() {
        let a = [],b=[]  //作为存储index和符合条件的中间数组
        this.arrayCarts.forEach( (item,index) => {
          if (!this.carts.includes(item)) {
            a.push(index)
          }
        })
        this.arrayCarts.forEach((item,index) => {
          for (let i=0;i<a.length;i++){
            if(index === a[i]){
              b.push(item)
            }
          }
        })
        this.arrayCarts = b
        // 产生不重用的随机数组
        const maxNum = this.arrayCarts.length
        let numArr = []
        while (numArr.length < maxNum) {
          let random = this.selectForm(0, this.arrayCarts.length - 1)
          var flag = true
          for (let i = 0; i < numArr.length; i++) {
            if (numArr[i] == random) {
              flag = false
              break
            } else {
              flag = true
            }
          }
          if (flag) {
            numArr.push(random)
          }
        }
        //产生一组不重用的随机推荐对象数组
        let cartsArr = []
        for (let i = 0; i < maxNum; i++) {
          cartsArr[i] = this.arrayCarts[numArr[i]]
        }
        this.recommendList = cartsArr
      }
      ,
      cartsArray(data) {
        const len = data.length
        let arr = []
        for (let i = 0; i < len; i++) {
          arr[i] = []
          arr[i] = data[i].cart
        }
        return arr
      }
      ,
      //产生目标随机数
      selectForm(lowerValue, upperValue) {
        var choices = upperValue - lowerValue + 1
        return Math.floor(Math.random() * choices + lowerValue)
      }
      ,
      refresh() {
        this._getRecommend()
      },
      //跳转详情页
      goDetail(item) {
        this.selectedGood = item
        this.showHome = !this.showHome
        this.$nextTick(() => {
          this.$refs.detail.showToggle()
        })
      },
      goCategory(index){
        this.$root.eventHub.$emit('categoryIndex',index)
        this.$router.push('./category')
      },
      _return() {
        this.showHome = true
        this.selectedGood = ''
      },
      showCart() {
        if(this.carts.length > 0){
          this.$refs.cart.cartShow()
        }
      }
    }
  }
</script>

