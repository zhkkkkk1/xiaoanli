const getter = {
  token: state => state.login.token,
  total: state => state.users.total,
  userList: state => state.users.userList,
  userlist: state => state.roles.userlist,
  rightTree: state => state.roles.rightTree
}
export default getter
