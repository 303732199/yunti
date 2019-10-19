/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tkRouter = {
  path: '/tk',
  component: Layout,
  name: 'tk',
  meta: {
    title: '题库管理',
    icon: 'table'
  },
  children: [
    {
      path: 'type',
      component: () => import('@/views/tk/type'),
      name: 'tk_type',
      meta: { title: '题型管理' }
    },
    {
      path: 'knowledge_points',
      component: () => import('@/views/tk/knowledge_points'),
      name: 'knowledge_points',
      meta: { title: '知识点管理' }
    },
    {
      path: 'difficult',
      component: () => import('@/views/tk/difficult'),
      name: 'difficult',
      meta: { title: '难度分类' }
    },
    {
      path: 'list',
      component: () => import('@/views/tk/index'),
      name: 'tk_list',
      meta: { title: '题目管理' }
    }
  ]
}
export default tkRouter
