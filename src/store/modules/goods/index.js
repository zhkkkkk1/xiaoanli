import { getGoodsList } from '@/api/goods'
const state = {
  goodsList: [],
  total: ''
}
const mutations = {
  getGoodsList (state, payload) {
    state.goodsList = payload.goods
    state.total = payload.total
  }
}
const actions = {
  async getGoodsList (context, data) {
    const res = await getGoodsList(data)
    res.data.data.goods.forEach((item, index) => {
      item.index = index + 1
    })
    context.commit('getGoodsList', res.data.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
