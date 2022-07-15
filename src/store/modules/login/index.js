const login = {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  }
}

export default login
