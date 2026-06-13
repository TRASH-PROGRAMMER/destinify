<script setup lang="ts">
export interface DestinationCardData {
  id: string
  title: string
  region: string
  image: string
  priceFrom: number
  rating: number
  tag: string
  summary: string
}

defineProps<{
  destination: DestinationCardData
}>()
</script>

<template>
  <article
    class="group relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#122c2b] shadow-[0_20px_60px_rgba(18,44,43,0.14)]"
  >
    <img
      :src="destination.image"
      :alt="destination.title"
      class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
    <RouterLink
      :to="`/destino/${destination.id}`"
      class="focus-ring absolute inset-0 rounded-[28px]"
      :aria-label="`Ver detalle de ${destination.title}`"
    ></RouterLink>

    <div class="relative z-10 flex h-full min-h-[360px] flex-col justify-between p-6 text-white">
      <div class="flex items-center justify-between gap-3">
        <span class="rounded-full bg-white/85 px-4 py-2 text-xs font-black text-[#122c2b] backdrop-blur">
          {{ destination.tag }}
        </span>
        <span class="rounded-full bg-black/30 px-3 py-2 text-xs font-bold backdrop-blur">
          {{ destination.rating.toFixed(1) }}/5
        </span>
      </div>

      <div>
        <p class="mb-2 text-sm font-semibold text-white/85">{{ destination.region }}</p>
        <h3 class="text-3xl font-black leading-tight">{{ destination.title }}</h3>
        <p class="mt-3 line-clamp-2 text-sm leading-6 text-white/85">{{ destination.summary }}</p>
        <div class="mt-5 flex items-center justify-between gap-3">
          <p class="text-sm font-bold">desde ${{ destination.priceFrom }}</p>
          <span class="grid h-12 w-12 place-items-center rounded-full bg-white/20 text-xl font-black backdrop-blur">
            ->
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
