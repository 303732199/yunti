import Mock from 'mockjs'

const List = []
const count = 12

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id': i+1,
    timestamp: +Mock.Random.date('T'),
    title: '@ctitle(3,5)'
  }))
}

export default [
  {
    url: '/tk/type/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        error_code: 0,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/tk/type/create',
    type: 'post',
    response: _ => {
      return {
        error_code: 0,
        data: 'success'
      }
    }
  },

  {
    url: '/tk/type/update',
    type: 'post',
    response: _ => {
      return {
        error_code: 0,
        data: 'success'
      }
    }
  },

  {
    url: '/tk/type/delete',
    type: 'post',
    response: _ => {
      return {
        error_code: 0,
        data: 'success'
      }
    }
  }
]

