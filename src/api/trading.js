import request from '@/utils/request'

export function apiTradingList(data) {
  return request({
    url: '/index/trading/lists',
    method: 'post',
    data
  })
}
