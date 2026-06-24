import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useAccessibilityStore = defineStore('accessibility', {
  state: () => {
    const saved = localStorage.getItem('destinify_accessibility')
    if (saved) {
      return JSON.parse(saved)
    }

    return {
      fontSizeDelta: 0,
      dyslexiaFont: false,
      darkMode: false,
      highContrast: false,
      colorBlindFilter: 'none',
      zoom: 100,
      letterSpacing: false,
      lineSpacing: false,
      highlightLinks: false,
      highlightButtons: false,
      hideAnimations: false,

      readPage: false,
      readSpeed: 1,
      readVolume: 100,
      readLanguage: 'es-ES',
      readOnHover: false,
      highlightWordRead: false,

      autoSubtitles: false,
      subtitleSize: 'medium',
      subtitleColor: 'white',
      reduceLoudSounds: false,

      simplifyText: false,
      focusedReading: false,
      hideDistractions: false,
      highlightCurrentLine: false,
      autoSummarize: false,
      showPictograms: false,
      autismMode: false,
      moreTimeForms: false,
      disableBlinks: true,

      voiceNav: false,
      voiceDictation: false,

      largeCursor: false,
      largeButtons: false,
      pointerSize: 'normal',
      mouseSensitivity: 'normal',
      preventDoubleClick: false,
      keyboardNav: false,
      autoScroll: false,
      motionEnabled: true,
    }
  },
  actions: {
    toggleFontSize(action: 'increase' | 'decrease') {
      if (action === 'increase') this.fontSizeDelta++
      else this.fontSizeDelta--
    },

    resetAll() {
      localStorage.removeItem('destinify_accessibility')
      this.$reset()
    }
  }
})

// Configuramos la persistencia simple
export function initAccessibilityPersistence() {
  const store = useAccessibilityStore()
  watch(
    () => store.$state,
    (state) => {
      localStorage.setItem('destinify_accessibility', JSON.stringify(state))
    },
    { deep: true }
  )
}
