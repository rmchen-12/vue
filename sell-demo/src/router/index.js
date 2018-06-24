import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/Home'
import Item from '../page/Item'
import Score from '../page/Score'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },{
      path:'/Item',
      component:Item
    },{
      path:'/Score',
      component:Score
    }
  ]
})
