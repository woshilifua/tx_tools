import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NationHeatMap from '../views/HeatMap/Nation.vue'
import NationDistributionMap from '../views/Distribution/Nation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/hot-map/nation',
    name: 'nationHotMap',
    component: NationHeatMap
  },
  {
    path: '/distribution-map/nation',
    name: 'nationDistributionMap',
    component: NationDistributionMap
  }

]

const router = new VueRouter({
  routes
})

export default router
