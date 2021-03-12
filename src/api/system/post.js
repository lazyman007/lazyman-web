import request from '@/utils/request'

// 查询岗位列表
export function listPost(query) {
  return request({
    url: '/sysposts',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getPost(id) {
  return request({
    url: '/sysposts/' + id,
    method: 'get'
  })
}

// 新增岗位
export function addPost(data) {
  return request({
    url: '/sysposts',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(id, data) {
  return request({
    url: '/sysposts/' + id,
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPost(id) {
  return request({
    url: '/sysposts/' + id,
    method: 'delete'
  })
}

// 获取岗位选择框列表
export function optionselect() {
  return request({
    url: '/sysposts/options',
    method: 'get'
  })
}
