import { getUserList, changeUserState } from '@/api/user'
import { Message } from 'element-ui'

const state = {
  userList: [],
  total: ''
}
const mutations = {
  getUserList (state, payload) {
    state.userList = payload.users
    state.total = payload.total
  },
  updataUserList (state, payload) {
    try {
      state.userList.forEach(item => {
        if (item.id === payload.id) {
          if (payload.type === 0) {
            item.ms_state = false
          } else if (payload.type === 1) {
            item.ms_state = true
          }
        }
      })
      Message.success('更改用户状态成功')
    } catch (err) {
      console.log(err)
      Message.error('更改用户状态失败')
    }
  }
}
const actions = {
  // 获取用户列表
  async getUserList (context, obj) {
    const res = await getUserList(obj)
    res.data.data.users.forEach((item, index) => {
      item.index = index + 1
    })
    context.commit('getUserList', res.data.data)
  },
  // 改变用户状态
  async changeUserState (context, data) {
    // 0错1对
    const res = await changeUserState(data.id, data.type)
    res.data.data.id === 0 ? context.commit('updataUserList', data) : context.commit('updataUserList', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
