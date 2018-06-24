<template>
  <div class="flex page">
    <img id="bg-img" :src="seller.avatar"/>
    <div class="header">
    <div class="flex-align-center flex content-wrap">
      <div class="avatar">
        <img :src="seller.avatar"/>
      </div>
      <div class="content flex page flex-align-start flex-between">
        <div class="title flex-align-center">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description + '/' + seller.deliveryTime + '分钟送达'}}
        </div>
        <div class="support" v-if="seller.supports">
          <div class="support-content flex-align-center">
            <span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @cilck="detailShow = true">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="flex flex-align-center bullet" @click="detailShow = true">
      <span class="bullet-title"></span>
      <span class="bullet-content">{{seller.bulletin}}</span>
      <i class="arrow-right"></i>
    </div>
    <transition name="fade">
      <div class="detail" v-if="detailShow">
        <div class="flex page flex-align-center">
          <div class="detail-title-wrapper">
            <span class="detail-title">{{seller.name}}</span>
          </div>
          <div class="star">
            <star :score="seller.score" :size="48"></star>
          </div>
          <div class="discount">
            <span class="line"></span>
            <span class="discount-title">优惠信息</span>
            <span class="line"></span>
          </div>
          <div class="support-wrapper">
            <ul>
              <li v-for="(item,index) in seller.supports" class="supports-item">
                <span :class="iconClassMap[item.type]"></span>
                {{item.description}}
              </li>
            </ul>
          </div>
          <div class="seller-bullet">
            <div class="seller-bullet-title">
              <span class="line"></span>
              <span class="seller-title">商家公告</span>
              <span class="line"></span>
            </div>
            <div class="seller-bullet-content">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
          <div class="detail-close">
            <i class="icon-close" @click="detailShow = false">X</i>
          </div>
        </div>
      </div>
    </transition>
    </div>
  </div>
</template>

<script>
  import Star from './star'
  export default {
    name: "header",
    components:{
      Star
    },
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return{
        detailShow:false,
        iconClassMap:[]
      }
    },
    created(){
      this.iconClassMap = ['decrease', 'discountt', 'special', 'invoice', 'guarantee']
    },
    methods:{
      // showDetail(){
      //   this.detailShow = true
      // },
      // hideDetail(){
      //   this.detailShow = false
      // }
    }
  }
</script>

<style lang="less" scoped>
@import "../../../static/less/base";
  #bg-img{
    opacity: .8;
    height: 2.7rem;
    width: 100%;
    filter: blur(7px);
  }
  .header{
    /*background: url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg") no-repeat;*/
    height: 2.7rem;
    position: absolute;
    width: 100%;
    font-size: .3rem;
    color: white;
    background: rgba(7,17,27,0.5);
    .avatar img{
      height: 1.28rem;
      width: 1.28rem;
      margin-right: .3rem;
    }
    .content-wrap{
      padding: .47rem 0 .32rem .47rem;
    }
    .content{
      height: 1.28rem;
    }
    .brand{
      background: url("../../../static/img/header/brand@2x.png");
      display: inline-block;
      width: .65rem;
      height: .35rem;
      background-size: 100% 100%;
    }
    .name{
      font-weight: 800;
      font-size: .32rem;
      margin-left: .2rem;
    }
    .description{

      font-size: .24rem;
    }
    .decrease{
      background: url("../../../static/img/header/decrease_1@2x.png");
      height:.24rem;
      width: .24rem;
      display: inline-block;
      background-size: 100% 100%;
    }
    .discountt{
      background: url("../../../static/img/header/discount_1@2x.png");
      height:.24rem;
      width: .24rem;
      display: inline-block;
      background-size: 100% 100%;
    }
    .special{
      background: url("../../../static/img/header/special_1@2x.png");
      height:.24rem;
      width: .24rem;
      display: inline-block;
      background-size: 100% 100%;
    }
    .invoice{
      background: url("../../../static/img/header/invoice_1@2x.png");
      height:.24rem;
      width: .24rem;
      display: inline-block;
      background-size: 100% 100%;
    }
    .guarantee{
      background: url("../../../static/img/header/guarantee_1@2x.png");
      height:.24rem;
      width: .24rem;
      display: inline-block;
      background-size: 100% 100%;
    }
    .text{
      font-size: .2rem;
      margin-left: .2rem;
    }
    .support-count{
      background: rgba(0,0,0,.2);
      width: .9rem;
      height: .5rem;
      border-radius: 11px;
      position: absolute;
      right: .24rem;
      top: 1.3rem;
      cursor: pointer;
      .count{
        font-size: .2rem;
        padding-left: .1rem;
        cursor: pointer;
      }
      .arrow-right:before{
        content:">"
      }
    }
  }
  .bullet{
    background: rgba(0,0,0,.2);
    height: .55rem;
    overflow: hidden;
    white-space: nowrap;
    padding: 0 .27rem 0 0;
  }
  .bullet-content{
    font-size: .21rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bullet-title{
    background: url("../../../static/img/header/bulletin@2x.png");
    width: .47rem;
    height: .25rem;
    display: inline-block;
    background-size: 100% 100%;
    margin:0 .2rem 0 .2rem
  }
  .detail{
    background: rgba(6,16,26,.7);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: 100%;
    padding-top: 1.3rem;
    z-index: 999;
  }
  .detail-title-wrapper{
    text-align: center;
    font-size: .32rem;
    font-weight: 800;
  }
  .star{
      margin: .2rem 0 .2rem 0;
  }
  .line{
    display: inline-block;
    border-bottom: 1px solid rgb(135,195,255);
    width: 2.5rem;
    height: 0;
    margin: 0 0 .1rem 0;
  }
  .supports-item{
    text-decoration: none;
    list-style: none;
    font-size: .24rem;
    font-weight: 100;
    padding: .1rem 0 .1rem 0;
    margin-left: -1rem;
  }
  .support-wrapper{
    margin-bottom: .2rem;
    margin-top: .2rem;
  }
  .seller-bullet{
    text-align: center;
    width: 7rem;
  }
  .seller-bullet-title{
    margin-bottom: .2rem;
  }
  .seller-bullet-content{
    line-height: .5rem;
    font-weight: 200;
    font-size: .24rem;
    width: 5rem;
    text-align: left;
    margin-left: .8rem;
  }
  .icon-close{
    position: absolute;
    bottom:3rem;
    cursor: pointer;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
    transform: translate3d(100px,0,0);
  }
  .fade-enter-active,.fade-leave-active{
    transition: all .4s ease;
  }



</style>
