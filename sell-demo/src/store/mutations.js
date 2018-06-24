import * as types from './mutations_types'


export default {
  [types.NEXT_ITEM](state,num){
    state.itemNum += num
  },
  [types.INITIALIZATION](state){
    state.itemNum = 1;
    state.answerId = [];
  },
  [types.REMBER_ANSWER](state,id){
    state.answerId.push(id);
  }
}
