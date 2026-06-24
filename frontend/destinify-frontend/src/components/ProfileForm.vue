<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'

type ScalarField = 'name' | 'email' | 'budget' | 'language' | 'travelStyle'
type NoticeType = 'success' | 'error' | 'warning' | 'info'

export interface TravelerProfileForm {
  name: string
  email: string
  budget: string
  language: string
  travelStyle: string
  interests: string[]
  accessibilityNeeds: string[]
}

const emit = defineEmits<{
  save: [profile: TravelerProfileForm]
}>()

const draftKey = 'destinify.profileDraft'
const currentStep = ref(0)
const isSubmitting = ref(false)
const touchedInterests = ref(false)
const draftStatus = ref('Listo para editar')
const notice = reactive({
  text: 'Completa el perfil por pasos. Puedes volver y ajustar cualquier dato.',
  type: 'info' as NoticeType,
})

const touched = reactive<Record<ScalarField, boolean>>({
  name: false,
  email: false,
  budget: false,
  language: false,
  travelStyle: false,
})

function createInitialProfile(): TravelerProfileForm {
  return {
    name: '',
    email: '',
    budget: '$300 - $700',
    language: 'Espanol',
    travelStyle: '',
    interests: [],
    accessibilityNeeds: [],
  }
}

const profile = reactive<TravelerProfileForm>(createInitialProfile())
const previousProfile = ref<TravelerProfileForm | null>(null)

const steps = [
  {
    title: 'Datos',
    description: 'Contacto del viajero',
  },
  {
    title: 'Preferencias',
    description: 'Presupuesto, idioma e intereses',
  },
  {
    title: 'Ajustes',
    description: 'Accesibilidad y revision',
  },
]

const budgetOptions = [
  {
    value: 'Hasta $300',
    label: 'Economico',
    detail: 'Alojamiento sencillo y actividades esenciales.',
  },
  {
    value: '$300 - $700',
    label: 'Equilibrado',
    detail: 'Comodidad, tours guiados y margen para imprevistos.',
  },
  {
    value: 'Mas de $700',
    label: 'Premium',
    detail: 'Hospedaje superior y experiencias privadas.',
  },
]

const languageOptions = [
  { value: 'Espanol', label: 'Espanol' },
  { value: 'Ingles', label: 'Ingles' },
  { value: 'Frances', label: 'Frances' },
  { value: 'Portugues', label: 'Portugues' },
]

const styleOptions = [
  {
    value: 'Aventura flexible',
    label: 'Aventura flexible',
    detail: 'Planes abiertos con actividades al aire libre.',
  },
  {
    value: 'Viaje organizado',
    label: 'Viaje organizado',
    detail: 'Agenda clara, reservas y tiempos definidos.',
  },
  {
    value: 'Bajo costo',
    label: 'Bajo costo',
    detail: 'Opciones practicas para cuidar presupuesto.',
  },
  {
    value: 'Premium',
    label: 'Premium',
    detail: 'Mas confort, menos friccion y servicios curados.',
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
  'Bienestar',
]

const accessibilityOptions = [
  {
    value: 'Visual',
    label: 'Apoyo visual',
    detail: 'Priorizar alto contraste e informacion facil de escanear.',
  },
  {
    value: 'Auditiva',
    label: 'Apoyo auditivo',
    detail: 'Evitar depender solo de audio o avisos sonoros.',
  },
  {
    value: 'Motriz',
    label: 'Apoyo motriz',
    detail: 'Recomendar rutas y servicios con menor esfuerzo fisico.',
  },
  {
    value: 'Lectura facil',
    label: 'Lectura facil',
    detail: 'Mantener instrucciones cortas y decisiones simples.',
  },
]

const fieldErrors = computed<Record<ScalarField, string>>(() => ({
  name: validateName(profile.name),
  email: validateEmail(profile.email),
  budget: profile.budget ? '' : 'Selecciona un presupuesto.',
  language: profile.language ? '' : 'Selecciona un idioma.',
  travelStyle: profile.travelStyle ? '' : 'Selecciona un tipo de viaje.',
}))

const identityComplete = computed(() => !fieldErrors.value.name && !fieldErrors.value.email)
const preferencesComplete = computed(
  () =>
    !fieldErrors.value.budget &&
    !fieldErrors.value.language &&
    !fieldErrors.value.travelStyle &&
    profile.interests.length > 0,
)
const accessibilityComplete = computed(() => true)

const stepCompletion = computed(() => [
  identityComplete.value,
  preferencesComplete.value,
  accessibilityComplete.value,
])

const completedRequiredSteps = computed(
  () => [identityComplete.value, preferencesComplete.value].filter(Boolean).length,
)

const progressPercent = computed(() => `${Math.round(((currentStep.value + 1) / steps.length) * 100)}%`)

const isFormComplete = computed(() => identityComplete.value && preferencesComplete.value)

const selectedBudget = computed(
  () => budgetOptions.find((option) => option.value === profile.budget)?.label ?? 'Pendiente',
)

const selectedLanguage = computed(
  () => languageOptions.find((option) => option.value === profile.language)?.label ?? 'Pendiente',
)

const selectedStyle = computed(
  () => styleOptions.find((option) => option.value === profile.travelStyle)?.label ?? 'Pendiente',
)

const summaryRows = computed(() => [
  { label: 'Nombre', value: profile.name.trim() || 'Pendiente' },
  { label: 'Correo', value: profile.email.trim() || 'Pendiente' },
  { label: 'Presupuesto', value: selectedBudget.value },
  { label: 'Idioma', value: selectedLanguage.value },
  { label: 'Tipo de viaje', value: selectedStyle.value },
])

let draftTimer: ReturnType<typeof window.setTimeout> | undefined

restoreDraft()

watch(
  profile,
  () => {
    draftStatus.value = 'Cambios sin guardar'
    if (draftTimer) window.clearTimeout(draftTimer)
    draftTimer = window.setTimeout(() => {
      draftStatus.value = 'Borrador actualizado'
    }, 700)
  },
  { deep: true },
)

function validateName(value: string) {
  const cleanValue = value.trim()
  if (!cleanValue) return 'Escribe el nombre del viajero.'
  if (cleanValue.length < 2) return 'Usa al menos 2 caracteres.'
  if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(cleanValue)) return 'Usa solo letras y espacios.'
  return ''
}

function validateEmail(value: string) {
  const cleanValue = value.trim()
  if (!cleanValue) return 'Escribe un correo para recibir confirmaciones.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanValue)) return 'Revisa el formato del correo.'
  return ''
}

function cloneProfile(): TravelerProfileForm {
  return {
    name: profile.name,
    email: profile.email,
    budget: profile.budget,
    language: profile.language,
    travelStyle: profile.travelStyle,
    interests: [...profile.interests],
    accessibilityNeeds: [...profile.accessibilityNeeds],
  }
}

function applyProfile(nextProfile: TravelerProfileForm) {
  profile.name = nextProfile.name
  profile.email = nextProfile.email
  profile.budget = nextProfile.budget
  profile.language = nextProfile.language
  profile.travelStyle = nextProfile.travelStyle
  profile.interests = [...nextProfile.interests]
  profile.accessibilityNeeds = [...nextProfile.accessibilityNeeds]
}

function markTouched(fields: ScalarField[]) {
  fields.forEach((field) => {
    touched[field] = true
  })
}

function getFieldError(field: ScalarField) {
  return touched[field] ? fieldErrors.value[field] : ''
}

function getFieldState(field: ScalarField) {
  if (!touched[field]) return 'default'
  return fieldErrors.value[field] ? 'error' : 'valid'
}

function showNotice(text: string, type: NoticeType = 'info') {
  notice.text = text
  notice.type = type
}

function toggleInterest(interest: string) {
  touchedInterests.value = true

  if (profile.interests.includes(interest)) {
    profile.interests = profile.interests.filter((item) => item !== interest)
    return
  }

  if (profile.interests.length >= 5) {
    showNotice('Puedes elegir hasta 5 intereses para mantener recomendaciones precisas.', 'warning')
    return
  }

  profile.interests = [...profile.interests, interest]
}

function toggleAccessibility(value: string) {
  if (profile.accessibilityNeeds.includes(value)) {
    profile.accessibilityNeeds = profile.accessibilityNeeds.filter((item) => item !== value)
    return
  }

  profile.accessibilityNeeds = [...profile.accessibilityNeeds, value]
}

function selectBudget(value: string) {
  profile.budget = value
  touched.budget = true
}

function selectLanguage(value: string) {
  profile.language = value
  touched.language = true
}

function selectTravelStyle(value: string) {
  profile.travelStyle = value
  touched.travelStyle = true
}

function validateStep(stepIndex = currentStep.value) {
  if (stepIndex === 0) {
    markTouched(['name', 'email'])
    return identityComplete.value
  }

  if (stepIndex === 1) {
    markTouched(['budget', 'language', 'travelStyle'])
    touchedInterests.value = true
    return preferencesComplete.value
  }

  return true
}

async function focusFirstInvalid() {
  await nextTick()
  const invalidField = document.querySelector<HTMLElement>('[data-invalid="true"] input, [data-invalid="true"] button')
  invalidField?.focus()
}

async function goToStep(index: number) {
  if (index <= currentStep.value) {
    currentStep.value = index
    showNotice('Puedes revisar y ajustar este paso.', 'info')
    return
  }

  if (!validateStep(currentStep.value)) {
    showNotice('Revisa los campos marcados antes de continuar.', 'error')
    await focusFirstInvalid()
    return
  }

  currentStep.value = index
  showNotice('Paso completado. Continua con la siguiente seccion.', 'success')
}

async function nextStep() {
  if (!validateStep(currentStep.value)) {
    showNotice('Revisa los campos marcados antes de continuar.', 'error')
    await focusFirstInvalid()
    return
  }

  currentStep.value = Math.min(currentStep.value + 1, steps.length - 1)
  showNotice('Paso completado. Continua con la siguiente seccion.', 'success')
}

function previousStepAction() {
  currentStep.value = Math.max(currentStep.value - 1, 0)
  showNotice('Puedes cambiar tus respuestas antes de guardar.', 'info')
}

function applyBalancedProfile() {
  profile.budget = '$300 - $700'
  profile.language = profile.language || 'Espanol'
  profile.travelStyle = 'Viaje organizado'
  profile.interests = ['Naturaleza', 'Cultura', 'Gastronomia']
  touched.budget = true
  touched.language = true
  touched.travelStyle = true
  touchedInterests.value = true
  showNotice('Preferencias base aplicadas. Ajustalas si tu viaje necesita otra prioridad.', 'success')
}

function saveDraft() {
  try {
    localStorage.setItem(draftKey, JSON.stringify(cloneProfile()))
    draftStatus.value = 'Borrador guardado'
    showNotice('Borrador guardado en este navegador.', 'success')
  } catch {
    showNotice('No se pudo guardar el borrador en este navegador.', 'error')
  }
}

function restoreDraft() {
  try {
    const rawDraft = localStorage.getItem(draftKey)
    if (!rawDraft) return

    const parsedDraft = JSON.parse(rawDraft) as Partial<TravelerProfileForm>
    applyProfile({
      ...createInitialProfile(),
      ...parsedDraft,
      interests: Array.isArray(parsedDraft.interests) ? parsedDraft.interests : [],
      accessibilityNeeds: Array.isArray(parsedDraft.accessibilityNeeds) ? parsedDraft.accessibilityNeeds : [],
    })
    draftStatus.value = 'Borrador recuperado'
  } catch {
    localStorage.removeItem(draftKey)
  }
}

function resetForm() {
  previousProfile.value = cloneProfile()
  applyProfile(createInitialProfile())
  Object.keys(touched).forEach((key) => {
    touched[key as ScalarField] = false
  })
  touchedInterests.value = false
  currentStep.value = 0
  showNotice('Formulario restablecido. Puedes deshacer esta accion.', 'warning')
}

function undoReset() {
  if (!previousProfile.value) return

  applyProfile(previousProfile.value)
  previousProfile.value = null
  showNotice('Se recuperaron los datos anteriores.', 'success')
}

async function validateAllSteps() {
  const firstInvalidStep = [0, 1].find((stepIndex) => !validateStep(stepIndex))
  if (firstInvalidStep !== undefined) {
    currentStep.value = firstInvalidStep
    showNotice('Revisa los campos marcados para guardar el perfil.', 'error')
    await focusFirstInvalid()
    return false
  }

  return true
}

async function saveProfile() {
  if (!(await validateAllSteps())) return

  isSubmitting.value = true
  try {
    const payload = cloneProfile()
    emit('save', payload)
    localStorage.removeItem(draftKey)
    draftStatus.value = 'Perfil guardado'
    showNotice('Perfil guardado. Las recomendaciones usaran estas preferencias.', 'success')
  } catch {
    showNotice('No se pudo guardar. Intenta nuevamente.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="profile-form" aria-labelledby="profile-form-title">
    <header class="profile-form__header">
      <div>
        <p class="profile-form__eyebrow">Configuracion progresiva</p>
        <h2 id="profile-form-title" class="profile-form__title">Perfil del viajero</h2>
        <p class="profile-form__subtitle">
          Define los datos que usara Destinify para recomendar destinos, reservas y alertas.
        </p>
      </div>

      <div class="profile-form__status" aria-live="polite">
        <span class="profile-form__status-dot" aria-hidden="true"></span>
        {{ draftStatus }}
      </div>
    </header>

    <div class="profile-form__progress" aria-label="Progreso del formulario">
      <div class="profile-form__progress-track">
        <span class="profile-form__progress-bar" :style="{ width: progressPercent }"></span>
      </div>

      <div class="profile-form__steps">
        <button
          v-for="(step, index) in steps"
          :key="step.title"
          type="button"
          class="profile-step"
          :class="{
            'profile-step--active': currentStep === index,
            'profile-step--complete': stepCompletion[index],
          }"
          :aria-current="currentStep === index ? 'step' : undefined"
          @click="goToStep(index)"
        >
          <span class="profile-step__number">{{ index + 1 }}</span>
          <span>
            <span class="profile-step__title">{{ step.title }}</span>
            <span class="profile-step__description">{{ step.description }}</span>
          </span>
        </button>
      </div>
    </div>

    <div class="profile-notice" :class="`profile-notice--${notice.type}`" role="status" aria-live="polite">
      <span class="profile-notice__icon" aria-hidden="true"></span>
      <span>{{ notice.text }}</span>
      <button v-if="previousProfile" type="button" class="profile-notice__action" @click="undoReset">
        Deshacer
      </button>
    </div>

    <form class="profile-form__body" novalidate @submit.prevent="saveProfile">
      <div class="profile-form__main">
        <section v-show="currentStep === 0" class="profile-panel" aria-labelledby="profile-step-identity">
          <div class="profile-panel__heading">
            <p class="profile-panel__kicker">Paso 1 de 3</p>
            <h3 id="profile-step-identity">Datos basicos</h3>
            <p>Usa informacion real para evitar errores en reservas y comprobantes.</p>
          </div>

          <div class="profile-grid profile-grid--two">
            <label class="profile-field" :data-invalid="Boolean(getFieldError('name'))">
              <span class="profile-field__label">Nombre completo</span>
              <input
                v-model="profile.name"
                class="profile-field__control"
                :class="`profile-field__control--${getFieldState('name')}`"
                type="text"
                autocomplete="name"
                placeholder="Ej. Maria Gonzalez"
                @blur="touched.name = true"
              />
              <span v-if="getFieldError('name')" class="profile-field__error">{{ getFieldError('name') }}</span>
            </label>

            <label class="profile-field" :data-invalid="Boolean(getFieldError('email'))">
              <span class="profile-field__label">Correo electronico</span>
              <input
                v-model="profile.email"
                class="profile-field__control"
                :class="`profile-field__control--${getFieldState('email')}`"
                type="email"
                autocomplete="email"
                placeholder="nombre@correo.com"
                @blur="touched.email = true"
              />
              <span v-if="getFieldError('email')" class="profile-field__error">{{ getFieldError('email') }}</span>
            </label>
          </div>
        </section>

        <section v-show="currentStep === 1" class="profile-panel" aria-labelledby="profile-step-preferences">
          <div class="profile-panel__heading profile-panel__heading--split">
            <div>
              <p class="profile-panel__kicker">Paso 2 de 3</p>
              <h3 id="profile-step-preferences">Preferencias del viaje</h3>
              <p>Elige opciones claras para que la IA no tenga que adivinar tus prioridades.</p>
            </div>
            <button type="button" class="profile-link-button" @click="applyBalancedProfile">
              Sugerir base
            </button>
          </div>

          <fieldset class="profile-choice-group" :data-invalid="Boolean(getFieldError('budget'))">
            <legend>Presupuesto diario</legend>
            <div class="profile-grid profile-grid--three" role="radiogroup" aria-label="Presupuesto diario">
              <button
                v-for="option in budgetOptions"
                :key="option.value"
                type="button"
                class="profile-choice"
                :class="{ 'profile-choice--selected': profile.budget === option.value }"
                role="radio"
                :aria-checked="profile.budget === option.value"
                @click="selectBudget(option.value)"
              >
                <span class="profile-choice__title">{{ option.label }}</span>
                <span class="profile-choice__detail">{{ option.detail }}</span>
              </button>
            </div>
            <p v-if="getFieldError('budget')" class="profile-field__error">{{ getFieldError('budget') }}</p>
          </fieldset>

          <fieldset class="profile-choice-group" :data-invalid="Boolean(getFieldError('language'))">
            <legend>Idioma preferido</legend>
            <div class="profile-grid profile-grid--four" role="radiogroup" aria-label="Idioma preferido">
              <button
                v-for="option in languageOptions"
                :key="option.value"
                type="button"
                class="profile-choice profile-choice--compact"
                :class="{ 'profile-choice--selected': profile.language === option.value }"
                role="radio"
                :aria-checked="profile.language === option.value"
                @click="selectLanguage(option.value)"
              >
                {{ option.label }}
              </button>
            </div>
            <p v-if="getFieldError('language')" class="profile-field__error">{{ getFieldError('language') }}</p>
          </fieldset>

          <fieldset class="profile-choice-group" :data-invalid="Boolean(getFieldError('travelStyle'))">
            <legend>Tipo de viaje</legend>
            <div class="profile-grid profile-grid--two" role="radiogroup" aria-label="Tipo de viaje">
              <button
                v-for="option in styleOptions"
                :key="option.value"
                type="button"
                class="profile-choice"
                :class="{ 'profile-choice--selected': profile.travelStyle === option.value }"
                role="radio"
                :aria-checked="profile.travelStyle === option.value"
                @click="selectTravelStyle(option.value)"
              >
                <span class="profile-choice__title">{{ option.label }}</span>
                <span class="profile-choice__detail">{{ option.detail }}</span>
              </button>
            </div>
            <p v-if="getFieldError('travelStyle')" class="profile-field__error">
              {{ getFieldError('travelStyle') }}
            </p>
          </fieldset>

          <fieldset class="profile-choice-group" :data-invalid="touchedInterests && profile.interests.length === 0">
            <legend>Intereses</legend>
            <div class="profile-interest-status">
              <span>{{ profile.interests.length }} de 5 seleccionados</span>
              <span class="profile-interest-status__bar" aria-hidden="true">
                <span :style="{ width: `${(profile.interests.length / 5) * 100}%` }"></span>
              </span>
            </div>
            <div class="profile-chip-list">
              <button
                v-for="interest in interestOptions"
                :key="interest"
                type="button"
                class="profile-chip"
                :class="{ 'profile-chip--selected': profile.interests.includes(interest) }"
                :aria-pressed="profile.interests.includes(interest)"
                @click="toggleInterest(interest)"
              >
                {{ interest }}
              </button>
            </div>
            <p v-if="touchedInterests && profile.interests.length === 0" class="profile-field__error">
              Selecciona al menos un interes.
            </p>
          </fieldset>
        </section>

        <section v-show="currentStep === 2" class="profile-panel" aria-labelledby="profile-step-accessibility">
          <div class="profile-panel__heading">
            <p class="profile-panel__kicker">Paso 3 de 3</p>
            <h3 id="profile-step-accessibility">Ajustes de acompanamiento</h3>
            <p>Estos ajustes son opcionales y ayudan a reducir friccion durante el viaje.</p>
          </div>

          <fieldset class="profile-choice-group">
            <legend>Necesidades de accesibilidad</legend>
            <div class="profile-grid profile-grid--two">
              <button
                v-for="option in accessibilityOptions"
                :key="option.value"
                type="button"
                class="profile-choice"
                :class="{ 'profile-choice--selected': profile.accessibilityNeeds.includes(option.value) }"
                :aria-pressed="profile.accessibilityNeeds.includes(option.value)"
                @click="toggleAccessibility(option.value)"
              >
                <span class="profile-choice__title">{{ option.label }}</span>
                <span class="profile-choice__detail">{{ option.detail }}</span>
              </button>
            </div>
          </fieldset>

          <div class="profile-review">
            <h4>Revision antes de guardar</h4>
            <p>
              Si algo falta, puedes volver al paso anterior. El boton guardar validara los campos obligatorios.
            </p>
          </div>
        </section>
      </div>

      <aside class="profile-summary" aria-label="Resumen del perfil">
        <div class="profile-summary__header">
          <h3>Resumen</h3>
          <span>{{ completedRequiredSteps }} / 2 claves</span>
        </div>

        <dl class="profile-summary__list">
          <div v-for="row in summaryRows" :key="row.label">
            <dt>{{ row.label }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
        </dl>

        <div class="profile-summary__block">
          <p>Intereses</p>
          <div v-if="profile.interests.length" class="profile-summary__chips">
            <span v-for="interest in profile.interests" :key="interest">{{ interest }}</span>
          </div>
          <span v-else class="profile-summary__empty">Pendiente</span>
        </div>

        <div class="profile-summary__block">
          <p>Accesibilidad</p>
          <div v-if="profile.accessibilityNeeds.length" class="profile-summary__chips">
            <span v-for="need in profile.accessibilityNeeds" :key="need">{{ need }}</span>
          </div>
          <span v-else class="profile-summary__empty">Sin ajustes adicionales</span>
        </div>
      </aside>

      <footer class="profile-form__footer">
        <div class="profile-form__footer-status" :class="{ 'profile-form__footer-status--complete': isFormComplete }">
          <span aria-hidden="true"></span>
          {{ isFormComplete ? 'Perfil listo para guardar' : 'Completa datos y preferencias' }}
        </div>

        <div class="profile-form__actions">
          <button type="button" class="profile-button profile-button--secondary" @click="resetForm">
            Restablecer
          </button>
          <button type="button" class="profile-button profile-button--secondary" @click="saveDraft">
            Guardar borrador
          </button>
          <button
            v-if="currentStep > 0"
            type="button"
            class="profile-button profile-button--secondary"
            @click="previousStepAction"
          >
            Atras
          </button>
          <button
            v-if="currentStep < steps.length - 1"
            type="button"
            class="profile-button profile-button--primary"
            @click="nextStep"
          >
            Continuar
          </button>
          <button v-else type="submit" class="profile-button profile-button--primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Guardando...' : 'Guardar perfil' }}
          </button>
        </div>
      </footer>
    </form>
  </section>
</template>

<style scoped>
.profile-form {
  overflow: hidden;
  border: 1px solid var(--destinify-line);
  border-radius: 28px;
  background: var(--destinify-surface);
  box-shadow: 0 18px 50px rgba(18, 44, 43, 0.08);
}

.profile-form__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 28px;
  border-bottom: 1px solid var(--destinify-line);
  background: linear-gradient(180deg, #ffffff, #f6faf8);
}

.profile-form__eyebrow {
  margin: 0 0 8px;
  color: var(--destinify-orange);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.profile-form__title {
  margin: 0;
  color: var(--destinify-ink);
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1.15;
}

.profile-form__subtitle {
  max-width: 620px;
  margin: 10px 0 0;
  color: var(--destinify-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.profile-form__status,
.profile-form__footer-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  border-radius: 999px;
  background: #eef8f5;
  padding: 8px 12px;
  color: var(--destinify-teal);
  font-size: 0.78rem;
  font-weight: 800;
  white-space: nowrap;
}

.profile-form__status-dot,
.profile-form__footer-status span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
}

.profile-form__progress {
  padding: 24px 28px;
  border-bottom: 1px solid var(--destinify-line);
}

.profile-form__progress-track {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #e8f7f3;
}

.profile-form__progress-bar {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--destinify-teal), var(--destinify-orange));
  transition: width 0.25s ease;
}

.profile-form__steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 16px;
}

.profile-step {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  border: 1px solid var(--destinify-line);
  border-radius: 18px;
  background: #ffffff;
  padding: 12px;
  text-align: left;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.profile-step:hover {
  border-color: var(--destinify-teal);
  transform: translateY(-1px);
}

.profile-step--active {
  border-color: var(--destinify-teal);
  background: #eef8f5;
}

.profile-step--complete .profile-step__number {
  background: var(--destinify-teal);
  color: #ffffff;
}

.profile-step__number {
  display: grid;
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 999px;
  background: #f6faf8;
  color: var(--destinify-ink);
  font-size: 0.85rem;
  font-weight: 900;
}

.profile-step__title,
.profile-step__description {
  display: block;
}

.profile-step__title {
  color: var(--destinify-ink);
  font-size: 0.88rem;
  font-weight: 900;
}

.profile-step__description {
  margin-top: 2px;
  color: var(--destinify-muted);
  font-size: 0.74rem;
  line-height: 1.3;
}

.profile-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 28px 0;
  border: 1px solid #dce8e4;
  border-radius: 18px;
  padding: 12px 14px;
  color: var(--destinify-muted);
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1.45;
}

.profile-notice--success {
  border-color: #bfe7d8;
  background: #eef8f5;
  color: #0a756c;
}

.profile-notice--error {
  border-color: #fecaca;
  background: #fff1f0;
  color: #b42318;
}

.profile-notice--warning {
  border-color: #fed7aa;
  background: #fff7ed;
  color: #b45309;
}

.profile-notice__icon {
  flex: 0 0 10px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: currentColor;
}

.profile-notice__action,
.profile-link-button {
  border: 0;
  background: transparent;
  color: var(--destinify-teal);
  font-size: 0.86rem;
  font-weight: 900;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.profile-form__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 28px;
  padding: 28px;
}

.profile-form__main {
  min-width: 0;
}

.profile-panel {
  display: grid;
  gap: 24px;
}

.profile-panel__heading {
  display: grid;
  gap: 6px;
}

.profile-panel__heading--split {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 16px;
}

.profile-panel__heading h3,
.profile-review h4,
.profile-summary h3 {
  margin: 0;
  color: var(--destinify-ink);
  font-size: 1.25rem;
  font-weight: 900;
  line-height: 1.25;
}

.profile-panel__heading p,
.profile-review p {
  margin: 0;
  color: var(--destinify-muted);
  font-size: 0.92rem;
  line-height: 1.55;
}

.profile-panel__kicker {
  color: var(--destinify-orange) !important;
  font-size: 0.76rem !important;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.profile-grid {
  display: grid;
  gap: 14px;
}

.profile-grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.profile-grid--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.profile-grid--four {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.profile-field {
  display: grid;
  gap: 8px;
}

.profile-field__label,
.profile-choice-group legend {
  color: var(--destinify-ink);
  font-size: 0.9rem;
  font-weight: 900;
}

.profile-field__control {
  width: 100%;
  min-height: 52px;
  border: 2px solid var(--destinify-line);
  border-radius: 16px;
  background: #ffffff;
  padding: 0 15px;
  color: var(--destinify-ink);
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.profile-field__control:focus {
  border-color: var(--destinify-teal);
  box-shadow: 0 0 0 4px rgba(15, 148, 136, 0.14);
}

.profile-field__control--error {
  border-color: #dc2626;
}

.profile-field__control--valid {
  border-color: var(--destinify-green);
}

.profile-field__error {
  margin: 0;
  color: #b42318;
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1.45;
}

.profile-choice-group {
  display: grid;
  gap: 12px;
  min-width: 0;
  margin: 0;
  border: 0;
  padding: 0;
}

.profile-choice {
  position: relative;
  display: grid;
  min-height: 94px;
  gap: 6px;
  border: 2px solid var(--destinify-line);
  border-radius: 18px;
  background: #ffffff;
  padding: 16px;
  text-align: left;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.profile-choice:hover {
  border-color: var(--destinify-teal);
  transform: translateY(-1px);
}

.profile-choice--selected {
  border-color: var(--destinify-teal);
  background: #eef8f5;
  box-shadow: 0 10px 24px rgba(15, 148, 136, 0.12);
}

.profile-choice--selected::after {
  content: '';
  position: absolute;
  top: 14px;
  right: 14px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--destinify-teal);
}

.profile-choice--compact {
  min-height: 52px;
  place-items: center;
  text-align: center;
  font-weight: 900;
}

.profile-choice__title,
.profile-choice__detail {
  display: block;
}

.profile-choice__title {
  padding-right: 18px;
  color: var(--destinify-ink);
  font-size: 0.94rem;
  font-weight: 900;
}

.profile-choice__detail {
  color: var(--destinify-muted);
  font-size: 0.82rem;
  line-height: 1.45;
}

.profile-interest-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  color: var(--destinify-muted);
  font-size: 0.84rem;
  font-weight: 800;
}

.profile-interest-status__bar {
  display: block;
  width: min(180px, 45%);
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #e8f7f3;
}

.profile-interest-status__bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--destinify-teal);
}

.profile-chip-list,
.profile-summary__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.profile-chip {
  min-height: 44px;
  border: 2px solid var(--destinify-line);
  border-radius: 999px;
  background: #ffffff;
  padding: 0 14px;
  color: var(--destinify-ink);
  font-size: 0.88rem;
  font-weight: 800;
}

.profile-chip--selected {
  border-color: var(--destinify-teal);
  background: #eef8f5;
  color: #0a756c;
}

.profile-review {
  border-left: 4px solid var(--destinify-orange);
  border-radius: 18px;
  background: #fff7ed;
  padding: 18px;
}

.profile-summary {
  align-self: start;
  display: grid;
  gap: 18px;
  border-left: 1px solid var(--destinify-line);
  padding-left: 28px;
}

.profile-summary__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.profile-summary__header span {
  border-radius: 999px;
  background: #eef8f5;
  padding: 6px 10px;
  color: var(--destinify-teal);
  font-size: 0.76rem;
  font-weight: 900;
}

.profile-summary__list {
  display: grid;
  gap: 12px;
  margin: 0;
}

.profile-summary__list div {
  display: grid;
  gap: 3px;
}

.profile-summary dt,
.profile-summary__block p {
  margin: 0;
  color: var(--destinify-muted);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.profile-summary dd {
  margin: 0;
  color: var(--destinify-ink);
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.profile-summary__block {
  display: grid;
  gap: 8px;
}

.profile-summary__chips span {
  border-radius: 999px;
  background: #eef8f5;
  padding: 6px 10px;
  color: #0a756c;
  font-size: 0.78rem;
  font-weight: 900;
}

.profile-summary__empty {
  color: var(--destinify-muted);
  font-size: 0.88rem;
  font-weight: 700;
}

.profile-form__footer {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border-top: 1px solid var(--destinify-line);
  padding-top: 24px;
}

.profile-form__footer-status {
  background: #fff7ed;
  color: #b45309;
}

.profile-form__footer-status--complete {
  background: #eef8f5;
  color: var(--destinify-teal);
}

.profile-form__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.profile-button {
  min-height: 48px;
  border-radius: 999px;
  padding: 0 18px;
  font-size: 0.88rem;
  font-weight: 900;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.profile-button:hover {
  transform: translateY(-1px);
}

.profile-button--secondary {
  border: 1px solid var(--destinify-line);
  background: #ffffff;
  color: var(--destinify-ink);
}

.profile-button--primary {
  border: 1px solid var(--destinify-orange);
  background: var(--destinify-orange);
  color: #ffffff;
  box-shadow: 0 14px 28px rgba(255, 138, 42, 0.22);
}

.profile-button:disabled {
  cursor: wait;
  opacity: 0.72;
  transform: none;
}

.profile-step:focus-visible,
.profile-link-button:focus-visible,
.profile-notice__action:focus-visible,
.profile-field__control:focus-visible,
.profile-choice:focus-visible,
.profile-chip:focus-visible,
.profile-button:focus-visible {
  outline: 3px solid rgba(255, 138, 42, 0.55);
  outline-offset: 3px;
}

@media (max-width: 980px) {
  .profile-form__body {
    grid-template-columns: 1fr;
  }

  .profile-summary {
    border-left: 0;
    border-top: 1px solid var(--destinify-line);
    padding-top: 24px;
    padding-left: 0;
  }
}

@media (max-width: 760px) {
  .profile-form__header,
  .profile-form__footer {
    align-items: stretch;
    flex-direction: column;
  }

  .profile-form__steps {
    grid-template-columns: 1fr;
  }

  .profile-grid--two,
  .profile-grid--three,
  .profile-grid--four {
    grid-template-columns: 1fr;
  }

  .profile-panel__heading--split {
    grid-template-columns: 1fr;
  }

  .profile-form__actions {
    justify-content: stretch;
  }

  .profile-button {
    flex: 1 1 auto;
  }
}

@media (max-width: 520px) {
  .profile-form {
    border-radius: 22px;
  }

  .profile-form__header,
  .profile-form__progress,
  .profile-form__body {
    padding: 20px;
  }

  .profile-notice {
    margin-inline: 20px;
  }
}
</style>
