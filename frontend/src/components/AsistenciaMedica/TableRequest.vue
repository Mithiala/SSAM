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
            class="q-ml-md"
            flat
            unelevated
            fab-mini
            color="white"
            icon="send"
            type="submit"
            label="Enviar"
            @click="enviarSolicitud()"
          />
          <q-btn
            class="q-ml-md"
            flat
            unelevated
            fab-mini
            color="white"
            icon="add"
            type="submit"
            label="Agregar"
            @click="openAddDialog()"
          />
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
            icon="edit"
            @click="openEditDialog(props.row)"
          />
          <q-btn
            flat
            round
            dense
            color="warning"
            icon="delete"
            @click="destroyMed(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogPD" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO: "Producto" -->
              <q-input
                class="col-4"
                dense
                outlined
                type="text"
                label="Producto"
                v-model="tempSolicitud.producto"
              />

              <!-- TODO: "U/M" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="text"
                label="U/M"
                v-model="tempSolicitud.unidad_medida"
              />

              <!-- TODO: "Cantidad" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="Cantidad"
                lazy-rules
                v-model="tempSolicitud.cantidad"
              />

              <!-- TODO: "Fecha" -->
              <q-input
                class="col-2"
                dense
                outlined
                label="Fecha"
                v-model="tempSolicitud.fecha_pedido"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor inserte la fecha del pedido',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="tempSolicitud.fecha_pedido"
                        color="green-5"
                        mask="YYYY-MM-DD"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Cerrar"
                            color="green"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditPD"
                @click="updateMed(tempSolicitud.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddPD"
                @click="createMed(tempSolicitud)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogPD = false"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { PDFDocument, StandardFonts } from "pdf-lib";
import { utils, writeFileXLSX } from "xlsx";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useSolicitudMedicamentoStore } from "src/stores/SolicitudMedicamento-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listMed();
  // }
});

const {
  resetTempMed,
  listMed,
  createMed,
  updateMed,
  destroyMed,
} = useSolicitudMedicamentoStore();

const { solicitudmedicamento, AddPD, EditPD, showDialogPD, loading, tempSolicitud } =
  storeToRefs(useSolicitudMedicamentoStore());

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

const openEditDialog = (row) => {
  AddPD.value = false;
  EditPD.value = true;
  tempSolicitud.value = { ...row };
  showDialogPD.value = true;
};
const openAddDialog = () => {
  AddPD.value = true;
  EditPD.value = false;
  resetTempMed();
  showDialogPD.value = true;
};

const date = ref("");

// Evento enviarSolicitud
const enviarSolicitud = () => {
  // Aquí se ejecuta la lógica para enviar la solicitud al módulo de farmacia
  const solicitud = {
    medicamentos: solicitudmedicamento.value, // Obtén los datos de la tabla de solicitud de medicamentos
    // Otros datos relevantes de la solicitud
  };

  // Emitir el evento personalizado "solicitudEnviada" con los datos de la solicitud
  // Puedes emitir el evento a un componente superior para que pueda ser capturado por el módulo de farmacia
  emit('solicitudEnviada', solicitud);
};

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
    background-color: #338a67

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
