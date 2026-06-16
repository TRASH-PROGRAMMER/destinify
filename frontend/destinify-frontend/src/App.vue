<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAccessibility } from './composables/useAccessibility'
import AccessibilityWidget from './components/accessibility/AccessibilityWidget.vue'

// Inicializar la lógica global de accesibilidad (CSS, LocalStorage)
useAccessibility()
</script>

<template>
  <v-app>
    <RouterView />
    <AccessibilityWidget />
  </v-app>
</template>
