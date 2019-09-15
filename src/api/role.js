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

export function apiAdminlist(data) {
  return request({
    url: '/index/admin/adminlist',
    method: 'post',
    data
  })
}

export function apiAdminedit(data) {
  return request({
    url: '/index/admin/adminedit',
    method: 'post',
    data
  })
}

export function apiAdminrolelist(data) {
  return request({
    url: '/index/admin/adminrolelist',
    method: 'post',
    data
  })
}

export function apiAdminadd(data) {
  return request({
    url: '/index/admin/adminadd',
    method: 'post',
    data
  })
}

export function apiSettingRead(data) {
  return request({
    url: '/index/setting/read',
    method: 'post',
    data
  })
}

export function apiSettingEdit(data) {
  return request({
    url: '/index/setting/edit',
    method: 'post',
    data
  })
}



