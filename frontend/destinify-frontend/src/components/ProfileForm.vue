<script setup lang="ts">
import { reactive } from 'vue'

export interface TravelerProfileForm {
  name: string
  email: string
  budget: string
  language: string
  travelStyle: string
  interests: string[]
}

const emit = defineEmits<{
  save: [profile: TravelerProfileForm]
}>()

const profile = reactive<TravelerProfileForm>({
  name: 'Rudy Pico',
  email: 'rudy@destinify.ec',
  budget: '$300 - $700',
  language: 'Espanol',
  travelStyle: 'Aventura flexible',
  interests: ['Naturaleza', 'Gastronomia', 'Cultura'],
})

const interestOptions = ['Naturaleza', 'Gastronomia', 'Cultura', 'Aventura', 'Playas', 'Patrimonio']
const budgetOptions = ['Hasta $300', '$300 - $700', 'Mas de $700']
const languageOptions = ['Espanol', 'Ingles', 'Frances', 'Portugues']
const styleOptions = ['Aventura flexible', 'Viaje organizado', 'Bajo costo', 'Premium']

function toggleInterest(interest: string) {
  if (profile.interests.includes(interest)) {
    profile.interests = profile.interests.filter((item) => item !== interest)
    return
  }

  profile.interests = [...profile.interests, interest]
}

function saveProfile() {
  emit('save', { ...profile, interests: [...profile.interests] })
}
</script>

<template>
  <form class="grid gap-5 rounded-[32px] border border-[#dce8e4] bg-white p-5 shadow-[0_18px_50px_rgba(18,44,43,0.08)]" @submit.prevent="saveProfile">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="grid gap-2">
        <span class="text-sm font-black text-[#122c2b]">Nombre</span>
        <input v-model="profile.name" class="min-h-12 rounded-2xl border border-[#dce8e4] px-4 outline-none focus:border-[#0f9488]" />
      </label>

      <label class="grid gap-2">
        <span class="text-sm font-black text-[#122c2b]">Correo</span>
        <input v-model="profile.email" type="email" class="min-h-12 rounded-2xl border border-[#dce8e4] px-4 outline-none focus:border-[#0f9488]" />
      </label>

      <label class="grid gap-2">
        <span class="text-sm font-black text-[#122c2b]">Presupuesto</span>
        <select v-model="profile.budget" class="min-h-12 rounded-2xl border border-[#dce8e4] px-4 outline-none focus:border-[#0f9488]">
          <option v-for="option in budgetOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>

      <label class="grid gap-2">
        <span class="text-sm font-black text-[#122c2b]">Idioma</span>
        <select v-model="profile.language" class="min-h-12 rounded-2xl border border-[#dce8e4] px-4 outline-none focus:border-[#0f9488]">
          <option v-for="option in languageOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>

      <label class="grid gap-2 md:col-span-2">
        <span class="text-sm font-black text-[#122c2b]">Tipo de viaje</span>
        <select v-model="profile.travelStyle" class="min-h-12 rounded-2xl border border-[#dce8e4] px-4 outline-none focus:border-[#0f9488]">
          <option v-for="option in styleOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>
    </div>

    <fieldset>
      <legend class="text-sm font-black text-[#122c2b]">Intereses</legend>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="interest in interestOptions"
          :key="interest"
          type="button"
          class="focus-ring rounded-full border px-4 py-2 text-sm font-bold transition"
          :class="
            profile.interests.includes(interest)
              ? 'border-[#0f9488] bg-[#e8f7f3] text-[#0f9488]'
              : 'border-[#dce8e4] bg-white text-[#5d7471]'
          "
          @click="toggleInterest(interest)"
        >
          {{ interest }}
        </button>
      </div>
    </fieldset>

    <div class="flex justify-end">
      <button type="submit" class="focus-ring rounded-full bg-[#ff8a2a] px-6 py-3 text-sm font-black text-white">
        Guardar perfil
      </button>
    </div>
  </form>
</template>
