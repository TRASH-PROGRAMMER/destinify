<script setup lang="ts">
import { ref } from 'vue'
import NotificationBell from './NotificationBell.vue'

const isMenuOpen = ref(false)

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Destinos', to: '/buscar' },
  { label: 'Itinerario', to: '/itinerario' },
  { label: 'Reservas', to: '/reservas' },
  { label: 'Asistente', to: '/asistente' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-[#dce8e4]/80 bg-white/90 backdrop-blur-xl">
    <div class="page-shell flex h-20 items-center justify-between gap-4">
      <RouterLink to="/" class="focus-ring flex items-center gap-3 rounded-full" aria-label="Ir al inicio">
        <span class="grid h-11 w-11 place-items-center rounded-2xl bg-[#0f9488] text-white shadow-lg shadow-teal-900/10">
          <svg viewBox="0 0 24 24" class="h-6 w-6" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm4.77 5.98-2.08 6.25a1.8 1.8 0 0 1-1.14 1.14L7.3 17.7a.78.78 0 0 1-.99-.99l2.08-6.25a1.8 1.8 0 0 1 1.14-1.14l6.25-2.08a.78.78 0 0 1 .99.99Zm-6.3 3.04-.96 2.88 2.88-.96.96-2.88-2.88.96Z"
            />
          </svg>
        </span>
        <span class="text-xl font-black text-[#122c2b]">Destinify</span>
      </RouterLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Navegacion principal">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="focus-ring rounded-full px-4 py-2 text-sm font-bold text-[#5d7471] transition hover:bg-[#f0f7f5] hover:text-[#122c2b]"
          active-class="bg-[#e8f7f3] text-[#0f9488]"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <NotificationBell />
      <RouterLink
        to="/"
        class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target flex items-center gap-3 rounded-full"
        aria-label="Ir al inicio"
      >
          Mi perfil
        </RouterLink>
      </div>

      <button
        type="button"
        class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target grid h-11 w-11 place-items-center rounded-2xl border border-[#dce8e4] bg-white lg:hidden"
        :aria-expanded="isMenuOpen"
        :aria-label="isMenuOpen ? 'Cerrar menu' : 'Abrir menu'"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="h-0.5 w-5 rounded-full bg-[#122c2b] shadow-[0_7px_0_#122c2b,0_-7px_0_#122c2b]"></span>
      </button>
    </div>

    <div v-if="isMenuOpen" class="border-t border-[#dce8e4] bg-white lg:hidden">
      <nav class="page-shell flex flex-col gap-2 py-4" aria-label="Navegacion movil">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target rounded-2xl px-4 py-3 font-bold text-[#5d7471]"
          active-class="bg-[#e8f7f3] text-[#0f9488]"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink
          to="/perfil"
          class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target rounded-2xl bg-[#ff8a2a] text-center font-bold text-white"
          @click="isMenuOpen = false"
        >
          Mi perfil
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
