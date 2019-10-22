/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const basicConfigRouter = {
  path: '/config',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'config',
  meta: {
    title: '基础设置',
    icon: 'table'
  },
  children: [
    {
      path: 'site',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'config_site',
      meta: { title: '网站' }
    },
    {
      path: 'others',
      component: () => import('@/views/table/drag-table'),
      name: 'config_others',
      meta: { title: '其他' }
    }
  ]
}
export default basicConfigRouter
