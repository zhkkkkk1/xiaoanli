import request from '@/utils/request'

export const getGoodsList = ({ query, pagenum = 1, pagesize = 5 }) => {
  return request({
    url: 'goods',
    params: {
      query, pagenum, pagesize
    }
  })
}
