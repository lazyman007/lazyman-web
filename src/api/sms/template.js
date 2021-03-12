import request from '@/utils/request'

// 查询短信模板列表
export function listTemplate(query) {
  return request({
    url: '/smstemplates',
    method: 'get',
    params: query
  })
}

// 查询短信模板详细
export function getTemplate(id) {
  return request({
    url: '/smstemplates/' + id,
    method: 'get'
  })
}

// 新增短信模板
export function addTemplate(data) {
  return request({
    url: '/smstemplates',
    method: 'post',
    data: data
  })
}

// 修改短信模板
export function updateTemplate(id, data) {
  return request({
    url: '/smstemplates/' + id,
    method: 'put',
    data: data
  })
}

// 删除短信模板
export function delTemplate(id) {
  return request({
    url: '/smstemplates/' + id,
    method: 'delete'
  })
}

// 获取短信模板选择框列表
export function optionselect() {
  return request({
    url: '/smstemplates/options',
    method: 'get'
  })
}
