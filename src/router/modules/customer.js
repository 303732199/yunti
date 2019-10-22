/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const customerRouter = {
  path: '/user',
  component: Layout,
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  children: [
    {
      path: 'role',
      component: () => import('@/views/user/role'),
      name: 'admin_role',
      meta: { title: '角色' }
    },
    {
      path: 'admin',
      component: () => import('@/views/user/admin'),
      name: 'admin_list',
      meta: { title: '管理员' }
    },
    {
      path: 'member',
      component: () => import('@/views/user/members'),
      name: 'member',
      meta: { title: '会员' }
    }
  ]
}
export default customerRouter
