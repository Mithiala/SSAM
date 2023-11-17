<template>
  <q-page class="padding">
    <q-toolbar>
      <q-space></q-space>
      <q-spinner-clock color="brown" size="lg" class="q-mr-sm" />
        <p>{{ currentDate }}</p>
    </q-toolbar>
    <div class="q-pa-md">
      <div class="text-h5">
        RESUMEN DEL MES
      </div>
      <div class="text-h6">
        Farmacia
      </div>
    </div>

    <div class="row q-col-gutter-md top">
      <div class="col">
        <q-card class="q-mx-md" bordered>
          <div class="flex flex-center column">
            <h6>Total de Pacientes</h6>
          <q-circular-progress show-value font-size="12px" value="70" size="100px" :thickness="0.22" color="green-7" track-color="green-2" class="q-ma-md">
          78 Ingresos
          </q-circular-progress>
          <div>
            <q-badge color="green-2" rounded class="q-mr-sm"/> Mujeres 06%
          </div>
          <div class="q-mb-xl">
            <q-badge color="green-7" rounded class="q-mr-sm"/> Hombres 84%
          </div>
        </div>
        </q-card>
        </div>
        <div class="col">
          <q-card class="q-mx-md q-pa-md q-mt-sm custom-card-width" bordered>
            <div class="text-h6 flex flex-center column">Nuevos ingresos mensuales</div>
            <div class="flex flex-center row">
              <div class="circle green-circle">
                <div class="text-h2 text-weight-bolder q-mr-md custom-card-width">12</div>
              </div>
            </div>
          </q-card>
          </div>
          <div class="col">
            <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h6 flex flex-center column">Pacientes fallecidos mensuales</div>
            <div class="flex flex-center row">
              <div class="text-h3 text-weight-bolder q-mr-md custom-card-width">4</div>
              <q-chip color="red-1" text-color="red-7" icon="las la-chevron-up">02%</q-chip>
            </div>
          </q-card>
          </div>
          <div class="col">
            <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h6 flex flex-center column">Donaciones mensuales</div>
            <div class="flex flex-center row">
              <div class="text-h3 text-weight-bolder q-mr-md custom-card-width">4</div>
              <q-chip color="red-1" text-color="red-7" icon="las la-chevron-up">02%</q-chip>
            </div>
          </q-card>
          </div>
        </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import moment from 'moment'

const currentDate = ref('')

const updateCurrentDate = () => {
  currentDate.value = moment().format('YYYY-MM-DD HH:mm:ss')
  setTimeout(updateCurrentDate, 1000)
}

onMounted(() => {
  updateCurrentDate()
})
</script>


<style>
.circle {
  width: 100px; /* Ajusta el tamaño del círculo según tus necesidades */
  height: 100px; /* Ajusta el tamaño del círculo según tus necesidades */
  border-radius: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.green-circle {
  background-color: rgb(139, 245, 139); /* Cambia el color del círculo si lo deseas */
  color: rgb(26, 37, 29); /* Cambia el color del texto si lo deseas */
}
.overlapping {
  border: 5px solid white
  position absolute
}
</style>
