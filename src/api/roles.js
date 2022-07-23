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

// 删除角色指定权限
export const delRolesRight = ({ roleId, rightId }) => {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'DELETE'
  })
}
