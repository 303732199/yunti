/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orgRouter = {
  path: '/org',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'org',
  meta: {
    title: '机构管理',
    icon: 'table'
  },
  children: [
    {
      path: 'category',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'org_type',
      meta: { title: '机构类型' }
    },
    {
      path: 'chapter',
      component: () => import('@/views/table/drag-table'),
      name: 'org_list',
      meta: { title: '机构列表' }
    }
  ]
}
export default orgRouter
