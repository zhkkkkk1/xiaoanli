import { getRightsList } from '@/api/rights'
const state = {
  rightList: []
}
const mutations = {
  setrightList (state, payload) {
    state.rightList = payload
  }
}
const actions = {
  async getRightsList (context, data) {
    const res = await getRightsList(data)
    res.data.data.forEach((item, index) => {
      item.index = index + 1
    })
    context.commit('setrightList', res.data.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
