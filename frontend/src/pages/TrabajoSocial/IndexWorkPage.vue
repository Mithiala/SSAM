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
        Trabajo Social
      </div>
    </div>

    <div class="row q-col-gutter-md top">
      <div class="col-4 q-pa-md">
        <q-card class="q-mx-md" bordered>
          <div class="flex flex-center column">
            <h6>Índice Ocupacional</h6>
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
        <div class="col-4 q-pa-md">
            <q-card class="q-mx-md q-pa-md q-mt-sm custom-card-width" bordered>
              <div class="text-h6 text-weight-bolder q-mr-md custom-card-width">Distribución por Género</div>
            <div class="flex flex-center row">
              <q-circular-progress :value="8" size="100px" :thickness="1" color="teal-1" track-color="teal-3" class="q-ma-md"/>
              <div class="text-h6 text-weight q-mr-md">08 Mujeres</div>
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
        <div class="col-4 q-pa-md">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h5 text-weight-bolder flex flex-center column">Grupos por edades</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md custom-card-width">Menores de 60 años</div>
              <q-chip color="red-1" text-color="pink-6">02</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">De 60 a 65 años</div>
              <q-chip color="light-blue-1" text-color="light-blue-7">10</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">De 66 a 69 años</div>
              <q-chip color="indigo-1" text-color="indigo-9">15</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">De 70 a 74 años</div>
              <q-chip color="lime-1" text-color="lime-9">14</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">De 75 a 79 años</div>
              <q-chip color="deep-orange-1" text-color="deep-orange-7">09</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Más de 80 años</div>
              <q-chip color="brown-1" text-color="brown-7">03</q-chip>
              <q-separator horizontal inset />
            </div>
          </q-card>
          </div>
          </div>
        <q-toolbar>
          <div class="col-4 q-pa-md">
            <q-card class="q-mx-md q-pa-md q-mt-sm custom-card-width" bordered>
            <div class="text-h5 text-weight-bolder q-mr-md custom-card-width">Tiempo de Estadía</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Menos de un mes</div>
              <q-chip color="teal-1" text-color="teal-7">15</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weightq-mr-md">De 1 a 6 meses</div>
              <q-chip color="deep-orange-1" text-color="deep-orange-7">07</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">De 6 y menos de 1 año</div>
              <q-chip color="cyan-1" text-color="cyan-7">06</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">De 1 año y Menos de 5 años</div>
              <q-chip color="grey-1" text-color="grey-7">06</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">De 5 años y Menos de 10años</div>
              <q-chip color="purple-1" text-color="purple-7">06</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">De 10 años y Mas</div>
              <q-chip color="red-1" text-color="red-7">06</q-chip>
            </div>
          </q-card>
          </div>
          <div class="col-3 q-pa-md">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h5 text-weight-bolder flex flex-center column">Grado de Parentesco</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md custom-card-width">Hijos</div>
              <q-chip color="red-1" text-color="pink-6">02</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Esposo(a)</div>
              <q-chip color="light-blue-1" text-color="light-blue-7">10</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Sobrino</div>
              <q-chip color="indigo-1" text-color="indigo-9">15</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Nietos</div>
              <q-chip color="lime-1" text-color="lime-9">14</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Hermanos</div>
              <q-chip color="deep-orange-1" text-color="deep-orange-7">09</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Sin familia</div>
              <q-chip color="brown-1" text-color="brown-7">03</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Otros(hijastros)</div>
              <q-chip color="amber-1" text-color="amber-7">03</q-chip>
              </div>
              </q-card>
            </div>
          <div class="col-3 q-pa-md">
            <q-card class="q-mx-md q-pa-md q-mt-sm custom-card-width" bordered>
            <div class="text-h5 text-weight-bolder q-mr-md custom-card-width">Estado Civil</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Soltero</div>
              <q-chip color="teal-1" text-color="teal-7">15</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weightq-mr-md">Casado</div>
              <q-chip color="deep-orange-1" text-color="deep-orange-7">07</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Unión Consensual</div>
              <q-chip color="cyan-1" text-color="cyan-7">06</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Vuidos</div>
              <q-chip color="grey-1" text-color="grey-7">06</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Divorciados</div>
              <q-chip color="purple-1" text-color="purple-7">06</q-chip>
            </div>
          </q-card>
        </div>
    </q-toolbar>
    <q-toolbar>
      <div class="col-6 q-pa-md">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h5 text-weight-bolder flex flex-center column">Motivo de Ingreso</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md custom-card-width">Deambulantes</div>
              <q-chip color="red-1" text-color="pink-6">02</q-chip>
            </div>
              <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md custom-card-width">Ancianos solos</div>
              <q-chip color="light-blue-1" text-color="light-blue-7">10</q-chip>
            </div>
              <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md custom-card-width">Ancianos con familia que trabajan</div>
              <q-chip color="indigo-1" text-color="indigo-9">15</q-chip>
            </div>
              <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md custom-card-width">Ancianos con familias ancianas o enfermas</div>
              <q-chip color="lime-1" text-color="lime-9">14</q-chip>
            </div>
          </q-card>
        </div>
        <div class="col-4 q-pa-md">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h5 text-weight-bolder flex flex-center column">Tipo de Discapacidad</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md custom-card-width">Discapacidad Motora</div>
              <q-chip color="red-1" text-color="pink-6">02</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Discapacidad Auditiva</div>
              <q-chip color="light-blue-1" text-color="light-blue-7">10</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Discapacidad Visual</div>
              <q-chip color="indigo-1" text-color="indigo-9">15</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Discapacidad Intelectual</div>
              <q-chip color="lime-1" text-color="lime-9">14</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Discapacidad Sensorial</div>
              <q-chip color="deep-orange-1" text-color="deep-orange-7">09</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Discapacidad Mixta</div>
              <q-chip color="green-1" text-color="green-7">03</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Psicopatía</div>
              <q-chip color="brown-1" text-color="brown-7">03</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Incontinencia urinaria</div>
              <q-chip color="brown-1" text-color="brown-7">03</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Incontinencia Fecal</div>
              <q-chip color="brown-1" text-color="brown-7">03</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Incontinencia Mixta</div>
              <q-chip color="brown-1" text-color="brown-7">03</q-chip>
            </div>
          </q-card>
          </div>
    </q-toolbar>

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
