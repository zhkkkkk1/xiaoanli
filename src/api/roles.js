import request from '@/utils/request'

/**
 * 获取角色列表
 * @returns
 */
export const userList = () => {
  return request({
    url: 'roles'
  })
}

export const tree = () => {
  return request({
    url: 'rights/tree'
  })
}
