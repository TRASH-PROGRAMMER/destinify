<script setup lang="ts">
interface ItineraryActivity {
  time: string
  title: string
  place: string
  note: string
}

interface ItineraryDay {
  day: string
  title: string
  activities: ItineraryActivity[]
}

const itinerary: ItineraryDay[] = [
  {
    day: 'Dia 1',
    title: 'Llegada y centro historico',
    activities: [
      { time: '09:00', title: 'Check-in hotel', place: 'Quito', note: 'Confirmar reserva y dejar equipaje.' },
      { time: '11:00', title: 'Ruta cultural', place: 'Centro Historico', note: 'Caminar por plazas e iglesias principales.' },
      { time: '18:30', title: 'Cena local', place: 'La Ronda', note: 'Probar comida tradicional.' },
    ],
  },
  {
    day: 'Dia 2',
    title: 'Naturaleza y miradores',
    activities: [
      { time: '08:30', title: 'Teleferico', place: 'Pichincha', note: 'Llevar abrigo y agua.' },
      { time: '13:00', title: 'Almuerzo andino', place: 'La Mariscal', note: 'Opcion vegetariana disponible.' },
      { time: '16:00', title: 'Mitad del Mundo', place: 'San Antonio', note: 'Reservar transporte con anticipacion.' },
    ],
  },
]
</script>

<template>
  <section class="page-shell py-10">
    <div class="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p class="text-sm font-black uppercase text-[#ff7a1a]">Itinerario</p>
        <h1 class="mt-3 text-4xl font-black text-[#122c2b]">Tu viaje dia por dia</h1>
        <p class="mt-3 max-w-2xl text-[#5d7471]">
          Organiza horarios, actividades, notas importantes y reservas desde una sola vista.
        </p>
      </div>
      <button type="button" class="focus-ring rounded-full bg-[#ff8a2a] px-6 py-3 text-sm font-black text-white">
        Agregar actividad
      </button>
    </div>

    <div class="mt-8 grid gap-6">
      <article
        v-for="day in itinerary"
        :key="day.day"
        class="rounded-[32px] border border-[#dce8e4] bg-white p-5 shadow-[0_18px_50px_rgba(18,44,43,0.08)]"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-sm font-black uppercase text-[#0f9488]">{{ day.day }}</p>
            <h2 class="mt-1 text-2xl font-black text-[#122c2b]">{{ day.title }}</h2>
          </div>
          <RouterLink to="/asistente" class="rounded-full bg-[#e8f7f3] px-4 py-2 text-sm font-bold text-[#0f9488]">
            Ajustar con IA
          </RouterLink>
        </div>

        <div class="mt-5 grid gap-3">
          <article
            v-for="activity in day.activities"
            :key="`${day.day}-${activity.time}`"
            class="grid gap-3 rounded-2xl bg-[#f6faf8] p-4 md:grid-cols-[96px_1fr]"
          >
            <p class="text-sm font-black text-[#ff7a1a]">{{ activity.time }}</p>
            <div>
              <h3 class="font-black text-[#122c2b]">{{ activity.title }}</h3>
              <p class="mt-1 text-sm font-semibold text-[#5d7471]">{{ activity.place }}</p>
              <p class="mt-2 text-sm leading-6 text-[#5d7471]">{{ activity.note }}</p>
            </div>
          </article>
        </div>
      </article>
    </div>
  </section>
</template>
