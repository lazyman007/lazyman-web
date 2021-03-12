import request from '@/utils/request'

// 查询参数列表
export function listConfig(query) {
  return request({
    url: '/sysconfigs',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getConfig(id) {
  return request({
    url: '/sysconfigs/' + id,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/sysconfigs/configKey/' + configKey,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(data) {
  return request({
    url: '/sysconfigs',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateConfig(id, data) {
  return request({
    url: '/sysconfigs/' + id,
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delConfig(id) {
  return request({
    url: '/sysconfigs/' + id,
    method: 'delete'
  })
}

// 清理参数缓存
export function clearCache() {
  return request({
    url: '/sysconfigs/clearCache',
    method: 'delete'
  })
}
