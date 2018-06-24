<template>
  <div class="page">
    <headers tabname="购物车"></headers>
    <transition :name="slidename">
      <div class="container" v-show="mainarea">
        <div v-show="!havepage">
          <nopage></nopage>
        </div>
        <div v-show="havepage">
          <div class="cart-item" :class="{selected:itemIndex === cartIndex}"
               v-for="(cartItem,cartIndex) in $store.state.carts" @click="onDetail(cartItem)">
            <v-touch @swipeleft="onSwiperLeft(cartIndex)" @swiperight="onSwiperRight(cartIndex)">
              <div class="cart-content flex-align-center">
                <div class="goods-radio" @click.stop="onGoodsRadio(cartItem)">
                  <img src="../../../static/img/icon/radio.png" v-show="!cartItem.goodsRadio"/>
                  <img src="../../../static/img/icon/radio_select.png" v-show="cartItem.goodsRadio"/>
                </div>
                <div class="flex">
                  <div class="goods-img">
                    <img v-lazy="cartItem.GoodsImage"/>
                  </div>
                  <div class="goods-textBox">
                    <p class="goods-name">{{cartItem.GoodsName}}</p>
                    <div class="goodsOp flex">
                      <img src="../../../static/img/icon/shop_cut.png" @click.stop="onCutCart(cartItem)"/>
                      <input type="text" :value="cartItem.GoodsNum"/>
                      <img src="../../../static/img/icon/shop_add.png" @click.stop="onAddCart(cartItem)"/>
                    </div>
                    <p class="goods-coach">￥{{cartItem.GoodsPrice}}</p>
                  </div>
                </div>
              </div>
              <div class="remove" @click.stop="onRemove(cartItem)">
                <img src="../../../static/img/icon/remove.png"/>
              </div>
            </v-touch>
          </div>
        </div>
      </div>
    </transition>

    <div class="cartBottom-detail flex-between" v-show="$store.state.carts" v-cloak>
      <div class="flex">
        <div class="shopRadio" @click="onSelectAll()">
          <img src="../../../static/img/icon/radio.png" class="goods-radio" v-show="!goodsRadioAll"/>
          <img src="../../../static/img/icon/radio_select.png" class="goods-radio" v-show="goodsRadioAll"/>
        </div>
        <div class="bottom-left">
          <p>合计：<span class="shopCoach">￥{{allCoach}}</span></p>
        </div>
      </div>

      <div class="submitCart" @click="onOrder">
        <p>提交订单</p>
      </div>
    </div>
    <footers :urlRouter="$route.path"></footers>
  </div>
</template>

<script>
  import Headers from '../base/Header'
  import Footers from '../base/Footer'
  import Nopage from '../base/NoPage'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        mainarea: false,
        havepage: false,
        itemIndex: '',
        goodsRadioAll: false,
        allCoach: 0,
        slidename: 'slide-go',
        radioArr:[]
      }
    },
    components: {
      Headers,
      Footers,
      Nopage
    },
    computed: {
      ...mapGetters([
        'carts',
        'comname'
      ])
    },
    mounted() {
      this.mainarea = true;
      const that = this;
      if (this.$store.state.carts.length == 0) {
        that.havepage = false
      } else {
        that.havepage = true;
        that.$store.state.carts.forEach((item) => {
          if (typeof item.goodsRaido == 'undefined') {
            that.$set(item, 'goodsRadio', false);
          }
        })
      }
      ;
      if (this.$store.state.comname === 'index' || this.$store.state.comname === 'category' || this.$store.state.comname === 'goodsdetail') {
        this.slidename = 'slide-go';
      } else {
        this.slidename = 'slide-back'
      }
      this.setComname('cart');
    },
    methods: {
      ...mapMutations({
        setGoods: 'SET_GOODS',
        setOrders:'SET_ORDERS',
        setComname:'SET_COMNAME'
      }),
      onDetail(item) {
        this.$router.push('/detail');
        this.setGoods(item)
      },
      onSwiperRight() {
        this.itemIndex = '';
      },
      onSwiperLeft(index) {
        this.itemIndex = index
      },
      onGoodsRadio(item) {
        const that = this;
        that.radioArr = [];
        item.goodsRadio = !item.goodsRadio;
        that.$store.state.carts.forEach((itemGoods) => {
          that.radioArr.push(itemGoods.goodsRadio);
        })
        if (that.radioArr.indexOf(false) == -1) {
          that.goodsRadioAll = true;
        } else {
          that.goodsRadioAll = false;
        }
        this.onCalAllCoach();
      },
      onCutCart(item) {
        if (item.GoodsNum > 1) {
          item.GoodsNum--;
          this.onCalAllCoach();
        }
      },
      onAddCart(item) {
        item.GoodsNum++;
        this.onCalAllCoach();
      },
      onCalAllCoach() {
        const that = this;
        that.allCoach = 0;
        that.$store.state.carts.forEach((item) => {
          if (item.goodsRadio) {
            that.allCoach += item.GoodsNum * item.GoodsPrice;
          }
        })
      },
      onRemove(item) {
        let index = this.$store.state.carts.indexOf(item);
        this.$store.state.carts.splice(index, 1);
        this.itemIndex = '';
      },
      onSelectAll() {
        this.goodsRadioAll = !this.goodsRadioAll;
        if (this.goodsRadioAll) {
          this.$store.state.carts.forEach((item) => {
            item.goodsRadio = true;
          })
        } else {
          this.$store.state.carts.forEach((item) => {
            item.goodsRadio = false;
          })
        }
        this.onCalAllCoach();
      },
      onOrder(){
        let orderArr = [];
        this.$store.state.carts.forEach((item)=>{
          if(item.goodsRadio){
            orderArr.push(item)
          }
        })
        if(orderArr.length){
          this.$router.push('orderwait')
          this.setOrders(orderArr);
        }
      }
    }
  }

</script>

<style lang="less" scoped>
  @import '../../../static/less/variable';
  .container{
    padding-bottom:1.6rem;
    overflow-x:hidden;
  }
  .cart-item{
    border-bottom:1px solid #ccc;
    padding-top: .2rem;
    height: 2.4rem;
    position: relative;
    -webkit-transition: all 0.3s ease-in;
    -webkit-user-select: none;
  }
  .remove{
    background: linear-gradient(90deg,#9bbeff 0%,#007aff 100%);
    width: 18%;
    height: 2.6rem;
    text-align: center;
    text-decoration: none;
    position: absolute;
    right: -18%;
    top:0;
    img{
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 20%;
      width: .4rem;
      height: .4rem;
    }
  }
  .cart-content{
    width: 100%;
  }
  .selected{
    -webkit-transform: translate(-12%, 0);
    -webkit-transition: all 0.3s ease-in;
  }
  .goods-radio{
    margin: 0 .2rem;
    width: .34rem;
    height: .34rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .goods-img{
    margin-right: .2rem;
    width: 2rem;
    height: 2rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .goods-name{
    font-size: .28rem;
  }
  .goods-coach{
    font-size: .24rem;
    color: red;
    align-self: flex-end;
  }
  .goodsOp{
    margin: .4rem 0;
    img{
      width: .34rem;
      height: .34rem;
    }
    input{
      border: none;
      font-size: .28rem;
      text-align: center;
      width: .6rem;
    }
  }
  .cartBottom-detail{
    height: .8rem;
    position: absolute;
    bottom: .8rem;
    line-height: .8rem;
    font-size: .28rem;
    width: 100%;
    background: @theme_background;
    color:@base_color;
    img{
      margin: 0 .2rem;
      width: .3rem;
      height: .3rem;
      vertical-align: middle;
    }
  }
  .submitCart{
    padding-right: .2rem;
  }
</style>
