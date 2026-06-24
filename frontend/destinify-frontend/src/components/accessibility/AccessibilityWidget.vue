<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { computed } from 'vue'
import AccessibilityMenu from './AccessibilityMenu.vue'
import { useAccessibilityStore } from '../../store/accessibilityStore'

const drawer = ref(false)
const store = useAccessibilityStore()

const motionEnabled = computed(() => store.motionEnabled)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.altKey) {
    if (e.key.toLowerCase() === 'a') {
      e.preventDefault()
      drawer.value = !drawer.value
    } else if (e.key === '+') {
      e.preventDefault()
      store.toggleFontSize('increase')
    } else if (e.key === '-') {
      e.preventDefault()
      store.toggleFontSize('decrease')
    } else if (e.key.toLowerCase() === 'c') {
      e.preventDefault()
      store.highContrast = !store.highContrast
    }
  }
  
  if (e.key === 'Escape' && drawer.value) {
    drawer.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="fixed bottom-6 left-6 z-50">
    <transition name="scale-fade" appear>
      <v-btn
        icon
        size="x-large"
        elevation="4"
        rounded="xl"
        class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target bg-[#0f9488] text-white shadow-lg shadow-teal-900/20 transition-transform hover:scale-105"
        @click="drawer = true"
        :aria-label="motionEnabled ? 'Abrir menú de accesibilidad' : 'Abrir menú de accesibilidad, animaciones desactivadas'"
      >
        <v-icon icon="mdi-human-capacity-increase" size="24"></v-icon>
        <v-tooltip activator="parent" location="right">Accesibilidad (Ctrl+Alt+A)</v-tooltip>
      </v-btn>
    </transition>

    <v-navigation-drawer
      v-model="drawer"
      location="left"
      temporary
      width="380"
      class="rounded-r-2xl shadow-2xl"
    >
      <AccessibilityMenu @close="drawer = false" />
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.scale-fade-enter-to,
.scale-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.focus-ring:focus-visible {
  outline: 3px solid rgba(255, 138, 42, 0.55);
  outline-offset: 3px;
}
</style>