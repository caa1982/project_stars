import Vue from 'vue'
import Router from 'vue-router'
import Stars from '@/components/Stars'
import SkyMap from '@/components/SkyMap'
import LandingPage from '@/components/LandingPage'
import Planets from '@/components/Planets'
import PlanetSatelites from '@/components/PlanetSatelites'
import DwarfPlanets from '@/components/DwarfPlanets'
import Exoplanets from '@/components/Exoplanets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
      props: true
    },
    {
      path: '/stars',
      name: 'Stars',
      component: Stars
    },
    {
      path: '/planetSatelites',
      name: 'PlanetSatelites',
      component: PlanetSatelites
    },
    {
      path: '/dwarfPlanets',
      name: 'DwarfPlanets',
      component: DwarfPlanets
    },
    {
      path: '/planets',
      name: 'Planets',
      component: Planets
    },
    {
      path: '/exoplanets',
      name: 'Exoplanets',
      component: Exoplanets
    },
    {
      path: '/skyMap',
      name: 'SkyMap',
      component: SkyMap
    }
  ]
})
