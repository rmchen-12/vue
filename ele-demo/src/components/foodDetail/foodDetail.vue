<template>
  <transition name="move">
    <div class="detailWrapper" ref="detailWrapper" v-show="showDetail">
      <div class="foodDetail">
        <div class="back" @click="showToggle">
          <i class="fa fa-angle-left fa-3x" aria-hidden="true"></i>
        </div>
        <img :src="food.image"/>
        <div class="info">
          <div class="name">{{food.name}}</div>
          <div class="desc">
            <span>月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>
            {{food.price}}
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="shopCart">
            <transition name="fade">
              <div class="text" @click="addCart($event)" v-if="!food.count">加入购物车</div>
            </transition>
          </div>
          <cart-control :food="food"></cart-control>
        </div>
        <div class="divider"></div>
        <div class="description">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">
            商品评价
          </div>
          <div class="classify">
            <span v-for="(item,index) in classifyArr" class="item"
                  :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}"
                  @click="filterEvel(item)">{{item.name}}<span class="count">{{item.count}}</span>
            </span>
          </div>
          <div class="switch" @click="toggleflag">
            <i class="fa fa-check-square fa-2x" aria-hidden="true" :class="{'on':evelflag}"></i>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="(evel,index) in eveArr">
                <div class="userInfo">
                  <div class="time">{{evel.rateTime | time}}</div>
                  <div class="user">
                    <span>{{evel.username}}</span>
                    <span class="avatar"><img :src="evel.avatar"></span>
                  </div>
                  <div class="content">
                    <span class="icon" :class="evel.rateType?'fa fa-thumbs-down':'fa fa-thumbs-up up'"></span>
                    <span class="text">{{evel.text}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import CartControl from "../base/cartControl";
  import BScroll from 'better-scroll';
  import moment from 'moment'

  export default {
    components: {CartControl},
    name: "food-detail",
    props: {
      food: Object
    },
    filters:{
      time(value){
        return moment(value).format("YYYY-MM-DD HH:mm")
      }
    },
    data() {
      return {
        showDetail: false,
        classifyArr: [{
          name: '全部',
          count: this.food.ratings.length,
          active: true
        }, {
          name: '推荐',
          count: this.food.ratings.filter((data) => data.rateType === 0).length,
          active: false
        }, {
          name: '吐槽',
          count: this.food.ratings.filter((data) =>{
            return data.rateType
          }).length,
          active: false
        }],
        evelflag: false
      }
    },
    computed:{
      eveArr(){
        if(this.detailWrapper){
          this.$nextTick(()=>{
            this.detailWrapper.refresh()
          })
        }
        let selectIndex
        this.classifyArr.forEach((data,index)=>{
          if(data.active){
            selectIndex = index
          }
        })
        if (selectIndex === 0){
          if (this.evelflag){
            return this.food.ratings.filter((data)=>{
              return data.text
            })
          }else{
            return this.food.ratings
          }
        }
        if(selectIndex === 1) {
          if (this.evelflag) {
            return this.food.ratings.filter((data) => {
              return data.rateType === 0 && data.text
            })
          } else {
            return this.food.ratings.filter((data) => {
              return data.rateType === 0
            })
          }
        }
        if (selectIndex === 2) {
          if (this.evelflag) {
            return this.food.ratings.filter((data) => {
              return data.rateType && data.text
            })
          } else {
            return this.food.ratings.filter((data) => {
              return data.rateType
            })
          }
        }
      }
    },
    methods: {
      toggleflag(){
        this.evelflag = !this.evelflag
      },
      filterEvel(item){
        this.classifyArr.forEach((data)=>{
          data.active = false
        })
        item.active = true
      },
      _initScroll(){
        if(!this.detailWrapper){
          this.detailWrapper = new BScroll(this.$refs.detailWrapper,{
            click:true
          })
        }else{
          this.detailWrapper.refresh()
        }
      },
      showToggle() {
        this.showDetail = !this.showDetail;
        if(this.showDetail){
          this.$nextTick(()=>{
            this._initScroll()
          })
        }
      },
      addCart(event) {
        if(!event._constructed){
          return
        }
        if(!this.food.count){
          this.food.count ++
        }
      }
    },

  }
</script>

<style lang="less" scoped>
  .detailWrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 1rem;
    background: white;
    overflow: auto;
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }
    &.move-enter-active, &.move-leave-active {
      transition: all .4s ease-in-out;
    }
    .foodDetail {
      .back {
        position: absolute;
        top: .3rem;
        left: .4rem;
        color: white;
      }
      img {
        width: 100%;
        height: 4.25rem*2;
      }
      .info {
        width: 100%;
        height: .8rem*2;
        padding: .18rem*2;
        position: relative;
        .name {
          font-size: .28rem;
          font-weight: 700;
          color: #07111b;
        }
        .desc {
          font-size: 99%;
          color: #93999f;
          margin-top: .07rem;
        }
        .price {
          display: inline-block;
          padding-top: .4rem;
          color: red;
          .unit {
            font-size: 90%;
          }
          .oldPrice {
            font-size: 90%;
            color: #93999f;
            padding-left: .1rem;
          }
        }
        .shopCart {
          position: absolute;
          top: 1.4rem;
          right: 1.1rem;
          .text {
            width: 1.6rem;
            height: .5rem;
            border-radius: 24px;
            background: #007aff;
            text-align: center;
            color: white;
            line-height: .5rem;
            &.fade-enter,&.fade-leave-to{
              opacity: 0;
            }
            &.fade-enter-active,&.fade-leave-active{
              transition: all .4s ease;
            }
          }
        }
        .cartcontrol {
          float: right;
          margin: .2rem .8rem 0 0;
          display: inline-block;
        }
      }
      .divider {

        height: .5rem;
        background: #f3f5f7;
        width: 100%;
      }
      .description {
        padding: .4rem;
        .title {
          font-size: 120%;
          font-weight: 800;
          padding: 0 0 .2rem 0;
        }
        .content {
          font-size: 80%;
          line-height: .5rem;
          color: #93999f;
        }
      }
      .evaluation {
        padding: .4rem;
        .title {
          font-size: 120%;
          font-weight: 800;
        }
        .classify {
          .item {
            margin: .2rem .1rem .2rem 0;
            display: inline-block;
            height: .6rem;
            width: 1.2rem;
            line-height: .6rem;
            text-align: center;
            background: #19afff;
            color: darkgrey;
            font-weight: 800;
          }
          .active {
            background: #007aff;
            color: white;
          }
          .bad {
            background:#cccccc ;
          }
          .badActive {
            background: gray;
            color: white;
          }
        }
        .switch{
          padding: .3rem 0;
          border-bottom: 1px solid #93999f;
          border-top: 1px solid #93999f;
          i{
            color: #93999f;
            display: inline-block;
            vertical-align: middle;
          }
          .on{
            color: green;
          }
          .text{
            display: inline-block;
            color: #93999f;
            vertical-align: middle;
          }
        }
        .evel-list{
          .evel{
            border-bottom: 1px solid #93999f;
            margin: .3rem 0;
            list-style: none;
            font-size: 95%;
            color: #93999f;
            .userInfo{
              width: 100%;
              .time{
                display: inline-block;
                flex: 1;
              }
              .user{
                float: right;
                display: inline-block;
                :first-child{
                  display: inline-block;
                }
                .avatar{
                  display: inline-block;
                  margin-left: .1rem;
                  img{
                    height: .25rem;
                    width: .25rem;
                  }
                }
              }
              .content{
                margin: .15rem 0;
                .up{
                  color: #007aff;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
