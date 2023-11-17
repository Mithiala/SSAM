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
        Psicología
      </div>
    </div>

    <div class="row q-col-gutter-md top">
      <div class="col-3 q-pa-md">
        <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
          <div class="flex flex-center column">
            <div class="q-pa-md text-weight text-h5 flex flex-center column">Total de pacientes</div>
            <q-circular-progress
              show-value
              font-size="12px"
              value="70"
              size="150px"
              :thickness="0.22"
              color="green-7"
              track-color="green-2"
              class="q-ma-md">
              78 Pacientes
            </q-circular-progress>
            <div>
              <q-badge color="green-2" rounded class="q-mr-sm" /> Mujeres 40%
            </div>
            <div class="q-mb-xl">
              <q-badge color="green-7" rounded class="q-mr-sm" /> Hombres 60%
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-4 q-pa-md">
        <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
          <div class="q-pa-md text-weight text-h5 flex flex-center column">Distribución por Género</div>
            <div class="flex flex-center row">
              <q-circular-progress :value="8" size="100px" :thickness="1" color="teal-1" track-color="teal-3" class="q-ma-md"/>
              <div class="text-h6 text-weight q-mr-md">8 Mujeres</div>
                <div class="q-pa-md q-gutter-sm" style="height: 80px">
              </div>
              </div>
              <q-separator horizontal inset class="q-mx-lg" />
                <div class="flex flex-center row">
                  <q-circular-progress :value="70" size="100px" :thickness="1" color="deep-orange-1" track-color="deep-orange-3" class="q-ma-md" />
                  <div class="text-h6 text-weight q-mr-md">70 Hombres</div>
                </div>
        </q-card>
      </div>
      <!-- ------------------ -->
      <div class="col-4">
        <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
          <div class="q-pa-md text-weight text-h5 flex flex-center column">
            Nuevos ingresos mensuales
          </div>
          <div class="flex flex-center row">
            <div class="circle green-circle">
              <div class="text-h2 text-weight-bolder q-mr-md custom-card-width">
                12
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <!-- ------------------ -->
      <div class="col-4">
        <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
          <div class="q-pa-md text-weight text-h5 flex flex-center column">
            Pacientes cognitivos
          </div>
          <div class="flex flex-center row">
            <div class="text-h5 text-weight q-mr-md">32</div>
            <q-chip color="teal-1" text-color="teal-7" icon="las la-chevron-up">06%</q-chip>
          </div>
          <div class="q-pa-md text-weight text-h5 flex flex-center column">
            Pacientes afectivos
          </div>
          <div class="flex flex-center row">
            <div class="text-h5 text-weight q-mr-md">25</div>
            <q-chip color="teal-1" text-color="teal-7" icon="las la-chevron-up">06%</q-chip>
          </div>
          <div class="q-pa-md text-weight text-h5 flex flex-center column">
            Pacientes normales
          </div>
          <div class="flex flex-center row">
            <div class="text-h5 text-weight q-mr-md">22</div
            >
            <q-chip color="teal-1" text-color="teal-7" icon="las la-chevron-up">06%</q-chip>
          </div>
        </q-card>
      </div>
    <!-- ------------------ -->
    <div class="col-3"></div>
      <div class="col-4 q-pa-md">
        <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
          <div class="q-pa-md text-weight text-h5 flex flex-center column">
            Traslado Psiquiatría
          </div>
          <div class="flex flex-center row">
            <q-circular-progress
              :value="3"
              size="50px"
              :thickness="1"
              color="red-1"
              track-color="red-3"
              class="q-ma-md"
            />
            <div class="text-h4 text-weight q-mr-md">03</div>
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
