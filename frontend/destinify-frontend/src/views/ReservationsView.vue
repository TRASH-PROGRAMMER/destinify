<script setup lang="ts">
import ReservationItem from '../components/ReservationItem.vue'
import type { ReservationItemData } from '../components/ReservationItem.vue'

const reservations: ReservationItemData[] = [
  {
    id: 'res-001',
    title: 'Hotel Boutique Andino',
    type: 'Hotel',
    date: '18 Jun 2026',
    location: 'Quito',
    status: 'Confirmada',
    total: 156,
  },
  {
    id: 'res-002',
    title: 'Tour Centro Historico',
    type: 'Tour',
    date: '19 Jun 2026',
    location: 'Quito',
    status: 'Pendiente',
    total: 42,
  },
  {
    id: 'res-003',
    title: 'Traslado aeropuerto',
    type: 'Transporte',
    date: '20 Jun 2026',
    location: 'Mariscal Sucre',
    status: 'Confirmada',
    total: 28,
  },
]
</script>

<template>
  <section class="page-shell py-10">
    <div class="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p class="text-sm font-black uppercase text-[#ff7a1a]">Reservas</p>
        <h1 class="mt-3 text-4xl font-black text-[#122c2b]">Tus reservas activas</h1>
        <p class="mt-3 max-w-2xl text-[#5d7471]">
          Consulta estados, fechas y valores de hoteles, tours y transporte.
        </p>
      </div>
      <RouterLink to="/buscar" class="focus-ring rounded-full bg-[#122c2b] px-6 py-3 text-sm font-black text-white">
        Buscar servicios
      </RouterLink>
    </div>

    <div class="mt-8 grid gap-4">
      <ReservationItem
        v-for="reservation in reservations"
        :key="reservation.id"
        :reservation="reservation"
      />
    </div>
  </section>
</template>
