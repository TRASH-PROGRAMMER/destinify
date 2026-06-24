import { watch, onMounted } from 'vue'
import { useAccessibilityStore, initAccessibilityPersistence } from '../store/accessibilityStore'

export function useAccessibility() {
  const store = useAccessibilityStore()

  initAccessibilityPersistence()

  const applyStyles = () => {
    const root = document.documentElement
    const body = document.body

    root.style.fontSize = `calc(16px + ${store.fontSizeDelta * 2}px)`
    body.style.zoom = `${store.zoom}%`

    if (store.dyslexiaFont) body.classList.add('font-dyslexia')
    else body.classList.remove('font-dyslexia')

    if (store.letterSpacing) body.classList.add('letter-spacing-large')
    else body.classList.remove('letter-spacing-large')

    if (store.lineSpacing) body.classList.add('line-spacing-large')
    else body.classList.remove('line-spacing-large')

    if (store.darkMode) {
      root.classList.add('dark-mode')
      root.classList.remove('autism-mode')
    } else if (store.autismMode) {
      root.classList.add('autism-mode')
      root.classList.remove('dark-mode')
    } else {
      root.classList.remove('dark-mode', 'autism-mode')
    }

    if (store.highContrast) body.classList.add('high-contrast')
    else body.classList.remove('high-contrast')

    root.classList.remove('filter-protanopia', 'filter-deuteranopia', 'filter-tritanopia')
    if (store.colorBlindFilter !== 'none') {
      root.classList.add(`filter-${store.colorBlindFilter}`)
    }

    if (store.hideAnimations || store.disableBlinks || store.autismMode) {
      body.classList.add('disable-animations')
    } else {
      body.classList.remove('disable-animations')
    }

    if (store.largeCursor) body.classList.add('cursor-large')
    else body.classList.remove('cursor-large')

    if (store.highlightLinks) body.classList.add('highlight-links')
    else body.classList.remove('highlight-links')

    if (store.highlightButtons) body.classList.add('highlight-buttons')
    else body.classList.remove('highlight-buttons')

    if (store.largeButtons) body.classList.add('large-buttons')
    else body.classList.remove('large-buttons')

    if (store.focusedReading) body.classList.add('focused-reading')
    else body.classList.remove('focused-reading')

    if (store.hideDistractions) body.classList.add('hide-distractions')
    else body.classList.remove('hide-distractions')
  }

  watch(() => store.$state, applyStyles, { deep: true })

  onMounted(() => {
    applyStyles()
  })

  return {
    store
  }
}