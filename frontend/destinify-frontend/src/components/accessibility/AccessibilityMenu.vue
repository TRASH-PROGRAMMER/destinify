<script setup lang="ts">
import { ref } from 'vue'
import { useAccessibilityStore } from '../../store/accessibilityStore'

const store = useAccessibilityStore()
const emit = defineEmits(['close'])

const tab = ref('vision') // default tab

// Quick actions matching the grid from the prototype
const quickActions = [
  { icon: 'mdi-plus', label: 'Texto +', color: '#0f9488', action: () => store.fontSizeDelta += 1 },
  { icon: 'mdi-minus', label: 'Texto -', color: '#0f9488', action: () => store.fontSizeDelta -= 1 },
  { icon: 'mdi-volume-high', label: 'Leer', color: '#1e88e5', action: () => store.readPage = !store.readPage, active: () => store.readPage },
  { icon: 'mdi-contrast-circle', label: 'Contraste', color: '#8e24aa', action: () => store.highContrast = !store.highContrast, active: () => store.highContrast },
  { icon: 'mdi-palette', label: 'Daltonismo', color: '#ff8a2a', action: () => store.colorBlindFilter = store.colorBlindFilter === 'none' ? 'protanopia' : 'none', active: () => store.colorBlindFilter !== 'none' },
  { icon: 'mdi-microphone', label: 'Voz', color: '#43a047', action: () => store.voiceDictation = !store.voiceDictation, active: () => store.voiceDictation },
  { icon: 'mdi-closed-caption', label: 'Subtítulos', color: '#1e88e5', action: () => store.autoSubtitles = !store.autoSubtitles, active: () => store.autoSubtitles },
  { icon: 'mdi-brain', label: 'Dislexia', color: '#8e24aa', action: () => store.dyslexiaFont = !store.dyslexiaFont, active: () => store.dyslexiaFont },
  { icon: 'mdi-weather-night', label: 'Modo oscuro', color: '#ff8a2a', action: () => store.darkMode = !store.darkMode, active: () => store.darkMode },
  { icon: 'mdi-cursor-pointer', label: 'Cursor +', color: '#8e24aa', action: () => store.largeCursor = !store.largeCursor, active: () => store.largeCursor },
  { icon: 'mdi-animation-outline', label: 'Sin animación', color: '#ff8a2a', action: () => store.hideAnimations = !store.hideAnimations, active: () => store.hideAnimations },
  { icon: 'mdi-focus-field', label: 'Enfocar', color: '#0f9488', action: () => store.focusedReading = !store.focusedReading, active: () => store.focusedReading },
]
</script>

<template>
  <div class="h-100 d-flex flex-column bg-surface">
    <!-- Cabecera -->
    <div class="px-4 py-3 d-flex justify-space-between align-start">
      <div>
        <h2 class="text-h6 font-weight-bold d-flex align-center">
          <v-icon icon="mdi-human-capacity-increase" class="mr-2" color="#0f9488"></v-icon>
          Accesibilidad
        </h2>
        <div class="text-caption text-medium-emphasis">Personaliza tu experiencia</div>
      </div>
      <v-btn icon="mdi-close" variant="text" size="small" @click="emit('close')"></v-btn>
    </div>

    <v-divider></v-divider>

    <!-- Contenido scrolleable -->
    <div class="flex-grow-1 overflow-y-auto px-4 py-4">
      <!-- Accesos Rápidos -->
      <div class="mb-4 d-flex align-center text-subtitle-2 font-weight-bold">
        <v-icon icon="mdi-lightning-bolt-outline" size="small" class="mr-1"></v-icon>
        Accesos rápidos
      </div>
      
      <v-row dense class="mb-6 text-center">
        <v-col cols="3" v-for="qa in quickActions" :key="qa.label">
          <div class="d-flex flex-column align-center justify-center mb-2">
            <v-btn 
              :color="qa.color" 
              variant="flat"
              :class="{'opacity-50': qa.active && !qa.active()}"
              icon 
              size="large" 
              class="mb-1 text-white"
              @click="qa.action"
              elevation="0"
            >
              <v-icon :icon="qa.icon"></v-icon>
            </v-btn>
            <span class="text-caption" style="font-size: 0.65rem !important; line-height: 1.1;">{{ qa.label }}</span>
          </div>
        </v-col>
      </v-row>

      <!-- Tabs Nav -->
      <v-tabs v-model="tab" color="#0f9488" align-tabs="center" class="mb-4" density="compact" show-arrows>
        <v-tab value="vision" class="text-caption px-2 min-w-0" style="text-transform: none;">
          <div class="d-flex flex-column align-center">
            <v-icon size="small" class="mb-1">mdi-eye-outline</v-icon>
            Visión
          </div>
        </v-tab>
        <v-tab value="audio" class="text-caption px-2 min-w-0" style="text-transform: none;">
          <div class="d-flex flex-column align-center">
            <v-icon size="small" class="mb-1">mdi-volume-high</v-icon>
            Audio
          </div>
        </v-tab>
        <v-tab value="media" class="text-caption px-2 min-w-0" style="text-transform: none;">
          <div class="d-flex flex-column align-center">
            <v-icon size="small" class="mb-1">mdi-play-box-outline</v-icon>
            Media
          </div>
        </v-tab>
        <v-tab value="cognitivo" class="text-caption px-2 min-w-0" style="text-transform: none;">
          <div class="d-flex flex-column align-center">
            <v-icon size="small" class="mb-1">mdi-brain</v-icon>
            Cognitivo
          </div>
        </v-tab>
        <v-tab value="voz" class="text-caption px-2 min-w-0" style="text-transform: none;">
          <div class="d-flex flex-column align-center">
            <v-icon size="small" class="mb-1">mdi-microphone-outline</v-icon>
            Voz
          </div>
        </v-tab>
        <v-tab value="motriz" class="text-caption px-2 min-w-0" style="text-transform: none;">
          <div class="d-flex flex-column align-center">
            <v-icon size="small" class="mb-1">mdi-cursor-default-click-outline</v-icon>
            Motriz
          </div>
        </v-tab>
      </v-tabs>

      <!-- Tabs Content -->
      <v-window v-model="tab">
        <v-window-item value="vision">
          <!-- Tamaño de letra -->
          <div class="mb-4">
            <div class="d-flex align-center text-body-2 font-weight-medium mb-1">
              <v-icon size="small" class="mr-2" color="#0f9488">mdi-format-size</v-icon> Tamaño de letra ({{ 100 + store.fontSizeDelta * 10 }}%)
            </div>
            <v-slider v-model="store.fontSizeDelta" min="-5" max="10" step="1" color="#0f9488" hide-details></v-slider>
          </div>
          
          <!-- Zoom -->
          <div class="mb-4">
            <div class="d-flex align-center text-body-2 font-weight-medium mb-1">
              <v-icon size="small" class="mr-2" color="#0f9488">mdi-magnify</v-icon> Zoom ({{ store.zoom }}%)
            </div>
            <v-slider v-model="store.zoom" min="50" max="200" step="10" color="#0f9488" hide-details></v-slider>
          </div>

          <!-- Espaciado Letras -->
          <div class="mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center text-body-2 font-weight-medium">
              <v-icon size="small" class="mr-2" color="#0f9488">mdi-format-letter-spacing</v-icon> Espaciado entre letras
            </div>
            <v-switch v-model="store.letterSpacing" color="#0f9488" hide-details inset></v-switch>
          </div>

          <!-- Espaciado Líneas -->
          <div class="mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center text-body-2 font-weight-medium">
              <v-icon size="small" class="mr-2" color="#0f9488">mdi-format-line-spacing</v-icon> Espaciado entre líneas
            </div>
            <v-switch v-model="store.lineSpacing" color="#0f9488" hide-details inset></v-switch>
          </div>

          <!-- Tipo de fuente -->
          <div class="mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center text-body-2 font-weight-medium">
              <v-icon size="small" class="mr-2" color="#0f9488">mdi-format-font</v-icon> Tipo de fuente
            </div>
            <v-select 
              :model-value="store.dyslexiaFont ? 'OpenDyslexic' : 'Predeterminada'"
              @update:model-value="v => store.dyslexiaFont = (v === 'OpenDyslexic')"
              :items="['Predeterminada', 'OpenDyslexic']" 
              density="compact" variant="outlined" hide-details class="max-w-[150px]"
            ></v-select>
          </div>

          <!-- Tema -->
          <div class="mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center text-body-2 font-weight-medium">
              <v-icon size="small" class="mr-2" color="#0f9488">mdi-theme-light-dark</v-icon> Tema
            </div>
            <v-btn-toggle v-model="store.darkMode" rounded="xl" color="#0f9488" density="compact" mandatory>
              <v-btn :value="false" icon="mdi-white-balance-sun"></v-btn>
              <v-btn :value="true" icon="mdi-weather-night"></v-btn>
            </v-btn-toggle>
          </div>

          <!-- Alto Contraste -->
          <div class="mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center text-body-2 font-weight-medium">
              <v-icon size="small" class="mr-2" color="#0f9488">mdi-contrast-circle</v-icon> Alto contraste
            </div>
            <v-switch v-model="store.highContrast" color="#0f9488" hide-details inset></v-switch>
          </div>

          <!-- Filtro Daltonismo -->
          <div class="mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center text-body-2 font-weight-medium">
              <v-icon size="small" class="mr-2" color="#0f9488">mdi-palette</v-icon> Filtro daltonismo
            </div>
            <v-select 
              v-model="store.colorBlindFilter"
              :items="[{title: 'Ninguno', value: 'none'}, {title: 'Protanopia', value: 'protanopia'}, {title: 'Deuteranopia', value: 'deuteranopia'}, {title: 'Tritanopia', value: 'tritanopia'}]" 
              density="compact" variant="outlined" hide-details class="max-w-[150px]"
            ></v-select>
          </div>

        </v-window-item>

        <v-window-item value="audio">
          <div class="text-body-2 text-center text-medium-emphasis py-8">Configuraciones de Audio aquí</div>
        </v-window-item>
        <v-window-item value="media">
          <div class="text-body-2 text-center text-medium-emphasis py-8">Configuraciones Multimedia aquí</div>
        </v-window-item>
        <v-window-item value="cognitivo">
          <div class="text-body-2 text-center text-medium-emphasis py-8">Configuraciones Cognitivas aquí</div>
        </v-window-item>
        <v-window-item value="voz">
          <div class="text-body-2 text-center text-medium-emphasis py-8">Configuraciones de Voz aquí</div>
        </v-window-item>
        <v-window-item value="motriz">
          <div class="text-body-2 text-center text-medium-emphasis py-8">Configuraciones Motrices aquí</div>
        </v-window-item>
      </v-window>
    </div>

    <v-divider></v-divider>

    <!-- Footer Fijo -->
    <div class="px-4 py-3 d-flex justify-space-between bg-surface" style="gap: 16px;">
      <v-btn variant="outlined" color="medium-emphasis" class="flex-grow-1" @click="store.resetAll" rounded="lg">
        <v-icon start>mdi-restore</v-icon> Restablecer
      </v-btn>
      <v-btn color="#0f9488" class="flex-grow-1 text-white" @click="emit('close')" rounded="lg">
        <v-icon start>mdi-close</v-icon> Cerrar
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.opacity-50 {
  opacity: 0.5;
}
.max-w-[150px] {
  max-width: 150px;
}
</style>
