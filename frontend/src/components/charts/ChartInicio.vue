<template>
  <div class="q-mx-md">
    <q-card bordered>
      <q-card-section class="text-h6">
        Total de Pacientes
        <q-btn icon="download" class="float-right" @click="saveImage" flat dense>
          <q-tooltip>Download PNG</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-card-section>
        <ECharts ref="barChart" :option="barChartOption" class="q-mx-md" :resizable="true" autoresize style="height: 300px;" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ECharts from 'vue-echarts';
import 'echarts';

const barChartOption = ref(null);

onMounted(async () => {
  try {
    // Realiza la solicitud al controlador de AdonisJS para obtener los datos
    const response = await axios.get('/api/v1/dashboardindices');
    // const { labels, data } = response.data;
    const { data } =  [10,12,13];
    const { labels } = ["enero"];

    // Configura el gráfico de barras con los datos obtenidos
    const option = {
      tooltip: { show: true },
      title: { show: true, textStyle: { color: 'rgba(0, 0, 0 , .87)', fontFamily: 'sans-serif' } },
      grid: { containLabel: true, left: '0', bottom: '0', right: '0' },
      xAxis: {
        type: 'category',
        axisLine: { lineStyle: { color: 'rgba(0, 0, 0 , .54)', type: 'dashed' } },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: { show: true, color: 'rgba(0, 0, 0 , .54)', type: 'dashed' }
        },
        axisLabel: { show: true },
        data: labels // Utiliza los meses como etiquetas en el eje X
      },
      yAxis: {
        show: false,
        type: 'value',
        axisLine: { lineStyle: { color: 'rgba(0, 0, 0 , .54)', type: 'dashed' } },
        axisLabel: { show: false },
        splitLine: { lineStyle: { type: 'dashed' } },
        axisTick: {
          show: true,
          lineStyle: { show: true, color: 'rgba(0, 0, 0 , .54)', type: 'dashed' }
        }
      },
      series: [{ type: 'bar', barWidth: '60%', label: { show: true }, data }], // Utiliza los datos de cantidad de pacientes por mes
      color: ['#2196f3']
    };

    // Asigna la opción al gráfico de barras
    barChartOption.value = option;
  } catch (error) {
    console.error(error);
  }
});

const saveImage = () => {
  const linkSource = $refs.barChart.getDataURL();
  const downloadLink = document.createElement('a');
  document.body.appendChild(downloadLink);
  downloadLink.href = linkSource;
  downloadLink.target = '_self';
  downloadLink.download = 'BarChart.png';
  downloadLink.click();
};
</script>

<style scoped>
</style>
