import request from '@/utils/request'

export const categories = ({ type, pagenum, pagesize }) => {
  return request({
    url: 'categories',
    params: {
      type, pagenum, pagesize
    }
  })
}
