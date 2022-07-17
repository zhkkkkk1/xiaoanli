import request from '@/utils/request'

/**
 * 用户管理
 * @param {query,pagenum,pagesize} 查询参数,当前页码,每页显示条数
 * @returns
 */
export const getUserList = ({ query, pagenum = 1, pagesize = 5 }) => {
  return request({
    url: 'users',
    params: {
      query, pagenum, pagesize
    }
  })
}

/**
 * 更改用户状态
 * @param {用户id} id
 * @param {用户状态} type
 * @returns
 */
export const changeUserState = (id, type) => {
  return request({
    method: 'PUT',
    url: `users/${id}/state/${type}`
  })
}

/**
 * 编辑用户信息
 * @param {用户id} id
 * @returns
 */
export const editUser = ({ id, mobile = '', email = '' }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      mobile, email
    }
  })
}

/**
 * 删除用户
 * @param {*} id
 * @returns
 */
export const delUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}

/**
 * 添加用户
 * @param {} param0
 * @returns
 */
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: {
      username, password, email, mobile
    }
  })
}
