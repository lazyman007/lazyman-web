import request from '@/utils/request'

// 查询短信通道列表
export function listChannel(query) {
  return request({
    url: '/smschannels',
    method: 'get',
    params: query
  })
}

// 查询短信通道详细
export function getChannel(id) {
  return request({
    url: '/smschannels/' + id,
    method: 'get'
  })
}

// 新增短信通道
export function addChannel(data) {
  return request({
    url: '/smschannels',
    method: 'post',
    data: data
  })
}

// 修改短信通道
export function updateChannel(id, data) {
  return request({
    url: '/smschannels/' + id,
    method: 'put',
    data: data
  })
}

// 删除短信通道
export function delChannel(id) {
  return request({
    url: '/smschannels/' + id,
    method: 'delete'
  })
}

// 获取短信通道选择框列表
export function optionselect() {
  return request({
    url: '/smschannels/options',
    method: 'get'
  })
}
