<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="controllotes"
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
            @click="destroyClotes(props.row.id)"
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
                class="col-4"
                dense
                outlined
                type="text"
                label="Lote"
                v-model="tempLotes.lotes"
              />

              <!-- TODO: "Producto" -->
              <q-input
                class="col-6"
                dense
                outlined
                type="text"
                label="Producto"
                v-model="tempLotes.producto_lotes"
              />

              <!-- TODO: "U/M" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="U/M"
                v-model="tempLotes.unidad_med"
              />

              <q-space class="col-1" />

              <!-- TODO: "Cantidad" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="Cantidad"
                lazy-rules
                v-model="tempLotes.cant"
              />

              <!-- TODO: "Fecha de producción" -->
              <q-input
                class="col-5"
                dense
                outlined
                label="Fecha de prodrucción"
                v-model="tempLotes.fecha_produccion"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor inserte la fecha de producción',
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
                        v-model="tempLotes.fecha_produccion"
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
                class="col-5"
                dense
                outlined
                label="Fecha de vencimiento"
                v-model="tempLotes.fecha_vence"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor inserte la fecha de vencimiento',
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
                        v-model="tempLotes.fecha_vence"
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
                class="col-3 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDF"
                @click="updateClotes(tempLotes.id)"
              />
              <q-btn
                class="col-3 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDF"
                @click="createClotes(tempLotes)"
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
import { useControlLotesStore } from "src/stores/ControlLotes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listClotes();
  // }
});

const {
  resetTempClotes,
  listClotes,
  createClotes,
  retrieveClotes,
  updateClotes,
  destroyClotes,
} = useControlLotesStore();

const { controllotes, AddDF, EditDF, showDialogDF, loading, tempLotes } =
  storeToRefs(useControlLotesStore());

  const columns = [
  {
    name: "lotes",
    align: "center",
    label: "Lote",
    field: "lotes",
  },
  {
    name: "producto_lotes",
    align: "center",
    label: "Producto",
    field: "producto_lotes",
    sortable: true,
  },
  {
    name: 'unidad_med',
    align: 'center',
    label: 'U/M',
    field: 'unidad_med',
  },
  {
    name: 'cant',
    align: 'center',
    label: 'Cantidad',
    field: 'cant',
  },
  {
    name: 'fecha_produccion',
    align: 'center',
    label: 'Fecha de produccion',
    field: 'fecha_produccion',
  },
  {
    name: 'fecha_vence',
    align: 'center',
    label: 'Fecha de vencimiento',
    field: 'fecha_vence',
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDF.value = false;
  EditDF.value = true;
  tempLotes.value = { ...row };
  showDialogDF.value = true;
};
const openAddDialog = () => {
  AddDF.value = true;
  EditDF.value = false;
  resetTempClotes();
  showDialogDF.value = true;
};

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(controllotes.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "ControlLotes");
  writeFileXLSX(wb, "ControlLotes.xlsx");
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
