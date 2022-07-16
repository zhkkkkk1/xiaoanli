const getter = {
  token: state => state.login.token,
  total: state => state.users.total,
  userList: state => state.users.userList,
  userlist: state => state.roles.userlist,
  rightTree: state => state.roles.rightTree,
  rightList: state => state.rights.rightList,
  goodsList: state => state.goods.goodsList,
  total1: state => state.goods.total
}
export default getter
