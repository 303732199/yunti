import Mock from 'mockjs'

const List = []
const count = 3

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id': i+1,
    timestamp: +Mock.Random.date('T'),
    'title|1': ['简单', '中等', '困难']
  }))
}

export default [
  {
    url: '/difficult/list',
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
    url: '/difficult/create',
    type: 'post',
    response: _ => {
      return {
        error_code: 0,
        data: 'success'
      }
    }
  },

  {
    url: '/difficult/update',
    type: 'post',
    response: _ => {
      return {
        error_code: 0,
        data: 'success'
      }
    }
  },

  {
    url: '/difficult/delete',
    type: 'post',
    response: _ => {
      return {
        error_code: 0,
        data: 'success'
      }
    }
  }
]

