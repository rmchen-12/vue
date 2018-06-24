<template>
  <div class="address">
    <div class="header">
      <v-header :cartShow="false" tabname="收货地址"></v-header>
      <i class="fa fa-angle-left fa-2x icon" aria-hidden="true" @click="pre"></i>
    </div>
    <div class="content">
      <div class="text" v-show="addresses.length === 0">
        <p>请添加收货地址</p>
      </div>
      <div v-for="(item,index) in addresses" @click.stop="chooseIt(item,index)"
           :class="[index === chooseIndex ? 'choose' : 'addressItem']">
        <p>地址{{index + 1}}: {{item}}</p>
        <div class="icon" @click.stop="_delete(item)">
          <i class="fa fa-times icon" aria-hidden="true"></i>
        </div>
      </div>
      <v-addaddress v-if="showList"></v-addaddress>
    </div>
    <transition name="fade">
      <div class="footer" @click.stop.prevent="selectAddress">
        <span class="change" v-if="!showList">新增地址</span>
        <span class="change" v-if="showList" @click.stop.prevent="onSave">保存</span>
      </div>
    </transition>
    <div class="cover" v-if="showList" @click.stop="hide"></div>
  </div>
</template>

<script>
  import Header from '../base/header'
  import {mapGetters, mapMutations} from 'vuex'
  import AddAddress from './addaddress'

  export default {
    data() {
      return {
        showInfo: false,
        showList: false,
        addressText: '',
        chooseIndex: 0,
        slidename: 'slideRight'
      }
    },
    props: {},
    computed: {
      ...mapGetters([
        'addresses'
      ])
    },
    components: {
      'v-header': Header,
      'v-addaddress': AddAddress
    },
    mounted() {
      this.$root.eventHub.$on('addAddress', val => {
        this.addressText = val
      })
    },
    methods: {
      ...mapMutations({
        addAddress: 'ADD_ADDRESS',
        setAddress: 'SET_ADDRESS'
      }),
      pre() {

        this.$router.go(-1)
      },
      selectAddress() {
        this.showList = true
      },
      onSave() {
        this.addAddress(this.addressText)
        let index = this.addresses.indexOf(this.addressText)
        this.chooseIndex = index
        this.setAddress(this.addresses[index])
        this.showList = false
      },
      hide() {
        this.showList = false
      },
      _delete(item) {
        let index = this.addresses.indexOf(item)
        this.addresses.splice(index, 1)
      },
      chooseIt(item, index) {
        this.chooseIndex = index
        this.setAddress(item)
        setTimeout(() => {
          this.$router.push('/order')
        }, 600)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variable";

  .address {

    .header {
      .icon {
        position: absolute;
        color: whitesmoke;
        top: .05rem;
        left: .12rem;
        z-index: 999;
      }
    }
    .content {
      position: absolute;
      top: .7rem;
      left: 3%;
      right: 3%;
      .text {
        p {
          text-align: center;
        }
      }
      .addressItem {
        height: .5rem;
        line-height: .5rem;
        width: 100%;
        background: lightgray;
        margin-bottom: .1rem;
        p {
          margin-left: .1rem;
          font-size: .2rem;
          font-weight: 500;
          display: inline-block;
        }
        .icon {
          float: right;
          margin: .09rem .1rem 0 0;
          display: inline-block;
        }
      }
      .choose {
        .addressItem();
        background: @base_background;
        color: whitesmoke;
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      height: .5rem;
      background: @base_background;
      width: 100%;
      text-align: center;
      line-height: .5rem;
      .change {
        color: whitesmoke;
        font-size: .2rem;
        font-weight: 800;
      }
    }
    .cover {
      position: fixed;
      width: 100%;
      top: 0;
      bottom: 3.5rem;
      background: rgba(59, 59, 59, .5);
    }
  }

  .fade-enter, .fade-leave-to {
    opacity: 1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease;
  }
</style>
