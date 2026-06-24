<script setup lang="ts">
export interface TourCardData {
  id: string
  title: string
  place: string
  image: string
  duration: string
  price: number
  difficulty: string
}

defineProps<{
  tour: TourCardData
}>()
</script>

<template>
  <article class="grid overflow-hidden rounded-[28px] border border-[#dce8e4] bg-white shadow-[0_18px_50px_rgba(18,44,43,0.08)] sm:grid-cols-[190px_1fr]">
    <img :src="tour.image" :alt="tour.title" class="h-56 w-full object-cover sm:h-full" loading="lazy" />
    <div class="flex flex-col justify-between gap-5 p-5">
      <div>
        <p class="text-xs font-black uppercase text-[#ff7a1a]">{{ tour.place }}</p>
        <h3 class="mt-1 text-xl font-black text-[#122c2b]">{{ tour.title }}</h3>
        <div class="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#5d7471]">
          <span class="rounded-full bg-[#f6faf8] px-3 py-1">{{ tour.duration }}</span>
          <span class="rounded-full bg-[#f6faf8] px-3 py-1">{{ tour.difficulty }}</span>
        </div>
      </div>

      <div class="flex items-center justify-between gap-4">
        <p class="text-sm text-[#5d7471]">
          desde <span class="text-lg font-black text-[#122c2b]">${{ tour.price }}</span>
        </p>
        <button type="button" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target rounded-full bg-[#ff8a2a] px-4 py-2 text-sm font-black text-white">
          Agregar
        </button>
      </div>
    </div>
  </article>
</template>
