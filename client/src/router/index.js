import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PlayerInfo from '@/components/PlayerInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:name',
      name: 'PlayerInfo',
      props: true,
      component: PlayerInfo
    }
  ]
})
