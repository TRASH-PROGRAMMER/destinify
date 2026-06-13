<script setup lang="ts">
import ChatBox from '../components/ChatBox.vue'
</script>

<template>
  <section class="page-shell grid gap-8 py-10 lg:grid-cols-[420px_1fr] lg:items-start">
    <aside class="rounded-[32px] border border-[#dce8e4] bg-white p-6 shadow-[0_18px_50px_rgba(18,44,43,0.08)]">
      <p class="text-sm font-black uppercase text-[#ff7a1a]">Asistente IA</p>
      <h1 class="mt-3 text-4xl font-black leading-tight text-[#122c2b]">
        Tu proximo viaje empieza en un mensaje.
      </h1>
      <p class="mt-4 leading-7 text-[#5d7471]">
        Pide recomendaciones segun presupuesto, clima, ubicacion, fechas o estilo de viaje.
      </p>

      <div class="mt-6 grid gap-3 text-sm font-bold text-[#5d7471]">
        <p class="rounded-2xl bg-[#f6faf8] p-4">Recomendaciones contextuales</p>
        <p class="rounded-2xl bg-[#f6faf8] p-4">Ajuste de itinerarios</p>
        <p class="rounded-2xl bg-[#f6faf8] p-4">Sugerencias durante el viaje</p>
      </div>
    </aside>

    <ChatBox />
  </section>
</template>
