import Vue from 'vue'
import VueRouter from 'vue-router'
import First from '@/views/First'
import { Toast } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/first/one'
  },
  {
    path: '/first/one',
    name: 'first',
    component: First,
    children: [
      {
        path: '/first/one',
        component: () => import('@/views/First/one')
      }, {
        path: '/first/three',
        component: () => import('@/views/First/three')
      }, {
        path: '/first/four',
        component: () => import('@/views/First/four')
      }, {
        path: '/first/five',
        component: () => import('@/views/First/five')
      },
      {
        path: '/first/six',
        component: () => import('@/views/First/sixth')
      }
    ]
  },
  {
    path: '/seventh',
    component: () => import('@/views/Seventh'),
    meta: {
      iscy: true
    }
  },
  {
    path: '/searchDetail',
    component: () => import('@/views/SearchDetail'),
    children: [
      {
        path: '/searchDetail/one',
        component: () => import('@/views/SearchDetail/one')
      },
      {
        path: '/searchDetail/two',
        component: () => import('@/views/SearchDetail/two')
      },
      {
        path: '/searchDetail/three',
        component: () => import('@/views/SearchDetail/three')
      },
      {
        path: '/searchDetail/four',
        component: () => import('@/views/SearchDetail/four')
      }
    ]
  },
  {
    name: 'playlist',
    path: '/playlist:id',
    component: () => import('@/views/Playlist'),
    children: [
      {
        name: 'list',
        path: '/playlist:id/list',
        component: () => import('@/playlist/list')
      },
      {
        name: 'comment',
        path: '/playlist:id/comment',
        component: () => import('@/playlist/comment')
      },
      {
        name: 'collector',
        path: '/playlist:id/collector',
        component: () => import('@/playlist/collector')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return {
  //       x: 0,
  //       y: 0
  //     }
  //   }
  // },
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.iscy) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      Toast('你还没有登录哦')
    }
  } else {
    next()
  }
})

export default router
