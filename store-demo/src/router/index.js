import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => {
  import('../views/home').then(module => {
    resolve(module)
  })
}
const Cart = resolve => {
  import('../views/cart').then(module => {
    resolve(module)
  })
}
const Category = resolve => {
  import('../views/category').then(module => {
    resolve(module)
  })
}
const Personal = resolve => {
  import('../views/personal').then(module => {
    resolve(module)
  })
}
const Order = resolve => {
  import('../components/order').then(module => {
    resolve(module)
  })
}
const Address = resolve => {
  import('../components/address').then(module => {
    resolve(module)
  })
}
const FinishedOrder = resolve => {
  import('../components/finishedOrder').then(module => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    }, {
      path: '/home',
      component: Home
    }, {
      path: '/cart',
      component: Cart
    }, {
      path: '/category',
      component: Category
    }, {
      path: '/personal',
      component: Personal
    },
    {
      path:'/order',
      component:Order
    },
    {
      path:'/address',
      component:Address
    },
    {
      path:'/finishedOrder',
      component:FinishedOrder
    }
  ]
})
