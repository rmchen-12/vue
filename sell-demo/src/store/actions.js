import * as types from './mutations_types'

export default {
  initialization({commit}){
    commit(types.INITIALIZATION)
  },
  nextItem({commit,state},id){
    commit(types.REMBER_ANSWER,id);
    if (state.itemNum < state.itemDetails.length){
      commit(types.NEXT_ITEM,1)
    }
  }
}
