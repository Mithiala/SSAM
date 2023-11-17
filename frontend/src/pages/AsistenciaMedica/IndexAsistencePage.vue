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
        Asistencia Médica
      </div>
    </div>
    <div class="q-pa-md text-weight-bolder text-h5">Interconsultas por especialidades</div>
    <q-card class="q-mt-sm no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="las la-chart-line" size="44px" />
          </q-item-section>
          <q-item-section>
            <div class="text-h6">Estadísticas</div>
          </q-item-section>
        </q-item>
      </q-card-section>
              <!-- ------------------ -->
      <q-card-section class="row">
        <div class="col-lg-9 col-sm-12 col-xs-12 col-md-9">
          <div class="row justify-between">
            <div class="col-lg-2 col-md-2 col-xs-5 col-sm-5">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="green-14"
                    text-color="white"
                    icon="las la-tree"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-green-14 text-bold">4</q-item-label>
                  <q-item-label caption>Geriatría</q-item-label>
                </q-item-section>
              </q-item>
            </div>
      <!-- ------------------------- -->
            <div class="col-lg-2 col-md-2 col-xs-5 col-sm-5">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="blue-grey-14"
                    text-color="white"
                    icon="las la-ribbon"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-blue-grey-14 text-bold">1</q-item-label>
                  <q-item-label caption>Oncología</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <!-- ------------------ -->
            <div class="col-lg-2 col-md-2 col-xs-5 col-sm-5">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="light-blue-8"
                    text-color="white"
                    icon="las la-heartbeat"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-light-blue-8 text-bold">3</q-item-label>
                  <q-item-label caption>Angiología</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <!-- ------------------ -->
            <div class="col-lg-2 col-md-2 col-xs-5 col-sm-5">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="red-14"
                    text-color="white"
                    icon="las la-heart"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-red-14 text-bold">10</q-item-label>
                  <q-item-label caption>Cardiología</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <!-- ------------------ -->
            <div class="col-lg-2 col-md-2 col-xs-5 col-sm-5">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="amber-14"
                    text-color="white"
                    icon="las la-male"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-amber-14 text-bold">10</q-item-label>
                  <q-item-label caption>Fisiatra</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!-- ------------------ -->
    <div class="row q-gutter-md top">
      <div class="col-4 q-pa-md">
        <q-card class="q-mx-md" bordered>
          <div class="flex flex-center column">
            <div class="text-h5 text-weight q-mr-md flex flex-center row">Total de pacientes</div>
              <q-circular-progress
                show-value
                font-size="12px"
                value="70"
                size="130px"
                :thickness="0.22"
                color="green-7"
                track-color="green-2"
                class="q-ma-md">
                78 Pacientes
              </q-circular-progress>
              <div>
                <q-badge color="green-2" rounded class="q-mr-sm" /> Mujeres 18%
              </div>
              <div class="q-mb-xl">
                <q-badge color="green-7" rounded class="q-mr-sm" /> Hombres 84%
              </div>
          </div>
        </q-card>
      </div>
      <div class="col-3"></div>
        <div class="col-4 q-pa-md">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h5 text-weight q-mr-md flex flex-center column">Distribución por Género</div>
              <div class="flex flex-center row">
                <q-circular-progress :value="8" size="75px" :thickness="1" color="pink-1" track-color="pink-3" class="q-ma-md"/>
                  <div class="text-h6 text-weight q-mr-md">8 Mujeres</div>
                    <div class="q-pa-md q-gutter-sm" style="height: 80px"></div>
              </div>
                <q-separator horizontal inset class="q-mx-lg" />
                  <div class="flex flex-center row">
                    <q-circular-progress :value="70" size="75px" :thickness="1" color="cyan-1" track-color="cyan-3" class="q-ma-md" />
                      <div class="text-h6 text-weight q-mr-md">70 Hombres</div>
            </div>
          </q-card>
        </div>
      </div>
      <!-- ------------------ -->
      <div class=" q-pa-md text-weight-bolder text-h5">Traslados por intercurrencias y subagudos</div>
      <q-toolbar>
        <div class="col-3">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h6 text-weight-bolder q-mr-md custom-card-width"> Traslado Policlínico III</div>
            <div class="flex flex-center row">
              <q-circular-progress
                :value="15"
                size="50px"
                :thickness="0.22"
                color="teal-1"
                track-color="teal-3"
                class="q-ma-md"
              />
              <div class="text-h4 text-weight q-mr-md">15</div>
                <q-chip color="teal-1" text-color="teal-7" icon="las la-chevron-up">06%</q-chip>
                  <div class="q-pa-md q-gutter-sm" style="height: 80px"></div>
            </div>
          </q-card>
        </div>
        <div class="col-3">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h6 text-weight-bolder q-mr-md custom-card-width">Traslado Hospital</div>
              <div class="flex flex-center row">
                <q-circular-progress
                  :value="9"
                  size="50px"
                  :thickness="0.22"
                  color="orange-1"
                  track-color="orange-3"
                  class="q-ma-md"/>
                <div class="text-h5 text-weight q-mr-md">09</div>
                  <q-chip color="orange-1" text-color="orange-7" icon="las la-chevron-up">05%</q-chip>
              </div>
          </q-card>
        </div>
        <div class="col-3">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h6 text-weight-bolder q-mr-md custom-card-width">Traslado Psiquiatría</div>
              <div class="flex flex-center row">
                <q-circular-progress
                  :value="3"
                  size="50px"
                  :thickness="0.22"
                  color="red-1"
                  track-color="red-3"
                  class="q-ma-md"/>
                <div class="text-h5 text-weight q-mr-md">03</div>
                  <q-chip color="red-1" text-color="red-7" icon="las la-chevron-up">01%</q-chip>
              </div>
          </q-card>
        </div>
        <div class="col-3">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h6 text-weight-bolder q-mr-md custom-card-width">Traslado Subagudos</div>
              <div class="flex flex-center row">
                <q-circular-progress
                  rounded
                  :value="2"
                  size="50px"
                  :thickness="0.22"
                  color="blue-1"
                  track-color="blue-3"
                  class="q-ma-md"/>
                <div class="text-h5 text-weight q-mr-md">02</div>
                  <q-chip color="blue-1" text-color="blue-7" icon="las la-chevron-up">01%</q-chip>
              </div>
          </q-card>
        </div>
    </q-toolbar>
      <!-- ------------------ -->
      <div class="q-pa-md">
      <q-card class="q-pa-md q-mx-md q-mt-sm custom-card-width" bordered>
        <div class="q-pa-md q-px-lg q-pt-md q-pb-xl">
          <q-item-label>
            <div class="text-h5">Pacientes fallecidos</div>
          </q-item-label>
          <q-slider
            v-model="model"
            color="cyan-14"
            snap
            label
            :min="1"
            :max="100"/>
          <q-slider
            class="q-mt-xl"
            v-model="model"
            color="red-14"
            label-always
            :label-value="value + '%'"
            :snap-labels="fnMarkerLabel"
            :min="0"
            :max="100"/>
        </div>
      </q-card>
    </div>
    <q-toolbar>
          <div class="col-3 q-pa-md">
            <q-card class="q-mx-md q-pa-md q-mt-sm custom-card-width" bordered>
            <div class="text-h6 text-weight-bolder q-mr-md flex flex-center row">Programas de Salud</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Auditivo</div>
              <q-chip color="teal-1" text-color="teal-7">15</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weightq-mr-md">Oftalmología</div>
              <q-chip color="deep-orange-1" text-color="deep-orange-7">07</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Estomatología</div>
              <q-chip color="cyan-1" text-color="cyan-7">06</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">TB</div>
              <q-chip color="amber-1" text-color="amber-7">78</q-chip>
            </div><div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Inmunizació</div>
              <q-chip color="green-1" text-color="green-7">78</q-chip>
            </div>
            <div class="text-h6 text-weight-bolder q-mr-md flex flex-center row">MNT</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Productos locales</div>
              <q-chip color="purple-1" text-color="purple-7">78</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Protocolo invierno</div>
              <q-chip color="pink-1" text-color="pink-7">78</q-chip>
            </div>
          </q-card>
          </div>
          <div class="col-3 q-pa-md">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h6 text-weight-bolder flex flex-center row">Cantidad de Prótesis</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md custom-card-width">Dental</div>
              <q-chip color="red-1" text-color="pink-6">60</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Auditivo</div>
              <q-chip color="light-blue-1" text-color="light-blue-7">45</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Anteojos</div>
              <q-chip color="indigo-1" text-color="indigo-9">76</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Esputos BAAR</div>
              <q-chip color="lime-1" text-color="lime-9">14</q-chip>
              <q-separator horizontal inset />
            </div>
          </q-card>
          </div>
          <div class="col-3 q-pa-md">
          <q-card class="q-mx-md q-pa-md q-mt-sm" bordered>
            <div class="text-h6 text-weight-bolder flex flex-center row">Vacunas</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md custom-card-width">Toxoide Tetánic</div>
              <q-chip color="red-1" text-color="pink-6">50</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Antigripal</div>
              <q-chip color="light-blue-1" text-color="light-blue-7">60</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Biomodulina</div>
              <q-chip color="indigo-1" text-color="indigo-9">78</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">Interferón nasal</div>
              <q-chip color="lime-1" text-color="lime-9">15</q-chip>
              <q-separator horizontal inset />
              <div class="text-h6 text-weight q-mr-md custom-card-width">PrevengoVir</div>
              <q-chip color="deep-orange-1" text-color="deep-orange-7">78</q-chip>
              <q-separator horizontal inset />
              </div>
              </q-card>
            </div>
          <div class="col-3 q-pa-md">
            <q-card class="q-mx-md q-pa-md q-mt-sm custom-card-width" bordered>
            <div class="text-h6 text-weight-bolder q-mr-md flex flex-center row">Síndrome Respiratorio</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">IRA</div>
              <q-chip color="teal-1" text-color="teal-7">15</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weightq-mr-md">Neumonía</div>
              <q-chip color="deep-orange-1" text-color="deep-orange-7">07</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Covid-19</div>
              <q-chip color="cyan-1" text-color="cyan-7">06</q-chip>
            </div>
            <div class="text-h6 text-weight-bolder q-mr-md flex flex-center row">Morbilidad sepsis</div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">EDA</div>
              <q-chip color="deep-purple-1" text-color="deep-purple-7">10</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Escabiosis</div>
              <q-chip color="purple-1" text-color="purple-7">04</q-chip>
            </div>
            <div class="flex flex-center row">
              <div class="text-h6 text-weight q-mr-md">Micosis</div>
              <q-chip color="purple-1" text-color="purple-7">11</q-chip>
            </div>
          </q-card>
        </div>
    </q-toolbar>
  </q-page>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import moment from 'moment'

const currentDate = ref('')
const updateCurrentDate = () => {
  currentDate.value = moment().format('YYYY-MM-DD HH:mm:ss')
  setTimeout(updateCurrentDate, 1000)
}
onMounted(() => {
  updateCurrentDate()
})

const model = ref(2)
const value = ref (0)
watch(model, (newValue) => {
  value.value = newValue;
});
const fnMarkerLabel = val => `${10 * val}%`
</script>

<style scoped></style>
