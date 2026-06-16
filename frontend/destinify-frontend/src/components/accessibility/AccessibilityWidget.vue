<script setup lang="ts">
import { ref } from 'vue'
import AccessibilityMenu from './AccessibilityMenu.vue'

const drawer = ref(false)
</script>

<template>
  <!-- Widget Flotante -->
  <v-btn
    icon="mdi-human"
    color="primary"
    size="x-large"
    elevation="8"
    class="accessibility-fab"
    @click="drawer = !drawer"
    aria-label="Abrir menú de accesibilidad"
  ></v-btn>

  <!-- Panel Lateral (Drawer) -->
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    width="400"
    class="accessibility-drawer"
  >
    <AccessibilityMenu @close="drawer = false" />
  </v-navigation-drawer>
</template>

<style scoped>
.accessibility-fab {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 9999;
  border-radius: 50% !important;
}

.accessibility-drawer {
  z-index: 10000 !important;
}
</style>
