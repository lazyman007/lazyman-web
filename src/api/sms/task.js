import request from '@/utils/request'

// 查询短信记录列表
export function listTask(query) {
  return request({
    url: '/smstasks',
    method: 'get',
    params: query
  })
}

// 查询短信记录详细
export function getTask(id) {
  return request({
    url: '/smstasks/' + id,
    method: 'get'
  })
}

// 删除短信记录
export function delTask(id) {
  return request({
    url: '/smstasks/' + id,
    method: 'delete'
  })
}
