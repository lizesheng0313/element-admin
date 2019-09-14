import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/index/adminrole/listinfo',
    method: 'post',
  })
}

export function apiRoleEdit(data) {
  return request({
    url: '/index/adminrole/edit',
    method: 'post',
    data
  })
}

export function apiRuleAdd(data) {
  return request({
    url: '/index/adminrole/add',
    method: 'post',
    data
  })
}

export function apiRuleRead(data) {
  return request({
    url: '/index/adminrole/read',
    method: 'post',
    data
  })
}

export function apiAdminlog(data) {
  return request({
    url: '/index/adminlog',
    method: 'post',
    data
  })
}

