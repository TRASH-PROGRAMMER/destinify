<script setup lang="ts">
import { ref } from 'vue'

interface ChatMessage {
  id: number
  sender: 'user' | 'assistant'
  text: string
}

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    sender: 'assistant',
    text: 'Hola, soy Andina IA. Dime tu destino, fechas, presupuesto o estilo de viaje y te ayudo a decidir.',
  },
])

const draft = ref('')

function sendMessage() {
  const text = draft.value.trim()
  if (!text) return

  messages.value.push({
    id: Date.now(),
    sender: 'user',
    text,
  })

  draft.value = ''

  window.setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      sender: 'assistant',
      text: 'Con esa idea, te recomiendo combinar un destino principal con una actividad ligera el primer dia. Puedo armarte un itinerario por presupuesto.',
    })
  }, 450)
}
</script>

<template>
  <section class="grid h-[620px] overflow-hidden rounded-[32px] border border-[#dce8e4] bg-white shadow-[0_22px_60px_rgba(18,44,43,0.10)]">
    <header class="border-b border-[#dce8e4] bg-[#f6faf8] p-5">
      <p class="text-lg font-black text-[#122c2b]">Andina IA</p>
      <p class="mt-1 text-sm text-[#5d7471]">Recomendaciones de viaje en tiempo real</p>
    </header>

    <div class="flex flex-col gap-3 overflow-y-auto p-5">
      <article
        v-for="message in messages"
        :key="message.id"
        class="max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6"
        :class="
          message.sender === 'user'
            ? 'ml-auto bg-[#122c2b] text-white'
            : 'mr-auto bg-[#e8f7f3] text-[#122c2b]'
        "
      >
        {{ message.text }}
      </article>
    </div>

    <form class="grid gap-3 border-t border-[#dce8e4] p-4 sm:grid-cols-[1fr_auto]" @submit.prevent="sendMessage">
      <label class="sr-only" for="chat-message">Mensaje para el asistente</label>
      <input
        id="chat-message"
        v-model="draft"
        type="text"
        class="min-h-12 rounded-2xl border border-[#dce8e4] px-4 outline-none focus:border-[#0f9488]"
        placeholder="Ej: quiero un viaje de 3 dias a la sierra"
      />
      <button type="submit" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target rounded-2xl bg-[#ff8a2a] px-6 py-3 text-sm font-black text-white">
        Enviar
      </button>
    </form>
  </section>
</template>
