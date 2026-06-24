<script setup lang="ts">
import { ref } from 'vue'
import { useAccessibilityStore } from '../../store/accessibilityStore'

const store = useAccessibilityStore()
const emit = defineEmits(['close'])

const tab = ref('vision')

const quickActions = [
  { icon: 'mdi-plus', label: 'Texto +', color: '#0f9488', action: 'increase', shortcut: 'Ctrl+Alt++' },
  { icon: 'mdi-minus', label: 'Texto -', color: '#122c2b', action: 'decrease', shortcut: 'Ctrl+Alt+-' },
  { icon: 'mdi-volume-high', label: 'Leer', color: '#0ea5e9', key: 'readPage' },
  { icon: 'mdi-contrast-circle', label: 'Contraste', color: '#8b5cf6', key: 'highContrast', shortcut: 'Ctrl+Alt+C' },
  { icon: 'mdi-palette', label: 'Daltonismo', color: '#f97316', hasSubmenu: true, key: 'colorBlindFilter' },
  { icon: 'mdi-microphone', label: 'Voz', color: '#10b981', key: 'voiceDictation' },
  { icon: 'mdi-subtitles', label: 'Subtítulos', color: '#0ea5e9', key: 'autoSubtitles' },
  { icon: 'mdi-puzzle', label: 'Dislexia', color: '#8b5cf6', key: 'dyslexiaFont' },
  { icon: 'mdi-weather-night', label: 'Modo oscuro', color: '#f97316', key: 'darkMode' },
  { icon: 'mdi-cursor-default-click', label: 'Cursor +', color: '#8b5cf6', key: 'largeCursor' },
  { icon: 'mdi-motion-pause', label: 'Sin animación', color: '#f97316', key: 'hideAnimations' },
  { icon: 'mdi-image-filter-center-focus', label: 'Enfocar', color: '#10b981', key: 'focusedReading' },
]
const isActive = (item: any) => {
  if (item.key) return !!store[item.key as keyof typeof store]
  return false
}

const handleQuickAction = (item: any) => {
  if (item.action === 'increase') store.toggleFontSize('increase')
  else if (item.action === 'decrease') store.toggleFontSize('decrease')
  else if (item.key) {
    const val = store[item.key as keyof typeof store]
    if (typeof val === 'boolean') store[item.key as keyof typeof store] = !val
    else if (item.key === 'colorBlindFilter') store.colorBlindFilter = store.colorBlindFilter === 'none' ? 'protanopia' : 'none'
  }
}
</script>

<template>
  <div class="flex h-full flex-col bg-white">
    <header class="flex-shrink-0 bg-[#f9f6f0] px-4 py-4 rounded-tl-2xl">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="flex items-center text-lg font-bold text-[#122c2b]">
            <v-icon icon="mdi-human-capacity-increase" class="mr-2 text-[#0f9488]" size="24"></v-icon>
            Accesibilidad
          </h2>
          <p class="mt-0.5 text-xs text-[#5d7471]">Personaliza tu experiencia</p>
        </div>
        <v-btn icon="mdi-close" variant="text" size="small" @click="emit('close')" aria-label="Cerrar"></v-btn>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto p-4">
      <div class="mb-3 flex items-center text-sm font-semibold text-[#122c2b]">
        <v-icon icon="mdi-lightning-bolt" size="16" class="mr-1.5 text-[#ff8a2a]"></v-icon>
        Accesos rápidos
      </div>

      <div class="grid grid-cols-4 gap-y-4 gap-x-2">
        <button
          v-for="item in quickActions"
          :key="item.label"
          :aria-pressed="isActive(item)"
          class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target flex flex-col items-center justify-start group relative"
          @click="handleQuickAction(item)"
        >
          <div
            class="mb-1.5 flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform group-hover:scale-105"
            :style="{ backgroundColor: item.color }"
            :class="isActive(item) ? 'ring-2 ring-offset-2 ring-[#0f9488]' : ''"
          >
            <v-icon :icon="item.icon" size="24"></v-icon>
          </div>
          <span class="text-[0.65rem] font-medium leading-tight text-center text-[#122c2b]" :class="isActive(item) ? 'font-bold' : ''">{{ item.label }}</span>
          <v-tooltip v-if="item.shortcut" activator="parent" location="top" text="Atajo" :open-delay="200">
            {{ item.label }} ({{ item.shortcut }})
          </v-tooltip>
        </button>
      </div>

      <div class="mt-6 mb-2">
        <div class="flex items-center justify-between bg-[#f5f5f5] p-1 rounded-2xl">
          <button @click="tab = 'vision'" :class="tab === 'vision' ? 'bg-white shadow text-[#0f9488]' : 'text-gray-500 hover:text-gray-700'" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target flex-1 flex flex-col items-center rounded-xl transition-all">
            <v-icon icon="mdi-eye" size="18" class="mb-1"></v-icon>
            <span class="text-[0.65rem] font-semibold">Visión</span>
          </button>
          <button @click="tab = 'audio'" :class="tab === 'audio' ? 'bg-white shadow text-[#0f9488]' : 'text-gray-500 hover:text-gray-700'" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target flex-1 flex flex-col items-center rounded-xl transition-all">
            <v-icon icon="mdi-volume-high" size="18" class="mb-1"></v-icon>
            <span class="text-[0.65rem] font-semibold">Audio</span>
          </button>
          <button @click="tab = 'media'" :class="tab === 'media' ? 'bg-white shadow text-[#0f9488]' : 'text-gray-500 hover:text-gray-700'" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target flex-1 flex flex-col items-center rounded-xl transition-all">
            <v-icon icon="mdi-play-box" size="18" class="mb-1"></v-icon>
            <span class="text-[0.65rem] font-semibold">Media</span>
          </button>
          <button @click="tab = 'cognitive'" :class="tab === 'cognitive' ? 'bg-white shadow text-[#0f9488]' : 'text-gray-500 hover:text-gray-700'" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target flex-1 flex flex-col items-center rounded-xl transition-all">
            <v-icon icon="mdi-brain" size="18" class="mb-1"></v-icon>
            <span class="text-[0.65rem] font-semibold">Cognitivo</span>
          </button>
          <button @click="tab = 'voice'" :class="tab === 'voice' ? 'bg-white shadow text-[#0f9488]' : 'text-gray-500 hover:text-gray-700'" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target flex-1 flex flex-col items-center rounded-xl transition-all">
            <v-icon icon="mdi-microphone" size="18" class="mb-1"></v-icon>
            <span class="text-[0.65rem] font-semibold">Voz</span>
          </button>
          <button @click="tab = 'motor'" :class="tab === 'motor' ? 'bg-white shadow text-[#0f9488]' : 'text-gray-500 hover:text-gray-700'" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target flex-1 flex flex-col items-center rounded-xl transition-all">
            <v-icon icon="mdi-cursor-default-click" size="18" class="mb-1"></v-icon>
            <span class="text-[0.65rem] font-semibold">Motriz</span>
          </button>
        </div>
      </div>

      <v-window v-model="tab" class="mt-5">
        <v-window-item value="vision">
          <div class="space-y-4">
            <div>
              <div class="mb-1 flex items-center text-sm font-bold text-[#122c2b]">
                <v-icon icon="mdi-format-title" size="18" class="mr-2 text-[#0f9488]"></v-icon>
                Tamaño de letra ({{ 100 + store.fontSizeDelta * 10 }}%)
              </div>
              <v-slider v-model="store.fontSizeDelta" min="-5" max="10" step="1" color="#0f9488" hide-details></v-slider>
            </div>

            <div class="mt-4">
              <div class="mb-1 flex items-center text-sm font-bold text-[#122c2b]">
                <v-icon icon="mdi-magnify" size="18" class="mr-2 text-[#0f9488]"></v-icon>
                Zoom ({{ store.zoom }}%)
              </div>
              <v-slider v-model="store.zoom" min="50" max="200" step="10" color="#0f9488" hide-details></v-slider>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-format-letter-spacing" size="16" class="mr-1.5 text-[#0f9488]"></v-icon>
                Espaciado letras
              </div>
              <v-switch v-model="store.letterSpacing" color="#0f9488" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-format-line-spacing" size="16" class="mr-1.5 text-[#0f9488]"></v-icon>
                Espaciado líneas
              </div>
              <v-switch v-model="store.lineSpacing" color="#0f9488" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-format-font" size="16" class="mr-1.5 text-[#0f9488]"></v-icon>
                Fuente dislexia
              </div>
              <v-switch v-model="store.dyslexiaFont" color="#0f9488" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-theme-light-dark" size="16" class="mr-1.5 text-[#0f9488]"></v-icon>
                Modo oscuro
              </div>
              <v-switch v-model="store.darkMode" color="#0f9488" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-contrast-circle" size="16" class="mr-1.5 text-[#0f9488]"></v-icon>
                Alto contraste
              </div>
              <v-switch v-model="store.highContrast" color="#0f9488" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-palette" size="16" class="mr-1.5 text-[#0f9488]"></v-icon>
                Filtro daltonismo
              </div>
              <v-select
                v-model="store.colorBlindFilter"
                :items="[{ title: 'Ninguno', value: 'none' }, { title: 'Protanopia', value: 'protanopia' }, { title: 'Deuteranopia', value: 'deuteranopia' }, { title: 'Tritanopia', value: 'tritanopia' }]"
                density="compact"
                variant="outlined"
                hide-details
                class="w-36"
              ></v-select>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-link-variant" size="16" class="mr-1.5 text-[#0f9488]"></v-icon>
                Resaltar enlaces
              </div>
              <v-switch v-model="store.highlightLinks" color="#0f9488" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-gesture-tap" size="16" class="mr-1.5 text-[#0f9488]"></v-icon>
                Resaltar botones
              </div>
              <v-switch v-model="store.highlightButtons" color="#0f9488" hide-details inset density="compact"></v-switch>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="audio">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-volume-high" size="16" class="mr-1.5 text-[#1e88e5]"></v-icon>
                Lectura en voz alta
              </div>
              <v-switch v-model="store.readPage" color="#1e88e5" hide-details inset density="compact"></v-switch>
            </div>

            <div>
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-[#122c2b]">Velocidad</span>
                <span class="text-xs font-semibold text-[#1e88e5]">{{ store.readSpeed }}x</span>
              </div>
              <v-slider v-model="store.readSpeed" min="0.5" max="2" step="0.1" color="#1e88e5" hide-details thumb-label></v-slider>
            </div>

            <div>
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-[#122c2b]">Volumen</span>
                <span class="text-xs font-semibold text-[#1e88e5]">{{ store.readVolume }}%</span>
              </div>
              <v-slider v-model="store.readVolume" min="0" max="100" step="10" color="#1e88e5" hide-details thumb-label></v-slider>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-microphone-outline" size="16" class="mr-1.5 text-[#1e88e5]"></v-icon>
                Leer al pasar cursor
              </div>
              <v-switch v-model="store.readOnHover" color="#1e88e5" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-format-highlight-text" size="16" class="mr-1.5 text-[#1e88e5]"></v-icon>
                Resaltar palabra leída
              </div>
              <v-switch v-model="store.highlightWordRead" color="#1e88e5" hide-details inset density="compact"></v-switch>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="media">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-subtitles" size="16" class="mr-1.5 text-[#ff8a2a]"></v-icon>
                Subtítulos automáticos
              </div>
              <v-switch v-model="store.autoSubtitles" color="#ff8a2a" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-subtitles-outline" size="16" class="mr-1.5 text-[#ff8a2a]"></v-icon>
                Tamaño subtítulos
              </div>
              <v-select
                v-model="store.subtitleSize"
                :items="[{title: 'Pequeño', value: 'small'}, {title: 'Mediano', value: 'medium'}, {title: 'Grande', value: 'large'}]"
                density="compact"
                variant="outlined"
                hide-details
                class="w-32"
              ></v-select>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-volume-off" size="16" class="mr-1.5 text-[#ff8a2a]"></v-icon>
                Reducir sonidos fuertes
              </div>
              <v-switch v-model="store.reduceLoudSounds" color="#ff8a2a" hide-details inset density="compact"></v-switch>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="cognitive">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-text-box-outline" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Simplificar texto
              </div>
              <v-switch v-model="store.simplifyText" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-focus-field" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Lectura enfocada
              </div>
              <v-switch v-model="store.focusedReading" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-eye-off" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Ocultar distracciones
              </div>
              <v-switch v-model="store.hideDistractions" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-format-horizontal-align-center" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Resaltar línea actual
              </div>
              <v-switch v-model="store.highlightCurrentLine" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-creation" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Auto resumir
              </div>
              <v-switch v-model="store.autoSummarize" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-image-multiple" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Mostrar pictogramas
              </div>
              <v-switch v-model="store.showPictograms" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-brain" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Modo autismo
              </div>
              <v-switch v-model="store.autismMode" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-clock-outline" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Más tiempo en formularios
              </div>
              <v-switch v-model="store.moreTimeForms" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="voice">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-microphone-message" size="16" class="mr-1.5 text-[#43a047]"></v-icon>
                Navegación por voz
              </div>
              <v-switch v-model="store.voiceNav" color="#43a047" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-microphone-plus" size="16" class="mr-1.5 text-[#43a047]"></v-icon>
                Dictado por voz
              </div>
              <v-switch v-model="store.voiceDictation" color="#43a047" hide-details inset density="compact"></v-switch>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="motor">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-cursor-default-grip" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Cursor grande
              </div>
              <v-switch v-model="store.largeCursor" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-gesture-tap-button" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Botones grandes
              </div>
              <v-switch v-model="store.largeButtons" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-cursor-move" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Sensibilidad ratón
              </div>
              <v-select
                v-model="store.mouseSensitivity"
                :items="[{title: 'Baja', value: 'low'}, {title: 'Normal', value: 'normal'}, {title: 'Alta', value: 'high'}]"
                density="compact"
                variant="outlined"
                hide-details
                class="w-32"
              ></v-select>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-mouse-left-double-click" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Prevenir doble clic
              </div>
              <v-switch v-model="store.preventDoubleClick" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-keyboard" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Navegación teclado
              </div>
              <v-switch v-model="store.keyboardNav" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm font-medium text-[#122c2b]">
                <v-icon icon="mdi-autorenew" size="16" class="mr-1.5 text-[#8e24aa]"></v-icon>
                Auto scroll
              </div>
              <v-switch v-model="store.autoScroll" color="#8e24aa" hide-details inset density="compact"></v-switch>
            </div>
          </div>
        </v-window-item>
      </v-window>
    </div>

    <footer class="flex-shrink-0 border-t border-[#e0e8e4] p-4 bg-white">
      <div class="flex gap-3">
        <v-btn variant="outlined" color="#122c2b" class="flex-1 rounded-full border-gray-300" @click="store.resetAll" height="44">
          <v-icon start>mdi-refresh</v-icon>
          <span class="font-bold text-sm capitalize tracking-normal">Restablecer</span>
        </v-btn>
        <v-btn color="#0f9488" class="flex-1 text-white rounded-full" @click="emit('close')" height="44" elevation="0">
          <v-icon start>mdi-close</v-icon>
          <span class="font-bold text-sm capitalize tracking-normal">Cerrar</span>
        </v-btn>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>
