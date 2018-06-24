<template>
  <div class="page">
    <headersec tabname="添加地址"></headersec>
    <transition :name="slidename">
      <div class="container" v-show="mainarea">
        <input type="text" placeholder="选择地区" :value="addressText" readonly="" @click="addressModel = true"/>
        <div class="model" v-show="addressModel" @click="addressModel = false">
          <div class="model-content" @click.stop="addressModel = true">
            <div class="addressBox">
              <ul>
                <li v-for="(provinceItem,provinceIndex) in addressList" @click.stop="onProvinceSelect(provinceIndex,provinceItem.text)" :class="{active:provinceIndex === activeProvince}">
                  <span>{{provinceItem.text}}</span>
                  <div class="cityBox">
                    <ul>
                      <li v-for="(cityItem,cityIndex) in provinceItem.children" @click.stop="onCitySelect(cityIndex,cityItem.text)" :class="{active:cityIndex === activeCity}">
                        <span>{{cityItem.text}}</span>
                        <div class="areaBox">
                          <ul>
                            <li v-for="(areaItem,areaIndex) in cityItem.children" @click.stop='onAreaSelect(areaIndex,areaItem.text)' :class='{active:areaIndex == activeArea}'>
                              <span>{{areaItem.text}}</span>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="pageBottom" @click="onSave">
      <span class="tabber-label">保存</span>
    </div>
  </div>
</template>

<script>
    import Headersec from "../base/HeaderSec";
    import init_city_picker from '../../../static/js/data.city'
    import {mapGetters,mapMutations} from 'vuex'
    export default {
      components: {
        Headersec
      },
      data(){
        return{
          addressModel:false,
          mainarea:false,
          slidename:'slide-go',
          addressText:'请选择',
          addressList:[],
          activeArea:0,
          activeCity:0,
          activeProvince:0,
          province:'',
          city:'',
          area:''
        }
      },
      mounted(){
        this.mainarea = true;
        this.addressList = init_city_picker;
        this.setComname('addressadd')
      },
      methods:{
        ...mapMutations({
          setComname:'SET_COMNAME',
          setAddress:'SET_ADDRESS'
        }),
        onProvinceSelect(index,item){
          var that = this;
          that.activeProvince = index;
          that.province = item;
          that.addressText = that.province;
        },
        onCitySelect(index,item){
          var that = this;
          that.activeCity = index;
          that.city = item;
          that.addressText = that.province + ' ' +that.city;
        },
        onAreaSelect(index,item){
          var that = this;
          that.activeArea = index;
          that.area = item;
          that.addressText = that.province + ' ' +that.city+ ' '+that.area;
          that.addressModel = false
        },
        onSave(){
          this.setAddress(this.addressText);
          this.$router.back()
        }
      }
    }
</script>

<style lang="less" scoped>
  @import "../../../static/less/variable";
  .addressBox{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 5.1rem;
    z-index:9;
    display: block !important;
    background: #f5f5f5;
  }
  .addressBox ul{
    width: 33%;
    height: 5.1rem;
    background: @base_color;
    overflow-y: scroll;
    overflow-x: auto;
  }
  .addressBox li{
    font-size: .26rem;
    height: .62rem;
    line-height: .62rem;
    color: @base_textColor;
    text-align: left;
    padding-left: .5rem;
  }
  .cityBox{
    position: absolute;
    top:0;
    left: 33%;
    width: 100%;
    height: 5.1rem;
    display: none;
    overflow-y: scroll;
    z-index: 19;
    overflow-x: auto;
    ul{
      width: 100%;
      height: 5.1rem;
    }
    li{
      padding-left: .17rem;
      text-align: left;
      border-bottom:.01rem solid #e6e6e6;
    }
  }
  .areaBox{
    position: absolute;
    top:0;
    left: 33%;
    width: 35%;
    height: 5.1rem;
    display: none;
    overflow-y: scroll;
    z-index: 999;
  }
  .model-content{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: .5rem;
    margin: auto;
    background: #ffffff;
    text-align: center;
  }
  input{
    font-size: .32rem;
    width: 100%;
    text-align: center;
    margin-top: .3rem;
    border:none;

  }
  /*点击省份，出现城市*/
  .addressBox .active{
    background: @theme_background;
    color:@base_color;
  }
  .addressBox .active .cityBox{
    display: block;
  }
  /*点击城市出现区域*/

  .cityBox .active .areaBox{
    display: block;
  }
  .pageBottom{
    position: fixed;
    bottom: 0;
    background: @theme_background;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    color:@base_color;
    font-size: .28rem;
    text-align: center;
  }

</style>
