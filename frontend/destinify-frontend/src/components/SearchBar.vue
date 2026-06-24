<script setup lang="ts">
import { computed, ref } from 'vue'

export interface SearchPayload {
  query: string
  category: string
  budget: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    compact?: boolean
  }>(),
  {
    modelValue: '',
    placeholder: 'A donde quieres ir? Quito, Galapagos...',
    compact: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [payload: SearchPayload]
}>()

const category = ref('Todos')
const budget = ref('Cualquier presupuesto')

const query = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

const categories = ['Todos', 'Destinos', 'Hoteles', 'Tours']
const budgets = ['Cualquier presupuesto', 'Hasta $300', '$300 - $700', 'Mas de $700']

function submitSearch() {
  emit('search', {
    query: query.value.trim(),
    category: category.value,
    budget: budget.value,
  })
}
</script>

<template>
  <form
    class="grid touch-target gap-3 rounded-[28px] border border-white/70 bg-white/90 p-3 shadow-[0_20px_50px_rgba(18,44,43,0.12)] backdrop-blur md:grid-cols-[1fr_180px_190px_auto]"
    :class="compact ? 'md:grid-cols-[1fr_auto]' : ''"
    role="search"
    @submit.prevent="submitSearch"
  >
    <label class="flex touch-target items-center gap-3 rounded-2xl bg-[#f6faf8] px-4">
      <svg viewBox="0 0 24 24" class="h-5 w-5 shrink-0 text-[#0f9488]" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8Zm0 10.8A2.8 2.8 0 1 1 12 7.2a2.8 2.8 0 0 1 0 5.6Z"
        />
      </svg>
      <span class="sr-only">Buscar destino</span>
      <input
        v-model="query"
        type="search"
        :placeholder="placeholder"
        class="touch-target w-full bg-transparent text-sm font-semibold text-[#122c2b] outline-none placeholder:text-[#6b817e]"
      />
    </label>

    <label v-if="!compact" class="flex touch-target items-center rounded-2xl bg-[#f6faf8] px-4">
      <span class="sr-only">Categoria</span>
      <select v-model="category" class="touch-target w-full bg-transparent text-sm font-bold text-[#122c2b] outline-none">
        <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
      </select>
    </label>

    <label v-if="!compact" class="flex touch-target items-center rounded-2xl bg-[#f6faf8] px-4">
      <span class="sr-only">Presupuesto</span>
      <select v-model="budget" class="touch-target w-full bg-transparent text-sm font-bold text-[#122c2b] outline-none">
        <option v-for="item in budgets" :key="item" :value="item">{{ item }}</option>
      </select>
    </label>

    <button
      type="submit"
      class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target rounded-2xl bg-[#ff8a2a] px-7 text-sm font-black text-white shadow-lg shadow-orange-900/10 transition hover:bg-[#ff7a1a]"
    >
      Buscar
    </button>
  </form>
</template>
