import * as types from './mutation-types'

const mutations = {
  [types.SET_EXPAND] (state, expand) {
    state.expand = expand
  },
  [types.SET_DES] (state, des) {
    state.des = des
  }
}

export default mutations
