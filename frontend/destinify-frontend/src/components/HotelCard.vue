<script setup lang="ts">
export interface HotelCardData {
  id: string
  name: string
  location: string
  image: string
  pricePerNight: number
  rating: number
  amenities: string[]
}

defineProps<{
  hotel: HotelCardData
}>()
</script>

<template>
  <article class="overflow-hidden rounded-[28px] border border-[#dce8e4] bg-white shadow-[0_18px_50px_rgba(18,44,43,0.08)]">
    <img :src="hotel.image" :alt="hotel.name" class="h-52 w-full object-cover" loading="lazy" />
    <div class="p-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-black uppercase text-[#ff7a1a]">{{ hotel.location }}</p>
          <h3 class="mt-1 text-xl font-black text-[#122c2b]">{{ hotel.name }}</h3>
        </div>
        <span class="rounded-full bg-[#e8f7f3] px-3 py-1 text-sm font-black text-[#0f9488]">
          {{ hotel.rating.toFixed(1) }}
        </span>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="amenity in hotel.amenities"
          :key="amenity"
          class="rounded-full bg-[#f6faf8] px-3 py-1 text-xs font-bold text-[#5d7471]"
        >
          {{ amenity }}
        </span>
      </div>

      <div class="mt-5 flex items-center justify-between gap-4 border-t border-[#dce8e4] pt-4">
        <p class="text-sm text-[#5d7471]">
          desde <span class="text-lg font-black text-[#122c2b]">${{ hotel.pricePerNight }}</span> / noche
        </p>
        <button type="button" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target rounded-full bg-[#122c2b] px-4 py-2 text-sm font-bold text-white">
          Reservar
        </button>
      </div>
    </div>
  </article>
</template>
