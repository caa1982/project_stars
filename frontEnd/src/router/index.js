import Vue from 'vue'
import Router from 'vue-router'
import Stars from '@/components/Stars'
import SkyMap from '@/components/SkyMap'
import LandingPage from '@/components/LandingPage'
import Planets from '@/components/Planets'
import PlanetSatelites from '@/components/PlanetSatelites'
import DwarfPlanets from '@/components/DwarfPlanets'
import Exoplanets from '@/components/Exoplanets'
import SearchBar from '@/components/SearchBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
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
    },
    {
      path: '/searchBar',
      name: 'SearchBar',
      component: SearchBar
    }
  ]
})
