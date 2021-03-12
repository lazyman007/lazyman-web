import request from '@/utils/request'

// 查询菜单列表
export function listMenu(query) {
  return request({
    url: '/sysmenus/treeList',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(id) {
  return request({
    url: '/sysmenus/' + id,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/sysmenus/treePermissionList',
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/sysmenus',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(id, data) {
  return request({
    url: '/sysmenus/' + id,
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu(id) {
  return request({
    url: '/sysmenus/' + id,
    method: 'delete'
  })
}