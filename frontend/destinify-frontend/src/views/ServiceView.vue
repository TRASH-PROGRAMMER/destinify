<script setup lang="ts">
interface ServiceSummary {
  id: string
  title: string
  category: 'Hotel' | 'Tour' | 'Transporte'
  location: string
  price: number
  status: string
  description: string
}

const services: ServiceSummary[] = [
  {
    id: 'hotel-andino',
    title: 'Hotel Boutique Andino',
    category: 'Hotel',
    location: 'Quito',
    price: 78,
    status: 'Disponible',
    description: 'Hospedaje centrico con desayuno, wifi y acceso rapido al Centro Historico.',
  },
  {
    id: 'tour-centro-historico',
    title: 'Tour Centro Historico',
    category: 'Tour',
    location: 'Quito',
    price: 42,
    status: 'Cupos limitados',
    description: 'Recorrido guiado por plazas, iglesias, miradores y gastronomia local.',
  },
  {
    id: 'traslado-aeropuerto',
    title: 'Traslado Aeropuerto',
    category: 'Transporte',
    location: 'Mariscal Sucre',
    price: 28,
    status: 'Confirmacion inmediata',
    description: 'Servicio privado para llegada o salida con seguimiento de horario.',
  },
]
</script>

<template>
  <section class="page-shell py-10">
    <div class="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p class="text-sm font-black uppercase text-[#ff7a1a]">Servicios turisticos</p>
        <h1 class="mt-3 text-4xl font-black text-[#122c2b]">Hoteles, tours y transporte</h1>
        <p class="mt-3 max-w-2xl text-[#5d7471]">
          Primera vista MVP para consultar servicios disponibles antes de conectarlos al backend.
        </p>
      </div>

      <RouterLink to="/buscar" class="focus-ring focus:ring-4 focus:ring-focusRing focus:ring-offset-2 touch-target rounded-full bg-[#122c2b] px-6 py-3 text-sm font-black text-white">
        Buscar mas
      </RouterLink>
    </div>

    <div class="mt-8 grid gap-4">
      <article
        v-for="service in services"
        :key="service.id"
        class="grid gap-4 rounded-[28px] border border-[#dce8e4] bg-white p-5 shadow-[0_14px_40px_rgba(18,44,43,0.06)] md:grid-cols-[1fr_auto] md:items-center"
      >
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-[#e8f7f3] px-3 py-1 text-xs font-black text-[#0f9488]">
              {{ service.category }}
            </span>
            <span class="rounded-full bg-[#fff6df] px-3 py-1 text-xs font-black text-[#9a6810]">
              {{ service.status }}
            </span>
          </div>

          <h2 class="mt-3 text-xl font-black text-[#122c2b]">{{ service.title }}</h2>
          <p class="mt-1 text-sm font-semibold text-[#5d7471]">{{ service.location }}</p>
          <p class="mt-3 max-w-3xl text-sm leading-6 text-[#5d7471]">{{ service.description }}</p>
        </div>

        <div class="flex items-center justify-between gap-5 md:flex-col md:items-end">
          <p class="text-lg font-black text-[#122c2b]">${{ service.price }}</p>
          <button type="button" class="focus-ring rounded-full bg-[#ff8a2a] px-5 py-2 text-sm font-black text-white">
            Reservar
          </button>
        </div>
      </article>
    </div>
  </section>
</template>
