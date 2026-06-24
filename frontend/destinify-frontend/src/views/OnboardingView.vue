<script setup lang="ts">
import TravelerWizard from '../components/onboarding/TravelerWizard.vue'
</script>

<template>
  <v-container class="fill-height bg-white" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Wizard -->
        <TravelerWizard />
      </v-col>
    </v-row>
  </v-container>
</template>
