/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  name: 'order',
  meta: {
    title: '订单管理',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'order_list',
      meta: { title: '订单列表' }
    }
  ]
}
export default orderRouter
