<script setup lang="ts">
import { ref } from 'vue'
import ProfileForm from '../components/ProfileForm.vue'
import type { TravelerProfileForm } from '../components/ProfileForm.vue'

const savedMessage = ref('')

const history = [
  { id: 'trip-1', title: 'Quito cultural', date: 'Mayo 2026', status: 'Completado' },
  { id: 'trip-2', title: 'Cuenca y Cajas', date: 'Abril 2026', status: 'Guardado' },
]

function handleSave(profile: TravelerProfileForm) {
  savedMessage.value = `Perfil actualizado para ${profile.name}`
}
</script>

<template>
  <section class="page-shell grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
    <div>
      <p class="text-sm font-black uppercase text-[#ff7a1a]">Perfil viajero</p>
      <h1 class="mt-3 text-4xl font-black text-[#122c2b]">Preferencias y configuracion</h1>
      <p class="mt-3 max-w-2xl text-[#5d7471]">
        Estos datos alimentan las recomendaciones, itinerarios y alertas personalizadas.
      </p>

      <p v-if="savedMessage" class="mt-5 rounded-2xl bg-[#e8f7f3] px-4 py-3 text-sm font-bold text-[#0f9488]">
        {{ savedMessage }}
      </p>

      <div class="mt-6">
        <ProfileForm @save="handleSave" />
      </div>
    </div>

    <aside class="h-fit rounded-[32px] border border-[#dce8e4] bg-white p-6 shadow-[0_18px_50px_rgba(18,44,43,0.08)]">
      <h2 class="text-xl font-black text-[#122c2b]">Historial</h2>
      <div class="mt-5 grid gap-3">
        <article v-for="trip in history" :key="trip.id" class="rounded-2xl bg-[#f6faf8] p-4">
          <p class="font-black text-[#122c2b]">{{ trip.title }}</p>
          <p class="mt-1 text-sm text-[#5d7471]">{{ trip.date }} - {{ trip.status }}</p>
        </article>
      </div>
    </aside>
  </section>
</template>
