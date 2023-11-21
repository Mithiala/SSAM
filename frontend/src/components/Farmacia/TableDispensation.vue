<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="dispensacionfarmacia"
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
            @click="destroyDisp(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDF" persistent full-medium >
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO: "Lote" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Lote"
                v-model="tempDispensacion.lote"
              />

              <!-- TODO: "Producto" -->
              <q-input
                class="col-6"
                dense
                outlined
                type="text"
                label="Producto"
                v-model="tempDispensacion.prod_med"
              />

              <!-- TODO: "U/M" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="text"
                label="U/M"
                v-model="tempDispensacion.uni_med"
              />

              <!-- TODO: "Cantidad" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="Cantidad"
                lazy-rules
                v-model="tempDispensacion.cant_med"
              />

              <!-- TODO: "Fecha de entrada" -->
              <q-input
                class="col-4"
                dense
                outlined
                label="Fecha de entrada"
                v-model="tempDispensacion.fecha_entrada"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor inserte la fecha de entrada del medicamento',
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
                        v-model="tempDispensacion.fecha_entrada"
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

              <!-- TODO: "Fecha de salida" -->
              <q-input
                class="col-4"
                dense
                outlined
                label="Fecha de salida"
                v-model="tempDispensacion.fecha_salida"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor inserte la fecha de salida del medicamento',
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
                        v-model="tempDispensacion.fecha_salida"
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

              <!-- TODO: "Fecha de vencimiento" -->
              <q-input
                class="col-4"
                dense
                outlined
                label="Fecha de entrada"
                v-model="tempDispensacion.fecha_vence"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor inserte la fecha de vencimiento del medicamento',
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
                        v-model="tempDispensacion.fecha_vence"
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

              <!-- TODO: "Clasificación" -->
              <q-input
                class="col-6"
                dense
                outlined
                type="text"
                label="Clasificación"
                v-model="tempDispensacion.clasificacion"
              />

            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-3 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDF"
                @click="updateDisp(tempDispensacion.id_codigo)"
              />
              <q-btn
                class="col-3 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDF"
                @click="createDisp(tempDispensacion)"
              />
              <q-btn
                class="col-3 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogDF = false"
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
import { useDispensacionFarmaciaStore } from "src/stores/DispensacionFarmacia-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listDisp();
  // }
});

const {
  resetTempDisp,
  listDisp,
  createDisp,
  retrieveDisp,
  updateDisp,
  destroyDisp,
} = useDispensacionFarmaciaStore();

const { dispensacionfarmacia, AddDF, EditDF, showDialogDF, loading, tempDispensacion } =
  storeToRefs(useDispensacionFarmaciaStore());

  const columns = [
  {
    name: "lote",
    align: "center",
    label: "Lote",
    field: "lote",
  },
  {
    name: "prod_med",
    align: "center",
    label: "Producto",
    field: "prod_med",
    sortable: true,
  },
  {
    name: 'uni_med',
    align: 'center',
    label: 'U/M',
    field: 'uni_med',
  },
  {
    name: 'cant_med',
    align: 'center',
    label: 'Cantidad',
    field: 'cant_med',
  },
  {
    name: 'fecha_entrada',
    align: 'center',
    label: 'Fecha de entrada',
    field: 'fecha_entrada',
  },
  {
    name: 'fecha_salida',
    align: 'center',
    label: 'Fecha de salida',
    field: 'fecha_salida',
  },
  {
    name: 'fecha_vence',
    align: 'center',
    label: 'Fecha de vencimiento',
    field: 'fecha_vence',
  },
  {
    name: 'clasificacion',
    align: 'center',
    label: 'Clasificacion',
    field: 'clasificacion',
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDF.value = false;
  EditDF.value = true;
  tempDispensacion.value = { ...row };
  showDialogDF.value = true;
};
const openAddDialog = () => {
  AddDF.value = true;
  EditDF.value = false;
  resetTempDisp();
  showDialogDF.value = true;
};

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(dispensacionfarmacia.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "DispensacionFarmacia");
  writeFileXLSX(wb, "DispensacionFarmacia.xlsx");
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
