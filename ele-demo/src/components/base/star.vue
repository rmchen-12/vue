<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  export default {
    name: "star",
    props: {
      score: {
        type: Number
      },
      size:{
        type:Number
      }
    },
    computed:{
      starType(){
        return 'star-' +this.size
      },
      itemClasses(){
        let result = []
        let score = Math.floor(this.score*2)/2
        let havDecimal = score % 1 !== 0;
        let integer = Math.floor(score)
        for(let i = 0;i<integer;i++){
          result.push('on')
        }
        if(havDecimal){
          result.push('half')
        }
        while (result.length<5){
          result.push('off')
        }
        return result
      }
    }
  }
</script>

<style lang="less" scoped>
  .star-48{
    .star-item{
      width: .4rem;
      height: .4rem;
      margin-right: .44rem;
      display: inline-block;
      background-repeat: no-repeat;
    }
    .on{
      .star-item;
      background: url("../../../static/img/star/star48_on@2x.png");
      background-size: 100% 100%;
    }
    .half{
      .star-item;
      background: url("../../../static/img/star/star48_half@2x.png");
      background-size: 100% 100%;
    }
    .off{
      .star-item;
      background: url("../../../static/img/star/star48_off@2x.png");
      background-size: 100% 100%;
    }
  }
  .star-36{
    .star-item{
      width: .3rem;
      height: .3rem;
      margin-right: .14rem;
      background-size: 100% 100%;
      display: inline-block;
      background-repeat: no-repeat;
    }
    .on{
      .star-item;
      background: url("../../../static/img/star/star36_on@2x.png");
    }
    .half{
      .star-item;
      background: url("../../../static/img/star/star36_half@2x.png");
    }
    .off{
      .star-item;
      background: url("../../../static/img/star/star36_off@2x.png");
    }
  }
  .star-24{
    .star-item{
      width: .2rem;
      height: .2rem;
      margin-right: .1rem;
      background-size: 100% 100%;
      display: inline-block;
      background-repeat: no-repeat;
    }
    .on{
      .star-item;
      background: url("../../../static/img/star/star24_on@2x.png");
    }
    .half{
      .star-item;
      background: url("../../../static/img/star/star24_half@2x.png");
    }
    .off{
      .star-item;
      background: url("../../../static/img/star/star24_off@2x.png");
    }
  }
</style>
