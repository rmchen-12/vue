<template>
  <div>
    <v-header tabname="完成订单" :cartShow="false">
      <i class="fa fa-angle-left fa-2x _icon" aria-hidden="true" @click.stop="_return"></i>
    </v-header>
    <div ref="orders" class="orders">
      <div class="wrapper">
        <div class="order" v-for="(order,index) in orderList">
          <div class="number">订单{{index+1}}</div>
          <div class="o flex flex-around flex-align-center" v-for="item in order">
            <img :src="item.GoodsImage" class="img"/>
            <span class="name">{{item.GoodsName}}</span>
            <span class="count">数量：{{item.count}}</span>
            <span class="price">单价：{{item.GoodsPrice}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tips" v-if="!orderList"><p>暂无订单信息</p></div>
  </div>
</template>

<script>
  import Header from '../../components/base/header'
  import BScroll from 'better-scroll'

  export default {
    components: {
      'v-header': Header
    },
    data() {
      return {
        orderList: [],
      }
    },
    mounted() {
      console.log(this.$store.state.orders)
      this.$nextTick(() => {
        this.orderList = this.$store.state.orders
        this._initScroll()
      })
    },
    methods: {
      _initScroll() {
        const scroll = new BScroll(this.$refs.orders, {
          click: true
        })
      },
      _return() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/variable';

.orders {
  position: absolute;
  width: 100%;
  overflow: hidden;
  top:.4rem;
  bottom: 0;
  .wrapper {
    .order {
      width: 100%;
      .number {
        display: block;
        width: 100%;
        height: .3rem;
        background: lightgrey;
        font-size: .18rem;
        padding-left: .2rem;
        color: whitesmoke;
        line-height: .3rem;
        font-weight: 500;
      }
      .o {
        img {
          width: .7rem;
          height: .7rem;
          flex: 1;
        }
        .name {
          padding-left: .1rem;
          flex: 1 0 36%;
        }
        .count {
          flex: 1 0 20%;
        }
        .price {
          flex: 1 0 20%;
        }
      }
    }
  }
}
  .tips {
    text-align: center;
    margin-top: 3rem;
  }

</style>
