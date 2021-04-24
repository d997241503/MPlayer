import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Index = () => import('@/views/index/Index.vue')
const Artist = () => import('@/views/artist/Artist.vue')
const ArtistRouter = () => import('@/views/artist/ArtistRouter.vue')
const ArtistDetail = () => import('@/views/artist/ArtistDetail.vue')
const Toplist = () => import('@/views/toplist/Toplist.vue')
const IndexRouter = () => import('@/views/index/IndexRouter.vue')
const PlayList = () => import('@/views/index/PlayList.vue')
const Search = () => import('@/views/search/Search.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index-router',
    children: [
        {
          path: 'index-router',
          component: IndexRouter,
          redirect: '/index-router/index',
          children: [
            {
              path: 'index',
              component: Index,
            },
            {
              path: 'playlist',
              component: PlayList
            }
          ]
        },
        {
          path: 'artist-router',
          component: ArtistRouter,
          redirect: '/artist-router/artist',
          children: [
            {
              path: 'artist',
              component: Artist
            },
            {
              path: 'artist-detail',
              component: ArtistDetail
            }
          ]
        },
        {
          path: 'toplist',
          component: Toplist
        },
        {
          path: 'search',
          component: Search
        }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
