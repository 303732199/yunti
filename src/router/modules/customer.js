/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const customerRouter = {
  path: '/user',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'user',
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  children: [
    {
      path: 'admin',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'user_admin',
      meta: { title: '管理员管理' }
    },
    {
      path: 'member',
      component: () => import('@/views/table/drag-table'),
      name: 'user_member',
      meta: { title: '会员管理' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    }
  ]
}
export default customerRouter
