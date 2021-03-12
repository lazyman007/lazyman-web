import request from '@/utils/request'

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/sysroles',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(id) {
  return request({
    url: '/sysroles/' + id,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/sysroles',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(id, data) {
  return request({
    url: '/sysroles/' + id,
    method: 'put',
    data: data
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(id) {
  return request({
    url: '/sysroles/datascope/' + id,
    method: 'get'
  })
}

// 角色数据权限
export function dataScope(id, dataScope, deptIds) {
  const data = {
    dataScope,
    deptIds
  }
  return request({
    url: '/sysroles/datascope/' + id,
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(id, state) {
  const data = {
    state
  }
  return request({
    url: '/sysroles/' + id,
    method: 'patch',
    data: data
  })
}

// 删除角色
export function delRole(id) {
  return request({
    url: '/sysroles/' + id,
    method: 'delete'
  })
}

// 获取角色选择框列表
export function optionselect() {
  return request({
    url: '/sysroles/options',
    method: 'get'
  })
}

// 获取角色菜单权限集合
export function menuPermissions(id) {
  return request({
    url: '/sysroles/menus/' + id,
    method: 'get'
  })
}
