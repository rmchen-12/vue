import * as types from './mutation-types'
const cartArr = []
const addressArr = []
const orderArr = []
const mutations = {
  // 购物车
  [types.SET_CARTS](state,carts){
    cartArr.push(carts)
    state.carts = cartArr
  },
  //详情页
  [types.SET_GOODS](state,good){
    state.goods = good
  },
  //设置地址
  [types.SET_ADDRESS](state,address){
    state.address = address
  },
  //添加地址
  [types.ADD_ADDRESS](state,address){
    addressArr.push(address)
    state.addresses = addressArr
  },
  //完成订单
  [types.ADD_ORDERS](state,order){
    orderArr.push(order)
    state.orders = orderArr
  },
  [types.RESET_CARTS](state){
    state.carts = []
  }
}
export default mutations
