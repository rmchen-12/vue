<template>
  <div class="cartcontrol">
    <transition name="flide">
      <div class="add" v-if="show" @click.once.stop.prevent="addcart($event,good)">
        <p>加入购物车</p>
      </div>
    </transition>
    <div class="control" v-if="!show">
      <i class="fa fa-minus-square" v-show="good.count > 0" aria-hidden="true" @click="minus($event)"></i>
      <p v-show="good.count > 0">{{good.count}}</p>
      <i class="fa fa-plus-square" aria-hidden="true" @click="add($event)"></i>
    </div>

  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import Vue from 'vue'

  export default {
    data() {
      return {
        // count:3,
      }
    },
    props: ['good'],
    watch: {
      // show(cur,pre){
      //   let a
      //   if(!this.good.count){
      //     return a = true
      //   }else{
      //     return a = false
      //   }
      // }
    },
    computed: {
      ...mapGetters([
        'carts'
      ]),
      show() {
        let a
        if (!this.good.count) {
          return a = true
        } else {
          return a = false
        }
      }
    },
    watch: {
      // count(){
      //
      // }
    },
    created() {
      this.$nextTick(() => {
          if (!this.good.count) {
            Vue.set(this.good, 'count', 0)
          }
      })
    },
    methods: {
      ...mapMutations({
        setCarts: 'SET_CARTS'
      }),
      addcart(event, item) {
        this.good.count++
        if (!this.carts.includes(item)) {
          this.setCarts(this.good)
        }
        this.$root.eventHub.$emit('cilck', 0)//添加到carts中
      },
      add(event) {
        this.good.count++
      },
      minus(event) {
        this.good.count--
        if (this.good.count === 0) {
          let index = this.carts.indexOf(this.good) //从carts中移除
          this.carts.splice(index, 1)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variable";

  .cartcontrol {
    overflow: hidden;
    color: @base_background;
    margin-right: .1rem;
    .add {
      margin-top: .02rem;
      height: .16rem;
      background: @base_background;
      border-radius: 5px;
      line-height: .16rem;
      p {
        color: whitesmoke;
        font-size: .08rem;
        padding: 0 .1rem;

      }
    }
    .control {
      i {
        display: inline-block;

      }
      p {
        display: inline-block;
        color: #222222;
      }
    }
  }

  .flide-enter, .flide-leave-to {
    opacity: 0;
  }

  .flide-enter-active, .flide-leave-active {
    transition: all .3s ease;
  }


</style>
