<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface DestinationDetail {
  id: string
  title: string
  region: string
  image: string
  description: string
  weather: string
  bestTime: string
  activities: string[]
  gallery: string[]
}

const route = useRoute()

const destinations: DestinationDetail[] = [
  {
    id: 'galapagos',
    title: 'Galapagos',
    region: 'Region insular',
    image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?auto=format&fit=crop&w=1600&q=80',
    description:
      'Un destino para explorar playas volcanicas, fauna endemica y rutas marinas con cupos controlados.',
    weather: '26 C, brisa marina',
    bestTime: 'Junio a noviembre',
    activities: ['Snorkel guiado', 'Isla Santa Cruz', 'Reserva de tortugas', 'Tour en lancha'],
    gallery: [
      'https://images.unsplash.com/photo-1529528070131-eda9f3e90919?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'quito',
    title: 'Quito',
    region: 'Sierra norte',
    image: 'https://images.unsplash.com/photo-1598177214696-5ef36f2e84a3?auto=format&fit=crop&w=1600&q=80',
    description:
      'Capital andina con centro historico, miradores, iglesias, museos y gastronomia para rutas cortas.',
    weather: '18 C, clima templado',
    bestTime: 'Todo el ano',
    activities: ['Centro Historico', 'Mitad del Mundo', 'Teleferico', 'Mercado artesanal'],
    gallery: [
      'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595880620514-78d6f326d0f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80',
    ],
  },
]

const destination = computed(() => {
  const id = String(route.params.id ?? 'galapagos')
  return destinations.find((item) => item.id === id) ?? destinations[0]
})
</script>

<template>
  <section class="relative overflow-hidden bg-[#122c2b]">
    <img :src="destination.image" :alt="destination.title" class="absolute inset-0 h-full w-full object-cover opacity-55" />
    <div class="absolute inset-0 bg-gradient-to-r from-[#122c2b]/95 via-[#122c2b]/65 to-transparent"></div>

    <div class="page-shell relative z-10 grid min-h-[520px] content-end py-14 text-white">
      <RouterLink to="/buscar" class="mb-6 focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target inline-flex w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
        Volver a resultados
      </RouterLink>
      <p class="text-sm font-black uppercase text-[#ffbf45]">{{ destination.region }}</p>
      <h1 class="mt-3 max-w-3xl text-5xl font-black leading-tight">{{ destination.title }}</h1>
      <p class="mt-5 max-w-2xl text-lg leading-8 text-white/88">{{ destination.description }}</p>
    </div>
  </section>

  <section class="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
    <div class="grid gap-8">
      <div class="rounded-[32px] border border-[#dce8e4] bg-white p-6 shadow-[0_18px_50px_rgba(18,44,43,0.08)]">
        <h2 class="text-2xl font-black text-[#122c2b]">Actividades recomendadas</h2>
        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <article
            v-for="activity in destination.activities"
            :key="activity"
            class="rounded-2xl bg-[#f6faf8] p-4 text-sm font-bold text-[#122c2b]"
          >
            {{ activity }}
          </article>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <img
          v-for="image in destination.gallery"
          :key="image"
          :src="image"
          :alt="destination.title"
          class="h-56 w-full rounded-[28px] object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <aside class="h-fit rounded-[32px] border border-[#dce8e4] bg-white p-6 shadow-[0_18px_50px_rgba(18,44,43,0.08)]">
      <h2 class="text-xl font-black text-[#122c2b]">Resumen del viaje</h2>
      <dl class="mt-5 grid gap-4 text-sm">
        <div class="rounded-2xl bg-[#f6faf8] p-4">
          <dt class="font-black text-[#122c2b]">Clima</dt>
          <dd class="mt-1 text-[#5d7471]">{{ destination.weather }}</dd>
        </div>
        <div class="rounded-2xl bg-[#f6faf8] p-4">
          <dt class="font-black text-[#122c2b]">Mejor epoca</dt>
          <dd class="mt-1 text-[#5d7471]">{{ destination.bestTime }}</dd>
        </div>
      </dl>
      <RouterLink
        to="/itinerario"
        class="focus-ring mt-6 inline-flex w-full justify-center rounded-full bg-[#ff8a2a] px-5 py-3 text-sm font-black text-white"
      >
        Crear itinerario
      </RouterLink>
    </aside>
  </section>
</template>
