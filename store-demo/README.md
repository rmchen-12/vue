# Demo基于vue2.0,vuex,vue-router,axios实现
项目Gif图
![image](https://github.com/rmchen-12/vue-store/blob/master/static/gif/cart.gif)
![image](https://github.com/rmchen-12/vue-store/blob/master/static/gif/store.gif)

### 使用到的库

* vue-cli (vue+webpack脚手架)
* vue-router(路由跳转)
* vuex(状态管理)
* axios(数据请求)
* mock.js(模拟后台数据)
* better-scroll(移动端页面滚动)
* fastclick(解决移动端浏览器 300 毫秒点击延迟问题)
* vue-lazyload(图片懒加载)
* swiper(轮播)
* Less

## 设计布局: 

* HTML5 
* CSS3 
* Less
* rem(阿里用的那套rem算法)
* Flex(弹性布局)
* 动画（vue原生transition实现原生app的效果）

## 数据请求：

* Mock(模拟后台数据)
* Axios(请求数据)


# 总结：

## 随机推荐的实现：
主要为js知识，重点在商品的JSON数据数组化和已加入购物车的商品去重

## 组件间通信：
### 一.
该项目中点击首页商品分类中商品类目跳转到分类页面中相应的侧边栏，首页购物车总价改变，分类页面购物车总价同时改变等功能的实现，可以使用event bus实现，在入口文件main.js中的data中新建eventHub: new Vue()作为一个总线，然后就可以在所有的子组件内使用$emit和$on来进行数据通信。
### 二. 
子组件访问父组件数据，直接使用props即可
### 三. 
父组件可使用ref访问子组件的方法属性
### 四. 
使用vuex统一管理状态

## watch总价的变化,当变为0时时购物车图标隐藏

还有很多小的知识点都在可项目中查阅vue文档，以上为本次项目实现中学到的主要知识点


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
