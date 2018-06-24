<template>
 <div class="page">
   <headersec tabname="我的地址"></headersec>
   <transition :name="slidename">
     <div class="container" v-show="mainarea">
       <div v-show="!havepage">
         <nopage></nopage>
       </div>
       <div v-show="havepage">
         <div class="address-item" v-for="addressItem in this.$store.state.address" @click="onChooseAddress(addressItem)">
           <p>{{addressItem}}</p>
         </div>
       </div>
     </div>
   </transition>
   <div class="pageBottom" @click="onAddAddress">
     <span class="tabbar-label">新增地址</span>
   </div>
 </div>
</template>

<script>
    import Nopage from "../base/NoPage";
    import Headersec from '../base/HeaderSec';
    import {mapGetters,mapMutations} from 'vuex'
    export default {
      components: {
        Nopage,
        Headersec
      },
      data(){
        return{
          mainarea:false,
          havepage:false,
          slidename:'slide-go'
        }
      },
      computed:{
        ...mapGetters([
          'address',
          'chooseaddress',
          'ischoose',
          'comname'
        ])
      },
      mounted(){
        const that =this;
        that.mainarea = true;
        if(this.$store.state.address.length === 0){
          this.havepage = false;
        }else{
          this.havepage = true
        }
        if(this.$store.state.comname === 'addressadd'){
          this.slidename = 'slide-back'
        }else{
          this.slidename = 'slide-go'
        }
        this.setComname('address')
      },
      methods:{
        ...mapMutations({
          setComname:'SET_COMNAME',
          setChooseaddress:'SET_CHOOSEADDRESS',
          setIschoose:'SET_ISCHOOSE'
        }),
        onAddAddress(){
          this.$router.push('./addaddress')
        },
        onChooseAddress(item){
          if(this.$store.state.ischoose == 1){
            this.setChooseaddress(item);
            this.$router.push('./orderwait');
            this.setIschoose(2)
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  @import '../../../static/less/variable';
  .pageBottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: @theme_background;
    color:@base_color;
    font-size:.28rem;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
  }
  .address-item{
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .28rem;
    text-align: center;
    border: 1px solid #ccc;
  }
</style>
