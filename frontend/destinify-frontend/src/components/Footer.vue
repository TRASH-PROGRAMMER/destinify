<template>
  <footer class="border-t border-[#dce8e4] bg-white">
    <div class="page-shell grid gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
      <div>
        <p class="text-lg font-black text-[#122c2b]">Destinify</p>
        <p class="mt-3 max-w-md text-sm leading-6 text-[#5d7471]">
          Turismo inteligente para planificar, reservar y acompanar viajes por Ecuador con IA.
        </p>
      </div>

      <div>
        <p class="text-sm font-black uppercase text-[#122c2b]">Explorar</p>
        <div class="mt-4 grid gap-3 text-sm font-semibold text-[#5d7471]">
          <RouterLink to="/buscar" class="hover:text-[#0f9488]">Destinos</RouterLink>
          <RouterLink to="/itinerario" class="hover:text-[#0f9488]">Itinerario</RouterLink>
          <RouterLink to="/reservas" class="hover:text-[#0f9488]">Reservas</RouterLink>
        </div>
      </div>

      <div>
        <p class="text-sm font-black uppercase text-[#122c2b]">Contacto</p>
        <div class="mt-4 grid gap-3 text-sm text-[#5d7471]">
          <a href="mailto:soporte@destinify.ec" class="font-semibold hover:text-[#0f9488]">
            soporte@destinify.ec
          </a>
          <p>Quito, Ecuador</p>
        </div>
      </div>
    </div>
  </footer>
</template>
