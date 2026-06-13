<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DestinationCard from '../components/DestinationCard.vue'
import SearchBar from '../components/SearchBar.vue'
import ecuadorVideo from '../assets/Ecuador.mp4'
import type { DestinationCardData } from '../components/DestinationCard.vue'
import type { SearchPayload } from '../components/SearchBar.vue'
import galapagosImg from '../assets/fotos_ecuador/galapagos-islands-ecuador-1.webp'
import quitoImg from '../assets/fotos_ecuador/descarga.webp'
import amazoniaImg from '../assets/fotos_ecuador/AdobeStock_1042605634-scaled.webp'



const router = useRouter()
const searchQuery = ref('')

const featuredDestinations: DestinationCardData[] = [
  {
    id: 'galapagos',
    title: 'Galapagos',
    region: 'Region insular',
    image: galapagosImg,
    priceFrom: 890,
    rating: 4.9,
    tag: 'Naturaleza',
    summary: 'Playas volcanicas, fauna unica y experiencias guiadas para viajeros curiosos.',
  },
  {
    id: 'quito',
    title: 'Quito',
    region: 'Sierra norte',
    image: quitoImg,
    priceFrom: 320,
    rating: 4.7,
    tag: 'Cultura',
    summary: 'Centro historico, miradores andinos y gastronomia local en rutas compactas.',
  },
  {
    id: 'amazonas',
    title: 'Amazonia',
    region: 'Selva ecuatoriana',
    image: amazoniaImg,
    priceFrom: 540,
    rating: 4.8,
    tag: 'Aventura',
    summary: 'Navegacion, biodiversidad y lodges sostenibles con acompanamiento local.',
  },
]

function handleSearch(payload: SearchPayload) {
  router.push({
    name: 'search',
    query: {
      q: payload.query,
      category: payload.category,
      budget: payload.budget,
    },
  })
}
</script>

<template>
  <section class="relative overflow-hidden bg-[#122c2b]">
    <video autoplay muted loop playsinline class="absolute inset-0 h-full w-full object-cover opacity-55">
      <source :src="ecuadorVideo" type="video/mp4" />
    </video>
    <div class="absolute inset-0 bg-gradient-to-r from-[#122c2b]/90 via-[#0f9488]/65 to-[#122c2b]/20"></div>

    <div class="page-shell relative z-10 grid min-h-[680px] content-center gap-8 py-16 text-white">
      <div class="max-w-3xl">
        <p class="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-black backdrop-blur">
          Turismo inteligente con IA - Ecuador
        </p>
        <h1 class="text-5xl font-black leading-[1.04] sm:text-6xl lg:text-7xl">
          Descubre Ecuador a tu ritmo.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-white/88">
          Planifica destinos, hoteles, tours y reservas con recomendaciones personalizadas para tu perfil viajero.
        </p>
      </div>

      <div class="max-w-4xl">
        <SearchBar v-model="searchQuery" @search="handleSearch" />
      </div>
    </div>
  </section>

  <section class="page-shell py-14">
    <div class="grid gap-4 md:grid-cols-[1fr_420px] md:items-end">
      <div>
        <p class="text-sm font-black uppercase text-[#ff7a1a]">Destinos destacados</p>
        <h2 class="mt-3 text-4xl font-black leading-tight text-[#122c2b] md:text-5xl">
          Ecuador, en cuatro mundos.
        </h2>
      </div>
      <p class="text-base leading-7 text-[#5d7471]">
        Selva, sierra, costa e islas con itinerarios listos para una primera experiencia MVP.
      </p>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-3">
      <DestinationCard
        v-for="destination in featuredDestinations"
        :key="destination.id"
        :destination="destination"
      />
    </div>
  </section>
</template>
