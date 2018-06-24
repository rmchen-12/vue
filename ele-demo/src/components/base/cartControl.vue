<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent = 'decreaseCart'>
        <i class="fa fa-minus-square fa-2x inner" aria-hidden="true"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add" @click.stop.prevent="addCart($event)">
      <i class="fa fa-plus-square fa-2x" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props:{
      food:Object
    },
    methods:{
      addCart(event){
        console.log(event.target)
        if (!event._constructed){
          return
        }
        if(!this.food.count){
          Vue.set(this.food,'count',0)
        }
        this.food.count++
        this.$root.eventHub.$emit('cart.add', event.target)
      },
      decreaseCart(){
        if(!event._constructed || !this.food.count){
          return
        }
        this.food.count--;
      }
    }
  }
</script>

<style lang="less" scoped>
  .cartcontrol{
    .cart-decrease{
      display: inline-block;
      padding: .06rem;
      vertical-align: middle;
      .inner{
        color: rgb(0,160,220);
      }
    }
    .cart-count{
      display: inline-block;
      vertical-align: middle;
      font-size: .2rem;
      color: rgb(147,153,159);
      line-height: .24rem;
      text-align: center;
    }
    .cart-add{
      display: inline-block;
      vertical-align: middle;
      color: rgb(0,160,220);
      padding: .06rem;
    }
  }
  .fadeRotate-enter,.fadeRotate-leave-to{
    transform: translate3d(.24rem,0,0) rotate(180deg);
    opacity: 0;
  }
  .fadeRotate-enter-active,.fadeRotate-leave-active{
    transition: all .4s linear;
  }

</style>
