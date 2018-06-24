<template>
  <div class="personal">
    <div class="graph"  @click="showInfo">
     <span class="img">
       <img src='../../assets/logo.png'/>
     </span>
     <span class="text">个人信息
       <i class="fa fa-chevron-right" aria-hidden="true"></i>
     </span>
    </div>
    <div class="division"></div>
    <div class="order" @click="goOrder">已完成订单</div>
    <div class="division"></div>
    <div class="address" @click="setAddress">设置收货地址</div>
    <v-footer></v-footer>
    <div class="info" v-show="info" @click="hideInfo">
      <p>求职中，有意者望加微信或call：13819198137</p>
      <img src="../../assets/info.jpg"/>
    </div>
  </div>
</template>

<script>
  import Footer from '../../components/base/footer'

  export default {
    components: {
      'v-footer': Footer
    },
    data(){
      return{
        info:false
      }
    },
    methods:{
      showInfo(){
        this.info = true
      },
      hideInfo(){
        this.info = false
      },
      goOrder(){
        this.$router.push('/finishedOrder')
      },
      setAddress(){
        this.$router.push('/address')
      }
    }
  }
</script>

<style lang="less" scoped>
  .personal {
    .graph {
      width: 100%;
      height: 2.5rem;
      background: lightgrey;
      text-align: center;
      padding-top: .35rem;
      .img{
        margin-top: 1rem;
      }
      .text{
        margin-top: .2rem;
        display: block;
      }
    }
    .order{
      height: .5rem;
      line-height: .5rem;
      background: lightgrey;
      padding-left: .2rem;

    }
    .address{
      .order();
    }
    .division{
      height: .3rem;
      width: 100%;
    }
    .info{
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(59,59,59,.7);
      text-align: center;
      p{
        padding-top: 1rem;
        font-size: .3rem;
        color: whitesmoke;
        margin-bottom: .2rem;
      }
      img{
        height: 3rem;
        width: 3rem;
      }
    }
  }

</style>
