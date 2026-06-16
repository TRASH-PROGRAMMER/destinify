import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useAccessibilityStore = defineStore('accessibility', {
  state: () => {
    // Intentar recuperar de localStorage si existe
    const saved = localStorage.getItem('destinify_accessibility')
    if (saved) {
      return JSON.parse(saved)
    }

    return {
      // 👁️ Visión
      fontSizeDelta: 0,
      dyslexiaFont: false,
      darkMode: false,
      highContrast: false,
      colorBlindFilter: 'none', // 'none', 'protanopia', 'deuteranopia', 'tritanopia'
      zoom: 100,
      letterSpacing: false,
      lineSpacing: false,
      highlightLinks: false,
      highlightButtons: false,
      hideAnimations: false,

      // 🔊 Lectura / Audio
      readPage: false,
      readSpeed: 1, // 0.5 a 2.0
      readVolume: 100,
      readLanguage: 'es-ES',
      readOnHover: false,
      highlightWordRead: false,

      // 🎬 Multimedia
      autoSubtitles: false,
      subtitleSize: 'medium',
      subtitleColor: 'white',
      reduceLoudSounds: false,

      // 🧠 Cognitivo / Dislexia / Autismo
      simplifyText: false,
      focusedReading: false,
      hideDistractions: false,
      highlightCurrentLine: false,
      autoSummarize: false,
      showPictograms: false,
      autismMode: false,
      moreTimeForms: false,
      disableBlinks: true,

      // 🎤 Control por voz
      voiceNav: false,
      voiceDictation: false,

      // 🖱️ Motriz / Movilidad
      largeCursor: false,
      largeButtons: false,
      mouseSensitivity: 'normal',
      preventDoubleClick: false,
      keyboardNav: false,
      autoScroll: false,
    }
  },
  actions: {
    resetAll() {
      // Pinia $reset doesn't trigger custom persistence easily, so we manually clear
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
