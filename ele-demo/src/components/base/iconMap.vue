<template>
    <span :class="iconMap[iconType]"></span>
</template>

<script>
  export default {
    name: "icon-map",
    props:['iconType'],
    data(){
      return{
        iconMap:[]
      }
    },
    created(){
      this.iconMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>

<style lang="less" scoped>

    .decrease{
      background: url("../../../static/img/header/decrease_1@2x.png");
      width: .24rem;
      height: .24rem;
      background-size: 100% 100%;
      display: inline-block;
    }
    .discount{
      .decrease;
      background: url("../../../static/img/header/discount_1@2x.png");
    }
    .special{
      .decrease;
      background: url("../../../static/img/header/special_1@2x.png");
    }
    .invoice{
      .decrease;
      background: url("../../../static/img/header/invoice_1@2x.png");
    }
    .guarantee{
      .decrease;
      background: url("../../../static/img/header/guarantee_1@2x.png");
    }

</style>
