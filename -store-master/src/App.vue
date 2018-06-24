<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
  import '../static/js/rem';
export default {
  name: 'App'
}
</script>

<style lang="less">
@import '../static/less/base.less';
#app {
  height: 100%;
}
</style>
