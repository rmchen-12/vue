<template>
  <div class="page">
    <message ref="message"></message>
    <headers tabname="分类"></headers>
    <transition :name="slidename">
      <div class="container flex" id="container" v-show="mainarea" v-cloak>
        <div class="leftbar">
          <div class="barItem" v-for="(menuItem,menuIndex) in menuList">
            <p :class="{active:menuIndex === $store.state.tabindex}" class="menu-text" @click="onBar(menuIndex)">
              {{menuItem.cat_name}}
            </p>
          </div>
        </div>
        <div class="rightContent">
          <div class="rightItem" v-for="categoryItem in categoryContent.cart" @click="onDetail(categoryItem)">
            <div class="category-item flex">
              <div class="item flex detail-item">
                <div class="goods-img">
                  <img v-lazy="categoryItem.GoodsImage"/>
                </div>
                <div class="goods-textBox">
                  <p class="goods-name">{{categoryItem.GoodsName}}</p>
                  <p class="goods-coach">￥{{categoryItem.GoodsPrice}}</p>
                  <div class="goods-cartBox">
                    <img src="../../../static/img/icon/shop_addCart.png" @click.stop="onAddCart(categoryItem)"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <footers :urlRouter="$route.path" :cartnum="cartLength" ref="footer"></footers>
  </div>
</template>

<script>
    import Message from "../base/Message";
    import Footers from '../base/Footer';
    import Headers from '../base/Header';
    import {mapGetters,mapMutations} from 'vuex'
    export default {
      components: {
        Message,
        Footers,
        Headers
      },
      name: "gategory",
      data(){
        return{
          slidename:'slide-back',
          mainarea:false,
          menuList:[],
          categoryList:[],
          categoryContent:[],
          cartLength:0,
        }
      },
      computed:{
        ...mapGetters([
          'tabindex',
          'comname',
          'carts'
        ])
      },
      mounted(){
        this.mainarea=true
        if(this.$store.state.tabindex === undefined){
          this.setTabindex(0)
        }
        this.getMenuList()
        this.getCategoryList()
        if(this.$store.state.comname == 'index'){
          this.slidename = 'slide-go'
        }else{
          this.slidename = 'slide-back'
        }
        this.setComname('category')
      },
      methods:{
        ...mapMutations({
          setTabindex: 'SET_TABINDEX',
          setComname:'SET_COMNAME',
          setGoods:'SET_GOODS',
          setCarts:'SET_CARTS'
        }),
        getMenuList(){
          const that = this;
          this.$http.get('/api/menudata').then((res)=>{
            that.menuList = res.data.data
          })
            .catch((error)=>{
              console.log(error)
            })
        },
        getCategoryList(){
          const that = this;
          this.$http.get('/api/categorydata').then((res)=>{
            that.categoryList = res.data.data;
            that.categoryContent = that.categoryList[0];
          })
            .catch((error)=>{
              console.log(error)
            })
        },
        onBar(index){
          this.setTabindex(index);
          this.categoryContent = this.categoryList[this.$store.state.tabindex]
        },
        onDetail(item){
          this.$router.push('/detail')
          this.setGoods(item)
        },
        onAddCart(item){
          if(!this.$store.state.carts.includes(item)){
            if(!this.$refs.footer.showNum){
              this.setCarts(item);
              this.cartLength = this.$store.state.carts.length;
              this.$refs.footer.showNum = true
            }
          }else{
            this.$refs.message.messageShow = true
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  @import "../../../static/less/variable";
  .leftbar{
    position: fixed;
    left: 0;
    width: 1.8rem;
    font-size: .28rem;
    text-align: center;
    height: 88%;
    border-right: 1px solid #ccc;
  }
  .barItem{
    height: .8rem;
    line-height: .8rem;
    border-bottom: 1px solid #cccccc;
  }
  .rightContent{
    flex: 1;
    margin-left: 1.8rem;
  }
  .rightItem:nth-last-child(1){
    padding-bottom: .9rem;
  }
  .active.menu-text{
    background: @theme_background;
    color:@base_color
  }
  .category-item{
    padding: .2rem 0;
    border-bottom: 1px solid #ccc;
  }
  .detail-item{
    width: 100%;
  }
  .goods-textBox{
    width: 100%;
  }
  .goods-img{
    margin-right: .2rem;
    width: 4rem;
    height: 2rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .goods-name{
    font-size: .28rem;
  }
  .goods-coach{
    font-size: .26rem;
    color: red;
    margin: .2rem 0;
  }
  .goods-cartBox{
    margin-right: .4rem;
    width: .4rem;
    height: .4rem;
    img{
      height: 100%;
      width: 100%;
    }
  }
</style>
