<script setup lang="ts">
import { computed } from 'vue'

export interface ReservationItemData {
  id: string
  title: string
  type: 'Hotel' | 'Vuelo' | 'Tour' | 'Transporte'
  date: string
  location: string
  status: 'Confirmada' | 'Pendiente' | 'Cancelada'
  total: number
}

const props = defineProps<{
  reservation: ReservationItemData
}>()

const statusClass = computed(() => {
  if (props.reservation.status === 'Confirmada') return 'bg-[#e8f7f3] text-[#0f9488]'
  if (props.reservation.status === 'Pendiente') return 'bg-[#fff6df] text-[#9a6810]'
  return 'bg-[#ffe9e6] text-[#b73522]'
})
</script>

<template>
  <article class="grid gap-4 rounded-[28px] border border-[#dce8e4] bg-white p-5 shadow-[0_14px_40px_rgba(18,44,43,0.06)] md:grid-cols-[1fr_auto] md:items-center">
    <div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="rounded-full bg-[#f6faf8] px-3 py-1 text-xs font-black text-[#5d7471]">
          {{ reservation.type }}
        </span>
        <span class="rounded-full px-3 py-1 text-xs font-black" :class="statusClass">
          {{ reservation.status }}
        </span>
      </div>
      <h3 class="mt-3 text-xl font-black text-[#122c2b]">{{ reservation.title }}</h3>
      <p class="mt-2 text-sm leading-6 text-[#5d7471]">
        {{ reservation.date }} - {{ reservation.location }}
      </p>
    </div>

    <div class="flex items-center justify-between gap-5 md:flex-col md:items-end">
      <p class="text-lg font-black text-[#122c2b]">${{ reservation.total }}</p>
      <button type="button" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target rounded-full border border-[#dce8e4] px-4 py-2 text-sm font-bold text-[#122c2b]">
        Ver detalle
      </button>
    </div>
  </article>
</template>
