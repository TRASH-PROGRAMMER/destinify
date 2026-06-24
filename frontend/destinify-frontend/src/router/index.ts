import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import ChatAssistantView from '../views/ChatAssistantView.vue'
import ItineraryView from '../views/ItineraryView.vue'
import HomeView from '../views/HomeView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import ProfileView from '../views/ProfileView.vue'
import SearchView from '../views/SearchView.vue'
import ReservationsView from '../views/ReservationsView.vue'
import DestinationView from '../views/DestinationView.vue'
import ServiceView from '../views/ServiceView.vue'
import OnboardingView from '../views/OnboardingView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/registro',
    name: 'onboarding',
    component: OnboardingView,
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'home',
        redirect: { name: 'home' },
      },
      {
        path: 'buscar',
        name: 'search',
        component: SearchView,
      },
      {
        path: 'search',
        redirect: { name: 'search' },
      },
      {
        path: 'perfil',
        name: 'profile',
        component: ProfileView,
      },
      {
        path: 'profile',
        redirect: { name: 'profile' },
      },
      {
        path: 'reservas',
        name: 'reservations',
        component: ReservationsView,
      },
      {
        path: 'reservations',
        redirect: { name: 'reservations' },
      },
      {
        path: 'asistente',
        name: 'chat',
        component: ChatAssistantView,
      },
      {
        path: 'chat',
        redirect: { name: 'chat' },
      },
      {
        path: 'itinerario',
        name: 'itinerary',
        component: ItineraryView,
      },
      {
        path: 'itinerary',
        redirect: { name: 'itinerary' },
      },
      {
        path: 'destino/:id?',
        name: 'destination',
        component: DestinationView,
      },
      {
        path: 'destination/:id?',
        redirect: (to) => ({ name: 'destination', params: to.params }),
      },
      {
        path: 'servicio/:id?',
        name: 'service',
        component: ServiceView,
      },
      {
        path: 'service/:id?',
        redirect: (to) => ({ name: 'service', params: to.params }),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
