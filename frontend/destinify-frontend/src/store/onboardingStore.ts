import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useOnboardingStore = defineStore('onboarding', {
  state: () => {
    // Autoguardado: Recuperar de localStorage si existe
    const saved = localStorage.getItem('destinify_onboarding')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error parsing saved onboarding data', e)
      }
    }

    return {
      step: 1, // Paso actual
      // Paso 1: Datos básicos
      basicData: {
        name: '',
        country: '',
        language: 'Español',
        travelerType: ''
      },
      // Paso 2: Preferencias
      preferences: {
        budget: '',
        interests: [] as string[],
        accessibility: [] as string[],
        climate: ''
      },
      // Paso 3: Personalización IA
      customization: {
        whatAreYouLookingFor: '',
        adventureLevel: 3,
        pastTrips: ''
      }
    }
  },
  actions: {
    clearData() {
      localStorage.removeItem('destinify_onboarding')
      this.$reset()
    },
    async submitToBackend() {
      const budgetMap: Record<string, { min: number; max: number }> = {
        'Hasta $300': { min: 0, max: 300 },
        '$300 - $700': { min: 300, max: 700 },
        '$700 - $1500': { min: 700, max: 1500 },
        'Mas de $1500': { min: 1500, max: 999999 },
      }
      const budget = budgetMap[this.preferences.budget] || { min: 0, max: 999999 }
      const payload = {
        userId: 1,
        budgetMin: budget.min,
        budgetMax: budget.max,
        currency: 'USD',
        preferredStyle: this.basicData.travelerType,
        accessibilityNeeds: this.preferences.accessibility.join(', '),
        interests: this.preferences.interests,
        climate: this.preferences.climate,
        whatAreYouLookingFor: this.customization.whatAreYouLookingFor,
        adventureLevel: Number(this.customization.adventureLevel) || 3,
        pastTrips: this.customization.pastTrips,
      }
      const { createTravelProfile } = await import('../services/profileService')
      return createTravelProfile(payload)
    },
  }
})

// Función para inicializar la persistencia automática
export function initOnboardingPersistence() {
  const store = useOnboardingStore()
  watch(
    () => store.$state,
    (state) => {
      localStorage.setItem('destinify_onboarding', JSON.stringify(state))
    },
    { deep: true }
  )
}
