/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const financeRouter = {
  path: '/finance',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'finance',
  meta: {
    title: '财务管理',
    icon: 'table'
  },
  children: [
    {
      path: 'income',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'income',
      meta: { title: '收入统计' }
    },
    {
      path: 'invoice',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'invoice',
      meta: { title: '发票' }
    }
  ]
}
export default financeRouter
