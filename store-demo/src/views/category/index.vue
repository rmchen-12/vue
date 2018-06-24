<template>
  <div>
    <div @click="showCart">
      <v-header tabname="商品分类" :totalPrice="totalPrice">
        <transition :name="slideNameA">
          <i class="fa fa-angle-left fa-2x _icon" aria-hidden="true" v-show="selectedGood" @click.stop="_return"></i>
        </transition>
      </v-header>
    </div>
    <transition :name="slideNameB">
      <div class="category" v-show="showCategory">
        <div class="content flex">
          <div class="content-left">
            <div class="wrapper">
              <div v-for="(item,index) in menuList" @click="select(index)"
                   :class="index === currentIndex?'selected':'unselected'">{{item.cat_name}}
              </div>
            </div>
          </div>
          <div class="content-right" ref="right">
            <div class="wrapper">
              <div class="goodList goodList-hook" v-for="category in goodList">
                <div class="type">
                  <span class="name">{{category.busines.business_name}}</span>
                </div>
                <div class="type-list flex" v-for="good in category.cart">
                  <div class="wrapper" @click="goDetail(good)">
                    <img class="img" v-lazy="good.GoodsImage"></img>
                  </div>
                  <div class="info">
                    <div class="name">{{good.GoodsName}}</div>
                    <div class="price">
                      <span class="text">单价:</span>
                      <span class="icon">￥</span>
                      {{good.GoodsPrice}}
                    </div>
                    <v-cartControl :good="good" class="cart-control">
                    </v-cartControl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <v-footer></v-footer>
    <v-cart :totalPrice="totalPrice" ref="cart" class="cart"></v-cart>
    <v-detail :good="selectedGood" v-if="selectedGood" ref="detail" class="_detail">
    </v-detail>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Cart from '../../components/cart'
  import Header from '../../components/base/header'
  import Footer from '../../components/base/footer'
  import CartControl from '../../components/base/cartControl'
  import Detail from '../../components/detail/detail'
  import Vue from 'vue'

  export default {
    data() {
      return {
        menuList: [],
        goodList: [],
        heightList: [],
        scrollY: 0,
        totalPrice: 0,
        selectedGood: '',
        showCategory: true,
        slideNameA:'iconSlide',
        slideNameB:'slideRight'
      }
    },
    components: {
      'v-detail': Detail,
      'v-header': Header,
      'v-footer': Footer,
      'v-cartControl': CartControl,
      'v-cart': Cart
    },
    created() {
      this._getMenudata()
      this.$http.get('/api/categorydata').then((res) => {
        this.goodList = res.data.data
        // console.log(this.goodList)
        // this.goodList.forEach(item => {
        //   for(let i=0;i<item.length;i++){
        //     if (JSON.stringify(this.$store.state.carts).includes(JSON.stringify(item[i]))) {
        //       console.log(this.good.count)
              // let index = this.$store.state.carts.indexOf(item[i])
              // let i = this.$store.state.carts[index].count
              // console.log(i)
              // Vue.set(item[i], 'count', i)
             // }
          // }
        // })
        // console.log(this.goodList)
        // if (JSON.stringify(this.$store.state.carts).includes(JSON.stringify(this.good))) {
        //   console.log(this.good.count)
          // let index = this.$store.state.carts.indexOf(this.good)
          // let i = this.$store.state.carts[index].count
          // console.log(i)
          // this.good.count = i
          // Vue.set(this.good, 'count', i)
        this.$nextTick(() => {
          this._initScroll()
          this._heightList()
          this.$root.eventHub.$on('changePrice', (total) => {
            this.totalPrice = total
          })
          this.$store.state.carts.forEach((item) => {
            this.totalPrice += item.GoodsPrice*item.count
          })
        })
      })
    },
    mounted() {
      this.$nextTick(()=>{

      })

      this.$root.eventHub.$on('categoryIndex', (index) => {
        this.select(index)
      })
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.heightList.length; i++) {
          let topHeight = this.heightList[i]
          let bottomHeight = this.heightList[i + 1]
          if (!bottomHeight || (this.scrollY >= topHeight && this.scrollY < bottomHeight)) {
            return i
          }
        }
        return 0
      }
    },
    methods: {
      _initScroll() {
        this.listScroll = new BScroll(this.$refs.right, {
          click: true,
          probeType: 3
        })
        this.listScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _heightList() {
        let goodList = this.$refs.right.querySelectorAll('.goodList-hook')
        let height = 0
        this.heightList.push(height)
        for (let i = 0; i < goodList.length; i++) {
          let good = goodList[i]
          height += good.clientHeight
          this.heightList.push(height)
        }
      },
      _getMenudata() {
        this.$http.get('/api/menudata').then((res) => {
          this.menuList = res.data.data
        })
      },
      _getGoodList() {
        this.$http.get('/api/categorydata').then((res) => {
          this.goodList = res.data.data
        })
      },
      select(index) {
        this.listScroll.scrollTo(0, -this.heightList[index], 500)
      },
      goDetail(good) {
        this.selectedGood = good
        this.showCategory = !this.showCategory
        this.$nextTick(() => {
          this.$refs.detail.showToggle()
        })
      },
      _return() {
        this.showCategory = true
        this.selectedGood = ''
      },
      showCart() {
        if(this.$store.state.carts.length > 0){
          this.$refs.cart.cartShow()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/variable';

  .category {
    position: absolute;
    top: .4rem;
    bottom: .5rem;
    width: 100%;
    overflow: hidden;
    .content {
      .content-left {
        width: 28%;
        background: white;
        .wrapper {
          .unselected {
            font-weight: 800;
            height: .5rem;
            padding-left: .1rem;
            line-height: .5rem;
            border-bottom: 2px solid whitesmoke;
          }
          .selected {
            .unselected();
            background: @base_background;
            color: whitesmoke;
          }
        }
      }
      .content-right {
        border-left: 2px solid whitesmoke;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 72%;
        right: 0;
        overflow: hidden;
        flex: 1;
        .wrapper {
          .goodList {
            .type {
              background: rgba(96, 96, 96, 0.5);
              height: .3rem;
              text-align: center;
              line-height: .3rem;
              .name {
                color: whitesmoke;
                font-size: .16rem;
                font-weight: 800;
              }
            }
            .type-list {
              /*padding: .1rem;*/
              .wrapper {
                .img {
                  flex: 1;
                  height: 1rem;
                  width: 1rem;
                }
              }
              .info {
                flex: 0 0 200px;
                margin: auto 0;
                .name {
                }
                .price {
                  padding: .05rem 0;
                  .text {
                  }
                  .icon {
                    font-weight: 700;
                    color: @base_background;
                    font-size: .2rem;
                    margin-right: -.03rem;
                  }
                }
                .cart-control {
                  height: .2rem;
                  width: .6rem;
                }
              }
            }
          }
        }
      }
    }
  }
  .cart{
    position: absolute;
    width: 100%;
    bottom: .5rem;
    top:0
  }

  ._detail {
    position: absolute;
    width: 100%;
  }



</style>
