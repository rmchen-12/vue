<template>
  <div class="sellerWrapper" ref="sellerWrapper">
    <div class="sellerContent">
      <div class="info">
        <div class="title">
          <div class="text">{{seller.name}}</div>
          <div class="star-wrapper">
            <star :size="36" :score="4.2" class="star"></star>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collect">
            <i class="fa fa-heart fa-2x"></i>
            <span class="text">收藏</span>
          </div>
        </div>
        <div class="remark">
          <div class="minMoney">
            <div class="text">起送价</div>
            <div><span class="num">{{seller.minPrice}}</span>元</div>
          </div>
          <div class="deliveryMoney">
            <div class="text">商家配送</div>
            <div><span class="num">{{seller.deliveryPrice}}</span>元</div>
          </div>
          <div class="deliveryTime">
            <div class="text">平均配送时间</div>
            <div><span class="num">{{seller.deliveryTime}}</span>分钟</div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="notice">
        <div class="title">公告与活动</div>
        <div class="content">{{seller.bulletin}}</div>
        <div class="activities">
          <ul>
            <li v-for="(item) in seller.supports" class="support">
              <icon-map :iconType="item.type" class="icon"></icon-map>
              {{item.description}}
            </li>
          </ul>
        </div>
      </div>
      <div class="divider"></div>
      <div class="pic">
        <div class="title">商家实景</div>
        <div class="pic-list" ref="picsWrapper">
          <div ref="picList">
            <img v-for="(item,index) in seller.pics" :src="item" class="item"></img>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="seller-info">
        <div class="title">商家信息</div>
        <div class="info">
          <ul>
            <li v-for="item in seller.infos">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import star from '../base/star'
  import IconMap from "../base/iconMap";
  export default {
    components:{
      IconMap,
      star
    },
    props: {
      seller: Object
    },
    name: "seller",
    created(){
      this.$nextTick(()=>{
        this.scroll = new BScroll(this.$refs.sellerWrapper,{
          click:true
        })
        this._initPicScroll()
      })
    },
    methods:{
      _initPicScroll(){
        if(this.picScroll){
          return
        }
        const PIC_WIDTH = 100
        const MARGIN = 5
        let picLen = this.seller.pics.length
        this.$refs.picList.style.width = PIC_WIDTH * picLen + MARGIN * (picLen - 1) + 'px'
        this.picScroll = new BScroll(this.$refs.picsWrapper, {
          scrollX: true
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @base_color : rgba(7,17,27,0.1);
  @font_color : #93999f;
  .sellerWrapper{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top:3.5rem;
    overflow: hidden;
    font-size: .24rem;
    .sellerContent{
      .info{
        width: 100%;
        height: 3rem;
        padding: .3rem;
        .title{
          padding-bottom: .3rem;
          border-bottom: 3px solid @base_color;
          .text{
            font-size: 120%;
            font-weight: 800;
          }
          .star-wrapper{
            margin-top: .1rem;
            .star{
              display: inline-block;
              vertical-align: middle;
            }
            .sell-count{
              display: inline-block;
              vertical-align: middle;
            }
            .rating-count{
              display: inline-block;
              vertical-align: middle;
              margin-right: .1rem;
            }
          }
          .collect{
            position: absolute;
            top:.3rem;
            right: .3rem;
            text-align: center;
            i{
              display: block;
              color: @base_color;
            }
            .text{
              display: block;
              color: @base_color*1.5;
            }
          }
        }
        .remark{
          padding-top: .3rem;
          font-size: 120%;
          .minMoney{
            width: 30%;
            text-align: center;
            color: @font_color;
            display: inline-block;
            border-right: 2px solid @base_color;
            .text{

            }
            .num{
              font-size: 150%;
              color: black;
            }
          }
          .deliveryTime{
            .minMoney;
            border-right: none;
          }
          .deliveryMoney{
            .minMoney
          }
        }
      }
      .divider{
        height: .4rem;
        background: @base_color;
      }
      .notice{
        padding: .3rem;
        .title{
          font-size: 150%;
          font-weight: 800;
        }
        .content{
          color: #f01414;
          line-height: .6rem;
          padding: 0 .3rem;
        }
        .activities{
          .support{
            border-top: 1px solid @base_color;
            padding: .3rem;
            list-style: none;
            color: @font_color;
          }
          .icon{
            width: .3rem;
            height: .3rem;
            vertical-align: middle;
            background-size: 100% 100%;
          }
        }
      }
      .pic{
        white-space: nowrap;
        margin: .2rem;
        overflow: hidden;
        .title{
          font-weight: 800;
          font-size: 150%;
          padding: 0 0 .3rem 0;
        }
        .pic-list{
          .item{
            width: 2rem;
            height: 1.6rem;
            margin-right: .1rem;
          }
        }
      }
      .seller-info{
        padding: .3rem;
        .title{
          font-size: 150%;
          font-weight: 800;
        }
        .info{
          margin-left: -.3rem;
          li{
            list-style: none;
            color: @font_color;
            border-top: 1px solid @font_color;
            padding: .3rem 0 .3rem .2rem;
          }
        }
      }
    }

  }
</style>
