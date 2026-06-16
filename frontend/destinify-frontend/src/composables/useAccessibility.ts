import { watch, onMounted } from 'vue'
import { useAccessibilityStore, initAccessibilityPersistence } from '../store/accessibilityStore'

export function useAccessibility() {
  const store = useAccessibilityStore()

  // Inicializar persistencia
  initAccessibilityPersistence()

  // Función para aplicar los estilos al documento principal
  const applyStyles = () => {
    const root = document.documentElement
    const body = document.body

    // Visión: Tamaño de letra
    // Cada paso añade/resta 2px a la raíz
    root.style.fontSize = `calc(16px + ${store.fontSizeDelta * 2}px)`

    // Visión: Zoom
    body.style.zoom = `${store.zoom}%`

    // Visión: Tipografía Dislexia
    if (store.dyslexiaFont) {
      body.classList.add('font-dyslexia')
    } else {
      body.classList.remove('font-dyslexia')
    }

    // Visión: Espaciados
    if (store.letterSpacing) body.classList.add('letter-spacing-large')
    else body.classList.remove('letter-spacing-large')

    if (store.lineSpacing) body.classList.add('line-spacing-large')
    else body.classList.remove('line-spacing-large')

    // Visión / Modo Oscuro y Autismo
    // El modo autismo implica colores suaves que pueden superponerse o modificar el tema
    if (store.darkMode) {
      root.classList.add('dark-mode')
      root.classList.remove('autism-mode')
    } else if (store.autismMode) {
      root.classList.add('autism-mode')
      root.classList.remove('dark-mode')
    } else {
      root.classList.remove('dark-mode', 'autism-mode')
    }

    // Visión: Alto contraste
    if (store.highContrast) body.classList.add('high-contrast')
    else body.classList.remove('high-contrast')

    // Visión: Filtros de daltonismo
    root.classList.remove('filter-protanopia', 'filter-deuteranopia', 'filter-tritanopia')
    if (store.colorBlindFilter !== 'none') {
      root.classList.add(`filter-${store.colorBlindFilter}`)
    }

    // Ocultar animaciones (y parpadeos)
    if (store.hideAnimations || store.disableBlinks || store.autismMode) {
      body.classList.add('disable-animations')
    } else {
      body.classList.remove('disable-animations')
    }

    // Motriz: Cursor grande
    if (store.largeCursor) body.classList.add('cursor-large')
    else body.classList.remove('cursor-large')

    // Resaltar enlaces y botones
    if (store.highlightLinks) body.classList.add('highlight-links')
    else body.classList.remove('highlight-links')

    if (store.highlightButtons) body.classList.add('highlight-buttons')
    else body.classList.remove('highlight-buttons')

    // Botones grandes (motriz)
    if (store.largeButtons) body.classList.add('large-buttons')
    else body.classList.remove('large-buttons')
  }

  // Escuchar todos los cambios y aplicar en tiempo real
  watch(() => store.$state, applyStyles, { deep: true })

  onMounted(() => {
    applyStyles()
  })

  return {
    store
  }
}
