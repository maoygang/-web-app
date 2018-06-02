import Vue from 'vue'
import Router from 'vue-router'
import Movie from 'components/movie/movie'
import Book from 'components/book/book'
import Broadcast from 'components/broadcast/broadcast'
import Group from 'components/group/group'
import Expand from 'components/expand/expand'
import Detail from 'components/detail/detail'
import classifyExpand from 'components/classify-expand/classify-expand'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/movie'
    },
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: 'in_theaters',
          component: Expand,
          children: [
            {
              path: ':id',
              component: Detail
            }
          ]
        },
        {
          path: 'coming_soon',
          component: Expand,
          children: [
            {
              path: ':id',
              component: Detail
            }
          ]
        },
        {
          path: 'top250',
          component: Expand,
          children: [
            {
              path: ':id',
              component: Detail
            }
          ]
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: ':num',
          components: {
            classify: classifyExpand
          },
          children: [
            {
              path: ':id',
              component: Detail
            }
          ]
        }
      ]
    },
    {
      path: '/book',
      component: Book
    },
    {
      path: '/broadcast',
      component: Broadcast
    },
    {
      path: '/group',
      component: Group
    }
  ]
})
