<template>
  <q-page class="padding">
    <q-toolbar>
      <q-space></q-space>
      <q-spinner-clock color="brown" size="lg" class="q-mr-sm" />
      <p>{{ currentDate }}</p>
    </q-toolbar>
    <div class="q-pa-md">
      <div class="text-h5">RESUMEN DEL MES</div>
      <div class="text-h6">Sistema de Salud Adulto Mayor</div>
    </div>
        <!-- ------------------ -->
        <div class="col-lg-9 col-sm-12 col-xs-12 col-md-9">
          <div class="row justify-between">
            <div class="col-lg-2 col-md-2 col-xs-5 col-sm-5">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="red-14"
                    text-color="white"
                    icon="las la-heart"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-red-14 text-bold"
                    >4</q-item-label
                  >
                  <q-item-label caption>Egresos</q-item-label>
                </q-item-section>
              </q-item>
            </div>
      <!-- ------------------------- -->
            <div class="col-lg-2 col-md-2 col-xs-5 col-sm-5">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="blue"
                    text-color="white"
                    icon="las la-star"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-blue text-bold"
                    >12</q-item-label
                  >
                  <q-item-label caption>Nuevos ingresos</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-2 col-md-2 col-xs-5 col-sm-5">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="amber-13"
                    text-color="white"
                    icon="las la-user"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-amber-13 text-bold"
                    >5</q-item-label
                  >
                  <q-item-label caption>Pacientes de baja</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </div>

        <ChartInicio />

    <div class="row q-gutter-md top">
      <div class="col-5 q-pa-md">
            <q-card class="q-mx-md q-pa-md q-mt-sm custom-card-width" bordered>
              <div class="text-h6 text-weight-bolder q-mr-md custom-card-width">Distribución por Género</div>
            <div class="flex flex-center row">
              <q-circular-progress :value="8" size="100px" :thickness="1" color="pink-1" track-color="pink-3" class="q-ma-md"/>
              <div class="text-h6 text-weight q-mr-md">8 Mujeres</div>
                <div class="q-pa-md q-gutter-sm" style="height: 80px">
              </div>
              </div>
              <q-separator horizontal inset class="q-mx-lg" />
                <div class="flex flex-center row">
                  <q-circular-progress :value="70" size="100px" :thickness="1" color="cyan-1" track-color="cyan-3" class="q-ma-md" />
                  <div class="text-h6 text-weight q-mr-md">70 Hombres</div>
                </div>
            </q-card>
          </div>
      <div class="col-5 q-pa-md">
        <q-card class="q-mx-md q-pa-md q-mt-sm custom-card-width" bordered>
          <div class="text-h5 text-weight-bolder q-mr-md custom-card-width">
            Pacientes cognitivos
          </div>
          <div class="flex flex-center row">
            <div class="text-h5 text-weight q-mr-md">32</div>
            <q-chip color="teal-1" text-color="teal-7" icon="las la-chevron-up"
              >15%</q-chip
            >
          </div>
          <div class="text-h5 text-weight-bolder q-mr-md custom-card-width">
            Pacientes afectivos
          </div>
          <div class="flex flex-center row">
            <div class="text-h5 text-weight q-mr-md">25</div>
            <q-chip
              color="deep-orange-1"
              text-color="deep-orange-7"
              icon="las la-chevron-up"
              >7%</q-chip
            >
          </div>
          <div class="text-h5 text-weight-bolder q-mr-md custom-card-width">
            Pacientes normales
          </div>
          <div class="flex flex-center row">
            <div class="text-h5 text-weight q-mr-md">22</div>
            <q-chip color="cyan-1" text-color="cyan-7" icon="las la-chevron-up"
              >6%</q-chip
            >
          </div>
        </q-card>
      </div>
    </div>
    <q-toolbar>
      <div class="col-6 q-pa-md">
        <q-card class="q-mx-md q-pa-md q-mt-sm custom-card-width" bordered>
          <div class="text-h5 text-weight-bolder q-mr-md custom-card-width">
            Traslado Policlínico III
          </div>
          <div class="flex flex-center row">
            <q-circular-progress
              :value="32"
              size="100px"
              :thickness="1"
              color="teal-1"
              track-color="teal-3"
              class="q-ma-md"
            />
            <div class="text-h4 text-weight q-mr-md">32</div>
            <q-chip color="teal-1" text-color="teal-7" icon="las la-chevron-up"
              >06%</q-chip
            >
            <div class="q-pa-md q-gutter-sm" style="height: 80px"></div>
          </div>
          <q-separator horizontal inset class="q-mx-lg" />
          <div class="text-h5 text-weight-bolder q-mr-md custom-card-width">
            Traslado Hospital
          </div>
          <div class="flex flex-center row">
            <q-circular-progress
              :value="40"
              size="100px"
              :thickness="1"
              color="orange-1"
              track-color="orange-3"
              class="q-ma-md"
            />
            <div class="text-h4 text-weight q-mr-md">40</div>
            <q-chip
              color="orange-1"
              text-color="orange-7"
              icon="las la-chevron-up"
              >09%</q-chip
            >
          </div>
          <q-separator horizontal inset class="q-mx-lg" />
          <div class="text-h5 text-weight-bolder q-mr-md custom-card-width">
            Traslado Psiquiatría
          </div>
          <div class="flex flex-center row">
            <q-circular-progress
              :value="20"
              size="100px"
              :thickness="1"
              color="red-1"
              track-color="red-3"
              class="q-ma-md"
            />
            <div class="text-h4 text-weight q-mr-md">20</div>
            <q-chip color="red-1" text-color="red-7" icon="las la-chevron-up"
              >03%</q-chip
            >
          </div>
        </q-card>
      </div>
      <div class="col-6 q-pa-md">
        <q-card class="q-mx-md q-pa-md q-mt-sm custom-card-width" bordered>
          <div class="text-h5 text-weight-bolder q-mr-md custom-card-width">
            Pacientes fallecidos
          </div>
          <div class="flex flex-center row">
            <q-circular-progress
              :value="20"
              size="90px"
              :thickness="0.2"
              color="blue-2"
              center-color="blue-4"
              track-color="transparent"
              class="q-ma-md"
            />
            <div class="text-h4 text-weight-bolder q-mr-md">2</div>
            <q-chip color="blue-1" text-color="blue-7" icon="las la-chevron-up"
              >02%</q-chip
            >
          </div>
        </q-card>
      </div>
    </q-toolbar>
    <TableResumenPacientes/>
  </q-page>
</template>

<script setup>
import { ref, onMounted, defineComponent } from "vue";
import TableResumenPacientes from "src/components/TableResumenPacientes.vue";
import moment from "moment";
import * as echarts from 'echarts'
import ECharts from "vue-echarts";
import ChartInicio from "src/components/charts/ChartInicio.vue";

const currentDate = ref("");

const updateCurrentDate = () => {
  currentDate.value = moment().format("YYYY-MM-DD HH:mm:ss");
  setTimeout(updateCurrentDate, 1000);
};

onMounted(() => {
  updateCurrentDate();
});
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
  background-color: rgb(
    139,
    245,
    139
  ); /* Cambia el color del círculo si lo deseas */
  color: rgb(26, 37, 29); /* Cambia el color del texto si lo deseas */
}
.overlapping {
  border: 5px solid white position absolute;
}
</style>
