import Vue from 'vue'
import Router from 'vue-router'

const Index = (resolve) => {
  import('@/components/Index').then((module) => {resolve(module)
  })
}
const Category = (resolve) => {
  import('@/components/Gategory/Gategory').then((module) => {resolve(module)
  })
}
const Cart = (resolve) => {
  import('@/components/Cart/Cart').then((module) => {resolve(module)
  })
}
const Member = (resolve) => {
  import('@/components/Member/Member').then((module) => {resolve(module)
  })
}
const Detail = (resolve) => {
  import('@/components/Detail/Detail').then((module) => {resolve(module)
  })
}
const Orderwait = (resolve) => {
  import('@/components/Order/OrderWait').then((module) => {resolve(module)
  })
}
const Info = (resolve) => {
  import('@/components/Member/Info').then((module) => {resolve(module)
  })
}
const Order = (resolve) => {
  import('@/components/Order/Order').then((module) => {resolve(module)
  })
}
const Address = (resolve) => {
  import('@/components/address/Address').then((module) => {resolve(module)
  })
}
const Waitpay = (resolve) => {
  import('@/components/Order/Waitpay').then((module) => {resolve(module)
  })
}
const Waitdeliver = (resolve) => {
  import('@/components/Order/Waitdeliver').then((module) => {resolve(module)
  })
}
const Waitreceive = (resolve) => {
  import('@/components/Order/Waitreceive').then((module) => {
    resolve(module)
  })
}
const Orderdown = (resolve) => {
  import('@/components/Order/Orderdown').then((module) => {resolve(module)
  })
}
const Addaddress = (resolve) => {
  import('@/components/address/AddAddress').then((module) => {resolve(module)
  })
}



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path:'/index',
      component:Index
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/member',
      component:Member
    },
    {
      path:'/detail',
      component:Detail
    },
    {
      path:'/orderwait',
      component:Orderwait
    },
    {
      path:'/info',
      component:Info
    },
    {
      path:'/address',
      component:Address
    },
    {
      path:'/order',
      component:Order
    },
    {
      path:'/waitpay',
      component:Waitpay
    },
    {
      path:'/waitdeliver',
      component:Waitdeliver
    },
    {
      path:'/waitreceive',
      component:Waitreceive
    },
    {
      path:'/orderdown',
      component:Orderdown
    },
    {
      path:'/addaddress',
      component:Addaddress
    }
  ]
})
