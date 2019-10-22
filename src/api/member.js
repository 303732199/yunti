import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/member/list',
    method: 'get',
    params: query
  })
}

// 添加
export function create(id) {
  return request({
    url: '/member/create',
    method: 'post',
    params: { id }
  })
}
// 添加
export function save(id, title) {
  return request({
    url: '/member/update',
    method: 'post',
    params: { id, title }
  })
}

// 删除支持批量删除和单个删除
export function del(id) {
  return request({
    url: '/member/delete',
    method: 'post',
    params: { id }
  })
}

