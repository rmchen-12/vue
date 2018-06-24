<style lang="less" scoped>
  @base_color : rgba(7,17,27,0.1);

  .ratingsWrapper{
    position: absolute;
    top: 3.5rem;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: .24rem;
    overflow: hidden;
    .ratingsContent{
      .info{
        padding: .3rem;
        display: flex;
        height: 1.5rem;
        .mark{
          padding-right: .2rem;
          text-align: center;
          flex: 0 0 3.75rem*2*.3;
          border-right: 1px solid rgba(7,17,27,0.1);
          .num{
            color: #ff9900;
            font-size: .48rem;
            line-height: .48rem;
          }
          .text{
            padding: .1rem 0;
            font-weight: 800;
          }
          .contrast{
            font-weight: 800;
            padding: 0 0 .1rem 0;
          }
        }
        .star{
          flex: 1;
          padding-left: .3rem;
          .serviceScore{
            margin-bottom: .19rem;
            .text{
              display: inline-block;
              font-size: 100%;
              vertical-align: middle;
              font-weight: 800;
            }
            .star{
              display: inline-block;
              vertical-align: middle;
              margin-left: -.2rem;

            }
            .num{
              display: inline-block;
              vertical-align: middle;
              color: #f90;
              font-size: 120%;
            }
          }
          .foodScore{
            .serviceScore
          }
          .deliveryTime{
            .text{
              font-size: 100%;
              font-weight: 800;
              color: #07111b;
            }
            .time{
              color: rgba(7,17,27,0.1);
              padding-left: .2rem;
            }
          }
        }
      }
      .divider{
        width: 100%;
        height: .5rem;
        background: rgba(7,17,27,0.1);
      }
      .evaluation{
        padding-top: .24rem;
        .classify {
          margin: 0 .3rem .3rem .3rem;
          padding-bottom: .2rem;
          border-bottom: 1px solid @base_color;
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
          padding:0 0 .3rem .3rem;
          border-bottom: 2px solid @base_color;
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
            padding: .35rem;
            list-style: none;
            display: flex;
            .avatar{
              flex: 0 0 100px;
              height: 100%;
              width: .5rem;
              img{
                height: .5rem;
                width: .5rem;
                border-radius: 50%;
              }
            }
            .content{
              flex: 1;
              .user{
                .name{

                }
                .rateTime{
                  float: right;
                  color: @base_color*2;
                }
              }
              .star-wrapper{
                .star{
                  display: inline-block;
                }
                .deliveryTime{
                  display: inline-block;

                  color: @base_color*1.5;
                }
              }
              .text{

              }
              .recommend{
                width: 400px;
                line-height: .5rem;
                .up{
                  color:dodgerblue;
                }
                .dish{
                  color: @base_color*1;
                  padding: .1rem;
                  border: 1px solid @base_color;
                  margin-right: .2rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratingsContent">
      <div class="info">
        <div class="mark">
          <div class="num">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="star">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="num">{{seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <span class="text">食物得分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="num">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation">
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
            <li class="evel" v-for="evel in eveArr">
              <div class="avatar">
                <img :src="evel.avatar"/>
              </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{evel.username}}</span>
                  <span class="rateTime">{{evel.rateTime | time  }}</span>
                </div>
                <div class="star-wrapper">
                  <star :size="24" :score="evel.score" class="star"></star>
                  <span  class="deliveryTime">{{evel.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">
                  {{evel.text}}
                </div>
                <div class="recommend">
                  <span class='fa fa-thumbs-up up' v-show="evel.recommend.length"></span>
                  <span class="dish" v-for="dish in evel.recommend">{{dish}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../base/star'
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import moment from 'moment'
  export default {
    components:{
      star
    },
    props:{
      seller:Object
    },
    name: "ratings",
    filters:{
      time(value){
        return moment(value).format('YYYY-MM-DD HH:mm')
      }
    },
    data(){
      return{
        ratings:[],
        classifyArr: [{
          name: '全部',
          count: 0,
          active: true
        }, {
          name: '推荐',
          count: 0,
          active: false
        }, {
          name: '吐槽',
          count: 0,
          active: false
        }],
        evelflag:true
      }
    },
    created(){
      axios.get('static/data.json').then((res)=>{
        this.ratings = res.data.ratings
        this._initClassifyArr()
        this.$nextTick(()=>{
          this._initScroll()
        })
      })



    },
    computed:{
      eveArr(){
        let selectIndex
        this.classifyArr.forEach((data,index)=>{
          if(data.active){
            selectIndex = index
          }
        })
        if (selectIndex === 0){
          if (this.evelflag){
            return this.ratings.filter((data)=>{
              return data.text
            })
          }else{
            return this.ratings
          }
        }
        if(selectIndex === 1) {
          if (this.evelflag) {
            return this.ratings.filter((data) => {
              return data.rateType === 0 && data.text
            })
          } else {
            return this.ratings.filter((data) => {
              return data.rateType === 0
            })
          }
        }
        if (selectIndex === 2) {
          if (this.evelflag) {
            return this.ratings.filter((data) => {
              return data.rateType && data.text
            })
          } else {
            return this.ratings.filter((data) => {
              return data.rateType
            })
          }
        }
      }
    },
    methods:{
      filterEvel(item){
        this.classifyArr.forEach((item)=>{
          item.active = false
        })
        item.active = true
      },
      _initClassifyArr(){
        this.classifyArr.forEach((item,index)=>{
          if(index){
            item.count = this.ratings.filter((data)=>{
              return data.rateType === index - 1
            }).length
          }else{
            item.count = this.ratings.length
          }
        })
      },
      _initScroll(){
        this.scroll = new BScroll(this.$refs.ratingsWrapper,{
          click:true
        })
      },
      toggleflag(){
        this.evelflag = !this.evelflag
      }
    }
  }
</script>

