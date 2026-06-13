<script setup lang="ts">
import { computed, ref } from 'vue'

interface NotificationPreview {
  id: number
  title: string
  description: string
  unread: boolean
}

const isOpen = ref(false)

const notifications = ref<NotificationPreview[]>([
  {
    id: 1,
    title: 'Recordatorio de tour',
    description: 'Tu visita al Centro Historico inicia a las 09:00.',
    unread: true,
  },
  {
    id: 2,
    title: 'Clima actualizado',
    description: 'Lluvia ligera prevista para la tarde en Quito.',
    unread: true,
  },
  {
    id: 3,
    title: 'Reserva confirmada',
    description: 'Hotel Boutique Andino confirmo tu habitacion.',
    unread: false,
  },
])

const unreadCount = computed(() => notifications.value.filter((item) => item.unread).length)
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="focus-ring relative grid h-11 w-11 place-items-center rounded-2xl border border-[#dce8e4] bg-white text-[#122c2b] transition hover:border-[#0f9488]"
      aria-label="Ver notificaciones"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 22a2.7 2.7 0 0 0 2.62-2h-5.24A2.7 2.7 0 0 0 12 22Zm7-6.3-1.5-1.9V10a5.5 5.5 0 0 0-4.25-5.36V3.8a1.25 1.25 0 0 0-2.5 0v.84A5.5 5.5 0 0 0 6.5 10v3.8L5 15.7V18h14v-2.3Z"
        />
      </svg>
      <span
        v-if="unreadCount"
        class="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ff8a2a] px-1 text-xs font-black text-white"
      >
        {{ unreadCount }}
      </span>
    </button>

    <section
      v-if="isOpen"
      class="absolute right-0 top-14 z-50 w-[min(340px,calc(100vw-32px))] rounded-3xl border border-[#dce8e4] bg-white p-3 shadow-[0_24px_60px_rgba(18,44,43,0.16)]"
      aria-label="Notificaciones recientes"
    >
      <div class="border-b border-[#dce8e4] px-3 py-2">
        <p class="font-black text-[#122c2b]">Notificaciones</p>
        <p class="text-xs text-[#5d7471]">Preparado para FCM en el frontend.</p>
      </div>
      <div class="mt-2 grid gap-2">
        <article
          v-for="notification in notifications"
          :key="notification.id"
          class="rounded-2xl p-3"
          :class="notification.unread ? 'bg-[#e8f7f3]' : 'bg-[#f6faf8]'"
        >
          <div class="flex items-start justify-between gap-3">
            <p class="text-sm font-black text-[#122c2b]">{{ notification.title }}</p>
            <span v-if="notification.unread" class="mt-1 h-2 w-2 rounded-full bg-[#ff8a2a]"></span>
          </div>
          <p class="mt-1 text-xs leading-5 text-[#5d7471]">{{ notification.description }}</p>
        </article>
      </div>
    </section>
  </div>
</template>
