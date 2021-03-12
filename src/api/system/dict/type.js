import request from '@/utils/request'

// 查询字典类型列表
export function listType(query) {
  return request({
    url: '/sysdicts',
    method: 'get',
    params: query
  })
}

// 查询字典类型详细
export function getType(id) {
  return request({
    url: '/sysdicts/' + id,
    method: 'get'
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/sysdicts',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(id, data) {
  return request({
    url: '/sysdicts/' + id,
    method: 'put',
    data: data
  })
}

// 删除字典类型
export function delType(id) {
  return request({
    url: '/sysdicts/' + id,
    method: 'delete'
  })
}

// 清理参数缓存
export function clearCache() {
  return request({
    url: '/sysdicts/clearCache',
    method: 'delete'
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/sysdicts/options',
    method: 'get'
  })
}