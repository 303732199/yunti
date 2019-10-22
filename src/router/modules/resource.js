/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const resourceRouter = {
  path: '/resource',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'resource',
  meta: {
    title: '资源管理',
    icon: 'table'
  },
  children: [
    {
      path: 'video',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'video',
      meta: { title: '视频' }
    },
    {
      path: 'message',
      component: () => import('@/views/table/drag-table'),
      name: 'message',
      meta: { title: '短信' }
    }
  ]
}
export default resourceRouter
