<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { initOnboardingPersistence, useOnboardingStore } from '../../store/onboardingStore'

type StepIndex = 1 | 2 | 3
type NoticeType = 'info' | 'success' | 'warning' | 'error'

const store = useOnboardingStore()
const router = useRouter()

const totalSteps = 3
const submitting = ref(false)
const serverError = ref('')
const lastSavedAt = ref<Date | null>(null)
const notice = reactive({
  type: 'info' as NoticeType,
  text: 'Completa el perfil por pasos. Puedes volver y cambiar tus respuestas antes de guardar.',
})

const experienceSuggestions = [
  'Viaje cultural de 4 días con gastronomía local y caminatas ligeras.',
  'Escapada de playa relajada con ecoturismo y actividades para pareja.',
  'Aventura en la sierra con senderismo, pueblos y experiencias auténticas.',
]

const touched = reactive({
  name: false,
  country: false,
  travelerType: false,
  budget: false,
  interests: false,
  whatAreYouLookingFor: false,
})

const steps: Array<{ value: StepIndex; title: string; description: string }> = [
  { value: 1, title: 'Datos basicos', description: 'Contacto y tipo de viajero' },
  { value: 2, title: 'Preferencias', description: 'Presupuesto e intereses' },
  { value: 3, title: 'Personalizacion IA', description: 'Objetivo y aventura' },
]

const countries = ['Ecuador', 'Colombia', 'Peru', 'Argentina', 'Espana', 'Estados Unidos', 'Otro']
const languages = ['Espanol', 'English', 'Francais', 'Deutsch', 'Portugues']

const travelerTypes = [
  {
    value: 'Solo / Independiente',
    label: 'Solo / Independiente',
    detail: 'Flexibilidad, control del presupuesto y ritmo propio.',
  },
  {
    value: 'En pareja',
    label: 'En pareja',
    detail: 'Experiencias compartidas, comodidad y momentos especiales.',
  },
  {
    value: 'Familia',
    label: 'Familia',
    detail: 'Actividades seguras, tiempos realistas y servicios practicos.',
  },
  {
    value: 'Con amigos',
    label: 'Con amigos',
    detail: 'Aventura, vida local y actividades para grupos.',
  },
  {
    value: 'Negocios',
    label: 'Negocios',
    detail: 'Eficiencia, ubicacion y reservas sin friccion.',
  },
]

const interestOptions = [
  'Naturaleza',
  'Gastronomia',
  'Cultura',
  'Aventura',
  'Playas',
  'Patrimonio',
  'Fotografia',
  'Ecoturismo',
  'Deportes',
  'Historia',
]

const accessibilityOptions = [
  'Silla de ruedas',
  'Audicion',
  'Vision reducida',
  'Neurodivergencia',
  'Movilidad reducida',
]

const budgetOptions = ['Hasta $300', '$300 - $700', '$700 - $1500', 'Mas de $1500']
const climateOptions = ['Tropical', 'Templado', 'Frio', 'Seco', 'Lluvioso', 'Cualquiera']

onMounted(() => {
  normalizeStore()
  initOnboardingPersistence()
  lastSavedAt.value = new Date()
})

function markSaved() {
  lastSavedAt.value = new Date()
}

const currentStep = computed<StepIndex>(() => {
  if ([1, 2, 3].includes(store.step)) return store.step as StepIndex
  return 1
})

const currentStepTitle = computed(() => steps.find((step) => step.value === currentStep.value)?.title ?? steps[0].title)
const progress = computed(() => `${Math.round((currentStep.value / totalSteps) * 100)}%`)

const isValidStep1 = computed(() => {
  return (
    store.basicData.name.trim().length >= 2 &&
    store.basicData.country !== '' &&
    store.basicData.travelerType !== ''
  )
})

const isValidStep2 = computed(() => {
  return store.preferences.budget !== '' && store.preferences.interests.length > 0
})

const experienceText = computed(() => store.customization.whatAreYouLookingFor.trim())
const experienceCharCount = computed(() => experienceText.value.length)
const experienceWordCount = computed(() =>
  experienceText.value ? experienceText.value.split(/\s+/).filter(Boolean).length : 0,
)

const isValidStep3 = computed(() => experienceCharCount.value >= 12 && experienceWordCount.value >= 3)

const adventureLevelDisplay = computed(() => {
  const level = Number(store.customization.adventureLevel)
  if (level >= 1 && level <= 5) return level
  return Math.max(1, Math.min(5, Math.round(level / 20)))
})

const canSubmit = computed(() => isValidStep1.value && isValidStep2.value && isValidStep3.value)

const autosaveLabel = computed(() => {
  if (!lastSavedAt.value) return 'Guardado automatico activo'
  return `Guardado ${lastSavedAt.value.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}`
})

const completedSteps = computed(() => [
  isValidStep1.value,
  isValidStep2.value,
  isValidStep3.value,
])

const selectedTravelerType = computed(() => {
  return travelerTypes.find((type) => type.value === store.basicData.travelerType)?.label ?? 'Pendiente'
})

const summaryRows = computed(() => [
  { label: 'Nombre', value: store.basicData.name.trim() || 'Pendiente' },
  { label: 'Pais', value: store.basicData.country || 'Pendiente' },
  { label: 'Idioma', value: store.basicData.language || 'Pendiente' },
  { label: 'Tipo', value: selectedTravelerType.value },
  { label: 'Presupuesto', value: store.preferences.budget || 'Pendiente' },
  { label: 'Aventura', value: `${adventureLevelDisplay.value}/5` },
  {
    label: 'Experiencia',
    value: experienceText.value
      ? experienceText.value.length > 72
        ? `${experienceText.value.slice(0, 72)}...`
        : experienceText.value
      : 'Pendiente',
  },
])

function normalizeStore() {
  if (![1, 2, 3].includes(store.step)) store.step = 1
  if (typeof store.preferences.budget !== 'string') store.preferences.budget = ''
  if (!store.basicData.language) store.basicData.language = 'Espanol'
  if (!Array.isArray(store.preferences.interests)) store.preferences.interests = []
  if (!Array.isArray(store.preferences.accessibility)) store.preferences.accessibility = []

  const adventure = Number(store.customization.adventureLevel)
  if (!Number.isFinite(adventure) || adventure < 1 || adventure > 5) {
    store.customization.adventureLevel = 3
  }
}

function applyExperienceSuggestion(text: string) {
  store.customization.whatAreYouLookingFor = text
  touched.whatAreYouLookingFor = true
  markSaved()
  setNotice('Ejemplo aplicado. Ajustalo con tus preferencias reales.', 'success')
}

function setNotice(text: string, type: NoticeType = 'info') {
  notice.text = text
  notice.type = type
}

function setStep(step: StepIndex) {
  if (step <= currentStep.value) {
    store.step = step
    setNotice('Puedes revisar y ajustar este paso.', 'info')
    return
  }

  if (!validateStep(currentStep.value)) {
    setNotice('Revisa los campos marcados antes de continuar.', 'error')
    return
  }

  store.step = step
  setNotice('Paso completado. Continua con la siguiente seccion.', 'success')
}

function validateStep(step: StepIndex) {
  if (step === 1) {
    touched.name = true
    touched.country = true
    touched.travelerType = true
    return isValidStep1.value
  }

  if (step === 2) {
    touched.budget = true
    touched.interests = true
    return isValidStep2.value
  }

  touched.whatAreYouLookingFor = true
  return isValidStep3.value
}

function nextStep() {
  if (!validateStep(currentStep.value)) {
    setNotice('Completa lo requerido para avanzar sin perder contexto.', 'error')
    return
  }

  store.step = Math.min(currentStep.value + 1, totalSteps)
  markSaved()
  setNotice('Paso completado. Tus cambios se guardan automaticamente.', 'success')
}

function previousStep() {
  store.step = Math.max(currentStep.value - 1, 1)
  setNotice('Puedes cambiar tus respuestas antes de crear el perfil.', 'info')
}

function toggleInterest(interest: string) {
  touched.interests = true

  if (store.preferences.interests.includes(interest)) {
    store.preferences.interests = store.preferences.interests.filter((item: string) => item !== interest)
    return
  }

  if (store.preferences.interests.length >= 5) {
    setNotice('Selecciona hasta 5 intereses para mantener recomendaciones precisas.', 'warning')
    return
  }

  store.preferences.interests = [...store.preferences.interests, interest]
}

function toggleAccessibility(option: string) {
  if (store.preferences.accessibility.includes(option)) {
    store.preferences.accessibility = store.preferences.accessibility.filter((item: string) => item !== option)
    return
  }

  store.preferences.accessibility = [...store.preferences.accessibility, option]
}

function applySmartDefaults() {
  store.preferences.budget = '$300 - $700'
  store.preferences.interests = ['Naturaleza', 'Cultura', 'Gastronomia']
  store.preferences.climate = 'Cualquiera'
  touched.budget = true
  touched.interests = true
  setNotice('Preferencias base aplicadas. Ajustalas si necesitas otro tipo de viaje.', 'success')
}

async function submitForm() {
  serverError.value = ''

  if (!validateStep(1)) {
    store.step = 1
    setNotice('Revisa los datos basicos antes de guardar.', 'error')
    return
  }

  if (!validateStep(2)) {
    store.step = 2
    setNotice('Falta presupuesto o al menos un interes.', 'error')
    return
  }

  if (!validateStep(3)) {
    store.step = 3
    setNotice('Describe con un poco mas de detalle la experiencia que buscas.', 'error')
    return
  }

  if (submitting.value) return
  submitting.value = true

  try {
    await store.submitToBackend()
    store.clearData()
    await router.push('/perfil')
  } catch {
    serverError.value = 'No pudimos guardar tu perfil. Intenta nuevamente.'
    setNotice(serverError.value, 'error')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="traveler-wizard" aria-labelledby="traveler-wizard-title">
    <header class="wizard-header">
      <RouterLink to="/" class="wizard-logo" aria-label="Volver al inicio">
        <span class="wizard-logo__mark">
          <v-icon icon="mdi-compass-outline" size="22"></v-icon>
        </span>
        <span>Destinify</span>
      </RouterLink>

      <div class="wizard-header__content">
        <p class="wizard-eyebrow">Perfil viajero</p>
        <h1 id="traveler-wizard-title">Crea tu perfil de viajero</h1>
        <p>
          Configura tus preferencias para que Destinify recomiende destinos, reservas y alertas con menos friccion.
        </p>
      </div>
    </header>

    <div class="wizard-card">
      <div class="wizard-progress" aria-label="Progreso del formulario">
        <div class="wizard-progress__meta">
          <span>Paso {{ currentStep }} de {{ totalSteps }}</span>
          <strong>{{ currentStepTitle }}</strong>
        </div>
        <div class="wizard-progress__track">
          <span :style="{ width: progress }"></span>
        </div>
        <nav class="wizard-steps" aria-label="Pasos del perfil">
          <button
            v-for="step in steps"
            :key="step.value"
            type="button"
            class="wizard-step"
            :class="{
              'wizard-step--active': currentStep === step.value,
              'wizard-step--complete': completedSteps[step.value - 1],
            }"
            :aria-current="currentStep === step.value ? 'step' : undefined"
            @click="setStep(step.value)"
          >
            <span class="wizard-step__badge">
              <v-icon
                v-if="completedSteps[step.value - 1] && currentStep !== step.value"
                icon="mdi-check"
                size="18"
              />
              <template v-else>{{ step.value }}</template>
            </span>
            <strong>{{ step.title }}</strong>
            <small>{{ step.description }}</small>
          </button>
        </nav>
      </div>

      <div v-if="serverError" class="wizard-notice wizard-notice--error" role="alert">
        <span aria-hidden="true"></span>
        {{ serverError }}
      </div>

      <div class="wizard-notice" :class="`wizard-notice--${notice.type}`" role="status" aria-live="polite">
        <span aria-hidden="true"></span>
        {{ notice.text }}
      </div>

      <form class="wizard-layout" novalidate @submit.prevent="submitForm">
        <div class="wizard-main">
          <section v-show="currentStep === 1" class="wizard-panel" aria-labelledby="step-one-title">
            <div class="wizard-panel__heading">
              <p>Datos basicos</p>
              <h2 id="step-one-title">Informacion del viajero</h2>
            </div>

            <div class="form-grid form-grid--two">
              <label class="form-field" :data-invalid="touched.name && store.basicData.name.trim().length < 2">
                <span>Nombre completo *</span>
                <input
                  v-model="store.basicData.name"
                  type="text"
                  autocomplete="name"
                  placeholder="Ej. Maria Gonzalez"
                  @blur="touched.name = true"
                />
                <small v-if="touched.name && store.basicData.name.trim().length < 2">
                  Escribe al menos 2 caracteres.
                </small>
              </label>

              <label class="form-field" :data-invalid="touched.country && !store.basicData.country">
                <span>Pais *</span>
                <select v-model="store.basicData.country" @blur="touched.country = true">
                  <option value="" disabled>Selecciona tu pais</option>
                  <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                </select>
                <small v-if="touched.country && !store.basicData.country">Selecciona un pais.</small>
              </label>

              <label class="form-field">
                <span>Idioma preferido</span>
                <select v-model="store.basicData.language">
                  <option v-for="language in languages" :key="language" :value="language">{{ language }}</option>
                </select>
              </label>
            </div>

            <fieldset class="choice-group" :data-invalid="touched.travelerType && !store.basicData.travelerType">
              <legend>Tipo de viajero *</legend>
              <div class="choice-grid">
                <button
                  v-for="type in travelerTypes"
                  :key="type.value"
                  type="button"
                  class="choice-card"
                  :class="{ 'choice-card--selected': store.basicData.travelerType === type.value }"
                  :aria-pressed="store.basicData.travelerType === type.value"
                   @click="store.basicData.travelerType = type.value; touched.travelerType = true"
                >
                  <strong>{{ type.label }}</strong>
                  <span>{{ type.detail }}</span>
                </button>
              </div>
              <small v-if="touched.travelerType && !store.basicData.travelerType" class="field-error">
                Selecciona un tipo de viajero.
              </small>
            </fieldset>
          </section>

          <section v-show="currentStep === 2" class="wizard-panel" aria-labelledby="step-two-title">
            <div class="wizard-panel__heading wizard-panel__heading--split">
              <div>
                <p>Preferencias</p>
                <h2 id="step-two-title">Prioridades para recomendar</h2>
              </div>
              <button type="button" class="link-action" @click="applySmartDefaults">Sugerir base</button>
            </div>

            <div class="form-grid form-grid--two">
              <label class="form-field" :data-invalid="touched.budget && !store.preferences.budget">
                <span>Presupuesto *</span>
                <select v-model="store.preferences.budget" @blur="touched.budget = true">
                  <option value="" disabled>Selecciona un rango</option>
                  <option v-for="budget in budgetOptions" :key="budget" :value="budget">{{ budget }}</option>
                </select>
                <small v-if="touched.budget && !store.preferences.budget">Selecciona un presupuesto.</small>
              </label>

              <label class="form-field">
                <span>Clima preferido</span>
                <select v-model="store.preferences.climate">
                  <option value="">Sin preferencia</option>
                  <option v-for="climate in climateOptions" :key="climate" :value="climate">{{ climate }}</option>
                </select>
              </label>
            </div>

            <fieldset class="choice-group" :data-invalid="touched.interests && !store.preferences.interests.length">
              <legend>Intereses * <span>{{ store.preferences.interests.length }} de 5</span></legend>
              <div class="chip-list">
                <button
                  v-for="interest in interestOptions"
                  :key="interest"
                  type="button"
                  class="chip-button"
                  :class="{ 'chip-button--selected': store.preferences.interests.includes(interest) }"
                  :aria-pressed="store.preferences.interests.includes(interest)"
                  @click="toggleInterest(interest)"
                >
                  {{ interest }}
                </button>
              </div>
              <small v-if="touched.interests && !store.preferences.interests.length" class="field-error">
                Selecciona al menos un interes.
              </small>
            </fieldset>

            <fieldset class="choice-group">
              <legend>Accesibilidad preferida</legend>
              <div class="chip-list">
                <button
                  v-for="option in accessibilityOptions"
                  :key="option"
                  type="button"
                  class="chip-button"
                  :class="{ 'chip-button--selected': store.preferences.accessibility.includes(option) }"
                  :aria-pressed="store.preferences.accessibility.includes(option)"
                  @click="toggleAccessibility(option)"
                >
                  {{ option }}
                </button>
              </div>
            </fieldset>
          </section>

          <section v-show="currentStep === 3" class="wizard-panel" aria-labelledby="step-three-title">
            <div class="wizard-panel__heading">
              <p>Personalizacion IA</p>
              <h2 id="step-three-title">Que experiencia buscas</h2>
            </div>

            <label
              class="form-field"
              :data-invalid="touched.whatAreYouLookingFor && !isValidStep3"
            >
              <span class="field-label">
                <v-icon icon="mdi-shimmer" size="18" aria-hidden="true" />
                Que experiencia buscas? *
              </span>
              <textarea
                v-model="store.customization.whatAreYouLookingFor"
                rows="4"
                maxlength="400"
                aria-describedby="experience-help experience-counter"
                placeholder="Ej. Quiero un viaje de 4 dias por la sierra, con cultura, comida local y caminatas ligeras."
                @blur="touched.whatAreYouLookingFor = true; markSaved()"
                @input="markSaved()"
              ></textarea>
              <div class="field-meta">
                <small id="experience-help" class="field-hint">
                  La IA usara esto para construir tu itinerario.
                </small>
                <small
                  id="experience-counter"
                  class="field-counter"
                  :class="{ 'field-counter--valid': isValidStep3 }"
                >
                  {{ experienceCharCount }}/400 · min. 12 caracteres y 3 palabras
                </small>
              </div>
              <small v-if="touched.whatAreYouLookingFor && !isValidStep3" class="field-error">
                Describe tu viaje con mas detalle (al menos 12 caracteres y 3 palabras).
              </small>
            </label>

            <div class="suggestion-group" aria-label="Ejemplos de experiencia">
              <p>Usa un ejemplo y editalo:</p>
              <div class="chip-list">
                <button
                  v-for="suggestion in experienceSuggestions"
                  :key="suggestion"
                  type="button"
                  class="chip-button"
                  @click="applyExperienceSuggestion(suggestion)"
                >
                  {{ suggestion.slice(0, 42) }}...
                </button>
              </div>
            </div>

            <label class="range-field">
              <span class="field-label">
                <v-icon icon="mdi-image-filter-hdr" size="18" aria-hidden="true" />
                Nivel de aventura: {{ adventureLevelDisplay }}/5
              </span>
              <input
                v-model.number="store.customization.adventureLevel"
                type="range"
                min="1"
                max="5"
                step="1"
                list="adventure-levels"
                aria-valuemin="1"
                aria-valuemax="5"
                :aria-valuenow="adventureLevelDisplay"
                @input="markSaved()"
              />
              <datalist id="adventure-levels">
                <option value="1" label="1" />
                <option value="2" label="2" />
                <option value="3" label="3" />
                <option value="4" label="4" />
                <option value="5" label="5" />
              </datalist>
              <div class="range-scale" aria-hidden="true">
                <span v-for="level in 5" :key="level" :class="{ 'range-scale__active': level <= adventureLevelDisplay }">
                  {{ level }}
                </span>
              </div>
              <small><span>Relajado</span><span>Extremo</span></small>
            </label>

            <label class="form-field">
              <span class="field-label">
                <v-icon icon="mdi-airplane" size="18" aria-hidden="true" />
                Viajes anteriores
              </span>
              <textarea
                v-model="store.customization.pastTrips"
                rows="3"
                maxlength="250"
                placeholder="Ej. Quito, Cuenca, Galapagos..."
                @input="markSaved()"
              ></textarea>
              <small class="field-hint">Opcional. Ayuda a la IA a entender tu historial de viajes.</small>
            </label>
          </section>
        </div>

        <aside class="wizard-summary" aria-label="Resumen del perfil">
          <h2>Resumen</h2>
          <dl>
            <div v-for="row in summaryRows" :key="row.label">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>

          <div>
            <p>Intereses</p>
            <div v-if="store.preferences.interests.length" class="summary-chips">
              <span v-for="interest in store.preferences.interests" :key="interest">{{ interest }}</span>
            </div>
            <small v-else>Pendiente</small>
          </div>
        </aside>

        <footer class="wizard-footer">
          <span class="autosave-status">
            <span aria-hidden="true"></span>
            {{ autosaveLabel }}
          </span>

          <div class="wizard-actions">
            <button v-if="currentStep > 1" type="button" class="secondary-action" @click="previousStep">
              <v-icon icon="mdi-arrow-left" size="18" aria-hidden="true" />
              Atras
            </button>
            <button v-if="currentStep < totalSteps" type="button" class="primary-action" @click="nextStep">
              Siguiente
              <v-icon icon="mdi-arrow-right" size="18" aria-hidden="true" />
            </button>
            <button v-else type="submit" class="primary-action" :disabled="submitting || !canSubmit">
              <v-icon v-if="!submitting" icon="mdi-check-circle-outline" size="18" aria-hidden="true" />
              {{ submitting ? 'Guardando...' : 'Crear mi perfil' }}
            </button>
          </div>
        </footer>
      </form>
    </div>
  </section>
</template>

<style scoped>
.traveler-wizard {
  min-height: 100vh;
  background:
    radial-gradient(circle at 12% 8%, rgba(15, 148, 136, 0.14), transparent 28rem),
    #f5faf8;
  padding: 28px 16px 48px;
  color: var(--destinify-ink);
}

.wizard-header,
.wizard-card {
  width: min(1120px, 100%);
  margin-inline: auto;
}

.wizard-header {
  display: grid;
  gap: 28px;
  margin-bottom: 24px;
}

.wizard-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  color: var(--destinify-ink);
  font-size: 1.08rem;
  font-weight: 900;
}

.wizard-logo__mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 16px;
  background: var(--destinify-teal);
  color: #ffffff;
}

.wizard-header__content {
  max-width: 760px;
}

.wizard-eyebrow {
  margin: 0 0 10px;
  color: var(--destinify-orange);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.wizard-header h1 {
  margin: 0;
  color: var(--destinify-ink);
  font-size: clamp(2rem, 5vw, 4.4rem);
  font-weight: 950;
  line-height: 1.02;
}

.wizard-header p:not(.wizard-eyebrow) {
  margin: 16px 0 0;
  max-width: 680px;
  color: var(--destinify-muted);
  font-size: 1rem;
  line-height: 1.7;
}

.wizard-card {
  overflow: hidden;
  border: 1px solid var(--destinify-line);
  border-radius: 30px;
  background: #ffffff;
  box-shadow: 0 24px 70px rgba(18, 44, 43, 0.12);
}

.wizard-progress,
.wizard-layout {
  padding: 28px;
}

.wizard-progress {
  border-bottom: 1px solid var(--destinify-line);
  background: linear-gradient(180deg, #ffffff, #f8fcfb);
}

.wizard-progress__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--destinify-muted);
  font-size: 0.9rem;
  font-weight: 800;
}

.wizard-progress__meta strong {
  color: var(--destinify-ink);
}

.wizard-progress__track {
  height: 10px;
  overflow: hidden;
  margin-top: 14px;
  border-radius: 999px;
  background: #e8f7f3;
}

.wizard-progress__track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--destinify-teal), var(--destinify-orange));
  transition: width 0.25s ease;
}

.wizard-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.wizard-step {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 8px 12px;
  min-height: 86px;
  border: 1px solid var(--destinify-line);
  border-radius: 18px;
  background: #ffffff;
  padding: 14px;
  text-align: left;
}

.wizard-step__badge {
  display: grid;
  grid-row: span 2;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 999px;
  background: #f4faf8;
  color: var(--destinify-ink);
  font-weight: 900;
}

.wizard-step strong,
.wizard-step small {
  display: block;
}

.wizard-step strong {
  color: var(--destinify-ink);
  font-size: 0.9rem;
  font-weight: 900;
}

.wizard-step small {
  color: var(--destinify-muted);
  font-size: 0.76rem;
  line-height: 1.35;
}

.wizard-step--active {
  border-color: var(--destinify-teal);
  background: #eef8f5;
}

.wizard-step--complete .wizard-step__badge {
  background: var(--destinify-teal);
  color: #ffffff;
}

.wizard-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 22px 28px 0;
  border: 1px solid var(--destinify-line);
  border-radius: 18px;
  padding: 12px 14px;
  color: var(--destinify-muted);
  font-size: 0.88rem;
  font-weight: 800;
  line-height: 1.45;
}

.wizard-notice span {
  flex: 0 0 10px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: currentColor;
}

.wizard-notice--success {
  border-color: #bfe7d8;
  background: #eef8f5;
  color: #0a756c;
}

.wizard-notice--warning {
  border-color: #fed7aa;
  background: #fff7ed;
  color: #b45309;
}

.wizard-notice--error {
  border-color: #fecaca;
  background: #fff1f0;
  color: #b42318;
}

.wizard-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 28px;
}

.wizard-panel {
  display: grid;
  gap: 24px;
}

.wizard-panel__heading {
  display: grid;
  gap: 6px;
}

.wizard-panel__heading--split {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
}

.wizard-panel__heading p {
  margin: 0;
  color: var(--destinify-orange);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.wizard-panel__heading h2,
.wizard-summary h2 {
  margin: 0;
  color: var(--destinify-ink);
  font-size: 1.35rem;
  font-weight: 950;
}

.form-grid {
  display: grid;
  gap: 16px;
}

.form-grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.form-field {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.form-field span,
.choice-group legend,
.range-field span,
.field-label {
  color: var(--destinify-ink);
  font-size: 0.92rem;
  font-weight: 900;
}

.field-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.field-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.field-hint {
  color: var(--destinify-muted);
  font-size: 0.82rem;
  font-weight: 700;
}

.field-counter {
  color: var(--destinify-muted);
  font-size: 0.78rem;
  font-weight: 800;
  white-space: nowrap;
}

.field-counter--valid {
  color: #0a756c;
}

.suggestion-group {
  display: grid;
  gap: 10px;
}

.suggestion-group p {
  margin: 0;
  color: var(--destinify-muted);
  font-size: 0.82rem;
  font-weight: 800;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  min-height: 52px;
  border: 2px solid var(--destinify-line);
  border-radius: 16px;
  background: #ffffff;
  padding: 0 15px;
  color: var(--destinify-ink);
  outline: none;
}

.form-field textarea {
  min-height: 128px;
  padding-block: 14px;
  resize: vertical;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: var(--destinify-teal);
  box-shadow: 0 0 0 4px rgba(15, 148, 136, 0.14);
}

.form-field[data-invalid='true'] input,
.form-field[data-invalid='true'] select,
.form-field[data-invalid='true'] textarea {
  border-color: #dc2626;
}

.form-field small,
.field-error {
  color: #b42318;
  font-size: 0.82rem;
  font-weight: 800;
}

.choice-group {
  display: grid;
  gap: 12px;
  min-width: 0;
  margin: 0;
  border: 0;
  padding: 0;
}

.choice-group legend {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 4px;
}

.choice-group legend span {
  color: var(--destinify-muted);
  font-size: 0.82rem;
}

.choice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.choice-card {
  position: relative;
  display: grid;
  min-height: 112px;
  gap: 6px;
  border: 2px solid var(--destinify-line);
  border-radius: 18px;
  background: #ffffff;
  padding: 16px;
  text-align: left;
}

.choice-card strong {
  padding-right: 20px;
  color: var(--destinify-ink);
  font-size: 0.95rem;
  font-weight: 950;
}

.choice-card span {
  color: var(--destinify-muted);
  font-size: 0.82rem;
  line-height: 1.45;
}

.choice-card--selected {
  border-color: var(--destinify-teal);
  background: #eef8f5;
}

.choice-card--selected::after {
  content: '';
  position: absolute;
  top: 14px;
  right: 14px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--destinify-teal);
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.chip-button {
  min-height: 44px;
  border: 2px solid var(--destinify-line);
  border-radius: 999px;
  background: #ffffff;
  padding: 0 15px;
  color: var(--destinify-ink);
  font-size: 0.88rem;
  font-weight: 850;
}

.chip-button--selected {
  border-color: var(--destinify-teal);
  background: #eef8f5;
  color: #0a756c;
}

.link-action {
  border: 0;
  background: transparent;
  color: var(--destinify-teal);
  font-weight: 900;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.range-field {
  display: grid;
  gap: 12px;
}

.range-field input {
  accent-color: var(--destinify-teal);
}

.range-scale {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
}

.range-scale span {
  display: grid;
  place-items: center;
  min-height: 28px;
  border-radius: 999px;
  background: #eef4f2;
  color: var(--destinify-muted);
  font-size: 0.78rem;
  font-weight: 900;
}

.range-scale__active {
  background: #eef8f5;
  color: #0a756c;
}

.range-field small {
  display: flex;
  justify-content: space-between;
  color: var(--destinify-muted);
  font-weight: 800;
}

.wizard-summary {
  align-self: start;
  display: grid;
  gap: 18px;
  border-left: 1px solid var(--destinify-line);
  padding-left: 28px;
}

.wizard-summary dl {
  display: grid;
  gap: 12px;
  margin: 0;
}

.wizard-summary dt,
.wizard-summary p {
  margin: 0;
  color: var(--destinify-muted);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.wizard-summary dd {
  margin: 3px 0 0;
  color: var(--destinify-ink);
  font-size: 0.92rem;
  font-weight: 850;
  overflow-wrap: anywhere;
}

.summary-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.summary-chips span {
  border-radius: 999px;
  background: #eef8f5;
  padding: 6px 10px;
  color: #0a756c;
  font-size: 0.78rem;
  font-weight: 900;
}

.wizard-footer {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border-top: 1px solid var(--destinify-line);
  padding-top: 24px;
}

.autosave-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: #eef8f5;
  padding: 8px 12px;
  color: var(--destinify-teal);
  font-size: 0.8rem;
  font-weight: 900;
}

.autosave-status span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
}

.wizard-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  border-radius: 999px;
  padding: 0 20px;
  font-size: 0.9rem;
  font-weight: 950;
}

.primary-action {
  border: 1px solid var(--destinify-orange);
  background: var(--destinify-orange);
  color: #ffffff;
  box-shadow: 0 14px 28px rgba(255, 138, 42, 0.22);
}

.primary-action:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  box-shadow: none;
}

.secondary-action {
  border: 1px solid var(--destinify-line);
  background: #ffffff;
  color: var(--destinify-ink);
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
a:focus-visible {
  outline: 3px solid rgba(255, 138, 42, 0.55);
  outline-offset: 3px;
}

@media (max-width: 980px) {
  .wizard-layout {
    grid-template-columns: 1fr;
  }

  .wizard-summary {
    border-left: 0;
    border-top: 1px solid var(--destinify-line);
    padding-top: 24px;
    padding-left: 0;
  }
}

@media (max-width: 740px) {
  .traveler-wizard {
    padding: 20px 12px 36px;
  }

  .wizard-progress,
  .wizard-layout {
    padding: 20px;
  }

  .wizard-notice {
    margin-inline: 20px;
  }

  .wizard-steps,
  .form-grid--two,
  .choice-grid {
    grid-template-columns: 1fr;
  }

  .wizard-panel__heading--split,
  .wizard-footer {
    display: grid;
    grid-template-columns: 1fr;
  }

  .wizard-actions {
    justify-content: stretch;
  }

  .primary-action,
  .secondary-action {
    flex: 1;
  }
}
</style>
