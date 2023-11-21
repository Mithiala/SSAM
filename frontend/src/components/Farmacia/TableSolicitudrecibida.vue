<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="solicitudmedicamento"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[10, 20, 30]"
      separator="cell"
    >
      <template v-slot:top="props">
        <div class="row col-12">
          <q-input
            class="col-3"
            rounded
            standout="bg-teal-4 text-white"
            dark
            dense
            input-class="text-right"
            debounce="300"
            color="teal-3"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon v-if="filter === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="filter = ''"
              />
            </template>
          </q-input>
          <q-space class="col-3"/>
          <q-btn
            flat
            unelevated
            fab-mini
            class="q-ml-sm"
            color="white"
            icon-right="archive"
            label="Exportar"
            no-caps
            @click="exportFile"
          >
            <q-tooltip
              anchor="top middle"
              self="center middle"
              class="bg-info text-black shadow-4"
              :offset="[10, 10]"
            >
              Exportar Tabla a Excel
            </q-tooltip>
          </q-btn>

          <q-btn
            class="q-ml-xs"
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          />
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            color="accent"
            icon="check"
            @click="triggerPositive"
          />
          <q-btn
            flat
            round
            dense
            color="accent"
            icon="block"
            @click="declineSolicitud(props.row.id)"
          />
          <q-btn
            flat
            round
            dense
            color="warning"
            icon="delete"
            @click="destroySolicitud(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { PDFDocument, StandardFonts } from "pdf-lib";
import { utils, writeFileXLSX } from "xlsx";
import { useQuasar } from 'quasar'
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useSolicitudMedicamentoStore } from "src/stores/SolicitudMedicamento-Store";
import { useSolicitudRecibidaStore } from "src/stores/SolicitudRecibida-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listMed();
  // }
});

const {
  resetTempMed,
  listMed,
  createMed,
  retrieveMed,
  updateMed,
  destroyMed,
} = useSolicitudMedicamentoStore();

const {
  resetTempSolicitud,
  listSolicitud,
  createSolicitud,
  retrieveSolicitud,
  destroySolicitud,
  declineSolicitud,
} = useSolicitudRecibidaStore();

const { solicitudmedicamento, AddPD, EditPD, showDialogPD, loading, tempSolicitud } =
  storeToRefs(useSolicitudMedicamentoStore());

const { solicitudrecibida, AcceptPD, DeclinePD } =
  storeToRefs(useSolicitudRecibidaStore());

  const columns = [
  {
    name: 'producto',
    align: 'center',
    label: 'Producto',
    field: 'producto',
    sortable: true,
  },
  {
    name: 'unidad_medida',
    align: 'center',
    label: 'U/M',
    field: 'unidad_medida',
  },
  {
    name: 'cantidad',
    align: 'center',
    label: 'Cantidad',
    field: 'cantidad'
  },
  {
    name: 'fecha_pedido',
    align: 'center',
    label: 'Fecha',
    field: 'fecha_pedido',
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const date = ref("");

const triggerPositive = () => {
  const $q = useQuasar()
  $q.notify({
    color: 'positive',
    message: 'This is a "positive" type notification.'
  })
}


// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(solicitudmedicamento.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "SolicitudMedicamento");
  writeFileXLSX(wb, "SolicitudMedicamento.xlsx");
}
</script>

<style lang="sass">
.table
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #6db555

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
