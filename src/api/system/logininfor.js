import request from '@/utils/request'

// 查询登录日志列表
export function list(query) {
  return request({
    url: '/sysloginlogs',
    method: 'get',
    params: query
  })
}

// 删除登录日志
export function delLogininfor(id) {
  return request({
    url: '/sysloginlogs/' + id,
    method: 'delete'
  })
}

// 清空登录日志
export function cleanLogininfor() {
  return request({
    url: '/sysloginlogs',
    method: 'delete'
  })
}
