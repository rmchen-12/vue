import * as types from './mutation-types'

let cartArr = [];
let addressArr = [];
const mutations = {
  [types.SET_GOODS](state,goods){
    state.goods = goods;
  },
  [types.SET_CARTS](state,carts){
    
    cartArr.push(carts);
    state.carts = cartArr;
  },
  [types.SET_ORDERS](state,orders){
    state.orders = orders;
  },
  [types.SET_COMNAME](state,comname){
    state.comname = comname;
  },
  [types.SET_TABINDEX](state,tabindex){
    state.tabindex = tabindex;
  },
  [types.SET_ORDERS](state,ordercur){
    state.orders = ordercur;
  },
  [types.SET_PAYS](state,pays){
    state.pays = pays;
  },
  [types.SET_ORDERCUR](state,ordercur){
    state.ordercur = ordercur;
  },
  [types.SET_ORDERTAB](state,ordertab){
    state.ordertab = ordertab;
  },
  [types.SET_CHOOSEADDRESS](state,chooseaddress){
    state.chooseaddress = chooseaddress
  },
  [types.SET_ADDRESS](state,address){
    addressArr.push(address);
    state.address = addressArr
  },
  [types.SET_ISCHOOSE](state,ischoose){
    state.ischoose = ischoose
  }
}
export default mutations
