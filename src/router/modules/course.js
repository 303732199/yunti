/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const courseRouter = {
  path: '/course',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'course',
  meta: {
    title: '课程管理',
    icon: 'table'
  },
  children: [
    {
      path: 'category',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'course_type',
      meta: { title: '课程类型' }
    },
    {
      path: 'chapter',
      component: () => import('@/views/table/drag-table'),
      name: 'course_chapter',
      meta: { title: '课程章节' }
    }
  ]
}
export default courseRouter
