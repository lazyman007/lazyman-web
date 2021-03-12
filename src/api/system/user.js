import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/lazyman";

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/sysusers',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(id) {
  return request({
    url: '/sysusers/' + id,
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/sysusers',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(id, data) {
  return request({
    url: '/sysusers/' + id,
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(id) {
  return request({
    url: '/sysusers/' + id,
    method: 'delete'
  })
}

// 用户密码重置
export function resetUserPwd(id, password) {
  const data = {
    password
  }
  return request({
    url: '/sysusers/resetPwd/' + id,
    method: 'patch',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(id, state) {
  const data = {
    state
  }
  return request({
    url: '/sysusers/' + id,
    method: 'patch',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/sysusers/uc/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/sysusers/uc/profile',
    method: 'patch',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/sysusers/uc/updatePwd',
    method: 'patch',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/sysusers/uc/uploadAvatar',
    method: 'post',
    data: data
  })
}
