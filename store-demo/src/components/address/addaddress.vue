<template>
  <div class="addressList">
    <div class="addressBox">
      <ul>
        <li v-for="(provinceItem,provinceIndex) in addressList"
            @click.stop="onProvinceSelect(provinceIndex,provinceItem.text)"
            :class="{active: provinceIndex === activeProvince}">
          <span>{{provinceItem.text}}</span>
          <div class="cityBox">
            <ul>
              <li v-for="(cityItem,cityIndex) in provinceItem.children"
                  @click.stop="onCitySelect(cityIndex,cityItem.text)" :class="{active: cityIndex === activeCity}">
                <span>{{cityItem.text}}</span>
                <div class="areaBox">
                  <ul>
                    <li v-for="(areaItem,areaIndex) in cityItem.children"
                        @click.stop="onAreaSelect(areaIndex,areaItem.text)" :class="{active: areaIndex == activeArea}">
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
</template>

<script>
  import init_city_picker from '../../../static/js/data.city.js';

  export default {
    data() {
      return {
        addressList: [],
        province: '',
        city: '',
        area: '',
        activeProvince: 0,
        activeCity: 0,
        activeArea: 0,
        addressText: ''
      }
    },
    watch:{
      addressText(val){
        this.$root.eventHub.$emit('addAddress',val)
      }
    },
    mounted() {
      this.addressList = init_city_picker
    },
    methods: {

      /*选择省份*/
      onProvinceSelect: function (index, item) {
        this.activeProvince = index;
        this.province = item;
        this.addressText = this.province;
      },
      /*选择城市*/
      onCitySelect: function (index, item) {
        var that = this;
        that.activeCity = index;
        that.city = item
        that.addressText = that.province + " " + that.city;

      },
      /*选择区域*/
      onAreaSelect: function (index, item) {
        var that = this;
        that.activeArea = index;
        that.area = item
        that.addressText = that.province + " " + that.city + " " + that.area;
      },
      /*保存地址*/
      onSave() {
        this.addAddress(this.addressText);
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/variable';

  .addressBox {
    position: fixed;
    bottom: .5rem;
    left: 0;
    width: 100%;
    height: 3rem;
    z-index: 9;
    background: lightgray;
    display: block!important;
  }

  .addressBox ul {
    width: 33%;
    height: 3rem;
    background: lightgray;
    overflow-y: scroll;
    overflow-x: auto;
  }

  .addressBox li {
    font-size: .26rem;
    height: .3rem;
    line-height: .3rem;
    padding: 0 0 .1rem .1rem
  }

  .cityBox {
    position: absolute;
    top: 0;
    left: 33%;
    width: 100%;
    height: 3rem;
    display: none;
    overflow-y: scroll;
    z-index: 19;
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
  }

  .cityBox ul {
    width: 100%;
    height: 3rem;
  }

  .cityBox li {
    padding-left: .2rem;
    text-align: left;
    border-bottom: 0.01rem solid #e6e6e6;
  }

  .areaBox {
    position: absolute;
    top: 0;
    left: 33%;
    width: 34%;
    height: 5.1rem;
    display: none;
    overflow-y: scroll;
    z-index: 9999;
    -webkit-overflow-scrolling: touch;
  }

  /*点击省份，出现城市*/

  .addressBox .active {
    background: @base_background;
    color: @base_color;
  }

  .addressBox .active .cityBox {
    display: block;
  }
  /*点击城市，出现区域*/

  .cityBox .active {
    background: @base_background;
  }

  .cityBox .active .areaBox {
    display: block;
  }


</style>
