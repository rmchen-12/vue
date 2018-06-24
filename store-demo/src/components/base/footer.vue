<template>
  <div class="footer flex flex-around">
    <router-link to="/home" class="home" tag="div">
      <i class="fa fa-home fa-2x" aria-hidden="true"></i>
      <p>首页</p>
    </router-link>
    <router-link to="/category" class="category" tag="div">
      <i class="fa fa-list fa-2x" aria-hidden="true"></i>
      <p>分类</p>
    </router-link>
    <router-link to="/personal" class="personal" tag="div">
      <i class="fa fa-user fa-2x" aria-hidden="true"></i>
      <p>我的</p>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "footer"
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variable";

  .footer {
    z-index: 999;
    position: fixed;
    width: 100%;
    bottom: 0;
    height: .5rem;
    color: gray;
    .home {
      display: inline-block;
      i {
      }
      p {
        font-weight: 700;
        text-align: center;
        font-size: .12rem;

      }
    }
    .category {
      display: inline-block;
      i {
      }
      p {
        font-weight: 700;
        text-align: center;
        font-size: .12rem;
      }
    }
    .personal {
      display: inline-block;
      i {
      }
      p {
        font-weight: 700;
        text-align: center;
        font-size: .12rem;
      }
    }
  }
  .router-link-active{
    color: @base_background;
  }
</style>
