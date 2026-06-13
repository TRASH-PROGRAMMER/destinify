<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import DestinationCard from '../components/DestinationCard.vue'
import HotelCard from '../components/HotelCard.vue'
import SearchBar from '../components/SearchBar.vue'
import TourCard from '../components/TourCard.vue'
import type { DestinationCardData } from '../components/DestinationCard.vue'
import type { HotelCardData } from '../components/HotelCard.vue'
import type { SearchPayload } from '../components/SearchBar.vue'
import type { TourCardData } from '../components/TourCard.vue'
import cuencaImg from '../assets/fotos_ecuador/IMG_7099_11zon.webp'
import banosImg from '../assets/fotos_ecuador/05.webp'

const route = useRoute()
const query = ref(String(route.query.q ?? ''))
const lastSearch = ref('Todos los resultados')

const destinations: DestinationCardData[] = [
  {
    id: 'cuenca',
    title: 'Cuenca',
    region: 'Sierra sur',
    image: cuencaImg,
    priceFrom: 280,
    rating: 4.6,
    tag: 'Patrimonio',
    summary: 'Arquitectura colonial, museos, mercados y rutas hacia el Cajas.',
  },
  {
    id: 'banos',
    title: 'Banos',
    region: 'Tungurahua',
    image: banosImg,
    priceFrom: 250,
    rating: 4.7,
    tag: 'Aventura',
    summary: 'Cascadas, aguas termales, bicicleta y actividades para viajeros activos.',
  },
]

const hotels: HotelCardData[] = [
  {
    id: 'hotel-andino',
    name: 'Hotel Boutique Andino',
    location: 'Quito',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    pricePerNight: 78,
    rating: 4.8,
    amenities: ['Desayuno', 'Centro historico', 'Wifi'],
  },
  {
    id: 'lodge-selva',
    name: 'Lodge Selva Clara',
    location: 'Amazonia',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
    pricePerNight: 132,
    rating: 4.9,
    amenities: ['Guia local', 'Traslado', 'Pension completa'],
  },
]

const tours: TourCardData[] = [
  {
    id: 'centro-quito',
    title: 'Ruta cultural por el Centro Historico',
    place: 'Quito',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=900&q=80',
    duration: '4 horas',
    price: 42,
    difficulty: 'Ligero',
  },
  {
    id: 'cajas',
    title: 'Senderismo guiado en Parque Nacional Cajas',
    place: 'Cuenca',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
    duration: '1 dia',
    price: 68,
    difficulty: 'Moderado',
  },
]

function handleSearch(payload: SearchPayload) {
  lastSearch.value = `${payload.category} - ${payload.budget}`
}
</script>

<template>
  <section class="page-shell py-10">
    <div class="grid gap-5">
      <div>
        <p class="text-sm font-black uppercase text-[#ff7a1a]">Busqueda inteligente</p>
        <h1 class="mt-3 text-4xl font-black text-[#122c2b]">Resultados para tu viaje</h1>
        <p class="mt-3 text-[#5d7471]">{{ lastSearch }}</p>
      </div>
      <SearchBar v-model="query" @search="handleSearch" />
    </div>

    <section class="mt-10">
      <h2 class="text-2xl font-black text-[#122c2b]">Destinos</h2>
      <div class="mt-5 grid gap-6 lg:grid-cols-2">
        <DestinationCard v-for="destination in destinations" :key="destination.id" :destination="destination" />
      </div>
    </section>

    <section class="mt-12">
      <h2 class="text-2xl font-black text-[#122c2b]">Hoteles recomendados</h2>
      <div class="mt-5 grid gap-6 lg:grid-cols-2">
        <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" />
      </div>
    </section>

    <section class="mt-12">
      <h2 class="text-2xl font-black text-[#122c2b]">Tours y actividades</h2>
      <div class="mt-5 grid gap-6">
        <TourCard v-for="tour in tours" :key="tour.id" :tour="tour" />
      </div>
    </section>
  </section>
</template>
