<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" @click="menuClick(index,$event)"
            :class="index==CurrentIndex?'menu-item-selected':'menu-item'">
          <span class="text">
            <iconMap v-show="item.type>0" :iconType="item.type"></iconMap>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1>{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item flex flex-align-start" @click="goDetail(food)">
              <div class="icon">
                <img :src="food.icon"/>
              </div>
              <div class="content">
                <h2>{{food.name}}</h2>
                <p class="description" v-show="food.description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice"><span class="unit">￥</span>{{food.price}}</span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartControl :food="food"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopCart>
    <foodDetail :food="selectedFood" v-if="selectedFood" ref="myFood"></foodDetail>
  </div>
</template>

<script>
  import iconMap from '../base/iconMap'
  import shopCart from '../base/shopCart'
  import foodDetail from '../foodDetail/foodDetail'
  import cartControl from '../base/cartControl'
  import BScroll from 'better-scroll'
  import axios from 'axios'
  const eventHub = new Vue()
  import Vue from 'vue'

  export default {
    name: "goods",
    components: {
      iconMap,
      shopCart,
      foodDetail,
      cartControl,
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        scrollY: 0,
        listHeight: [],
        selectedFood:''
      }
    },
    mounted() {
      axios.get('static/data.json').then((res) => {
        this.goods = res.data.goods
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight()
        })
      })
    },
    computed: {
      CurrentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food)
              }
            })
        })
        return foods
      }
    },
    methods: {
      _initScroll() {
        this.menuScoll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight
          this.listHeight.push(height)
        }
      },
      menuClick(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodScroll.scrollToElement(el, 300)
      },
      goDetail(food) {
        this.selectedFood = food
        this.$nextTick(()=>{
          this.$refs.myFood.showToggle()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods {
    position: absolute;
    font-size: .24rem;
    display: flex;
    flex-direction: row;
    text-decoration: none;
    top: 3.5rem;
    left: 0;
    right: 0;
    bottom: 1rem;
    overflow: hidden;
  }

  .menu-wrapper {
    width: 30%;

  }

  .goods-wrapper {

  }

  .menu-item {
    height: 1.1rem;
    line-height: .28rem;
    width: 1.2rem;
    padding: 0 .24rem;
    background: #f3f5f7;
    display: table;

  }

  .menu-item-selected {
    .menu-item;
    background: white;
    .text {
      border-bottom: none;
    }
  }

  .text {
    vertical-align: middle;
    white-space: normal;
    display: table-cell;
    font-weight: 200;
    border-bottom: 1px solid lightgrey;
  }

  .food-list {
    list-style: none;
    h1 {
      background: #f3f5f7;
      font-size: .24rem;
      font-weight: 200;
      height: .5rem;
      line-height: .5rem;
      padding-left: .3rem;
    }
  }

  .food-item {
    margin: 0 .34rem;
    border-bottom: 1px solid lightgrey;
    padding: .34rem 0;
    .icon img {
      width: 1.1rem;
      height: 1.1rem;
      margin-right: .2rem;
    }
    .content {
      position: relative;
      line-height: .4rem;
      width: 90%;
      h2 {
        font-size: .3rem;
      }
      .description {
        font-size: .2rem;
        color: lightgrey;
      }
      .sell-info {
        .description
      }
      .newPrice {
        color: red;
        font-size: .3rem;
        .unit {
          font-size: .2rem;
        }
      }
      .oldPrice {
        font-size: .2rem;
        color: lightgrey;
        text-decoration: line-through;
      }
    }
  }

  .price {
    display: inline-block;
  }

  .cartcontrol-wrapper {
    position: absolute;
    z-index: 120;
    right: .1rem;
    bottom: 0;
  }


</style>
