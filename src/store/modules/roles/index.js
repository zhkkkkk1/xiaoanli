import { userList, tree } from '@/api/roles'
const state = {
  userlist: '',
  rightTree: []
}
const mutations = {
  setUserList (state, payload) {
    state.userlist = payload
  },
  setRightTree (state, payload) {
    state.rightTree = payload
  }
}
const actions = {
  async userList (context) {
    const res = await userList()
    context.commit('setUserList', res.data.data)
    res.data.data.forEach((item, index) => {
      item.index = index + 1
    })
  },
  async tree (context) {
    const res = await tree()
    context.commit('setRightTree', res.data.data)
    console.log(res.data.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
