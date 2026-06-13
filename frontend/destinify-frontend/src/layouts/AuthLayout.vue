<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="min-h-screen bg-[#f5faf8] px-4 py-8 sm:px-6">
    <section class="mx-auto grid min-h-[calc(100vh-64px)] max-w-5xl items-center gap-8 lg:grid-cols-[1fr_420px]">
      <div class="hidden lg:block">
        <p class="mb-4 text-sm font-semibold uppercase text-[#ff7a1a]">Destinify</p>
        <h1 class="max-w-xl text-5xl font-black leading-tight text-[#122c2b]">
          Planifica tu viaje por Ecuador con asistencia inteligente.
        </h1>
      </div>

      <div class="rounded-[32px] border border-[#dce8e4] bg-white p-6 shadow-[0_24px_60px_rgba(18,44,43,0.10)]">
        <RouterView />
      </div>
    </section>
  </main>
</template>
