import request from '@/utils/request'

export const categories = (id, sel) => {
  return request({
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}

// eslint-disable-next-line camelcase
export const categoriesTag = ({ id, attrid, attr_name, attr_sel, attr_vals }) => {
  return request({
    url: `categories/${id}/attributes/${attrid}`,
    method: 'PUT',
    data: {
      attr_name, attr_sel, attr_vals
    }
  })
}
