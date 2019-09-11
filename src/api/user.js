import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/index/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/index/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/index/logout',
    method: 'post'
  })
}

// 会员接口
export function getMemList(data) {
  return request({
    url: '/index/membermanage',
    method: 'post',
    data
  })
}

// 会员接口
export function postMemDetails(data) {
  return request({
    url: '/index/memberedit',
    method: 'post',
    data
  })
}

