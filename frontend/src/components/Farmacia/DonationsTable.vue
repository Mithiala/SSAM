<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="donacionfarmacia"
      :columns="columns"
      row-key="id_donacion"
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
            @click="destroyDonFarm(props.row.id_donacion)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDF" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO: "Lote" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="text"
                label="Lote"
                v-model="tempDonacion.lote_don"
              />

              <!-- TODO: "Producto" -->
              <q-input
                class="col-4"
                dense
                outlined
                type="text"
                label="Producto"
                v-model="tempDonacion.prod_don"
              />

              <!-- TODO: "U/M" -->
              <q-input
                class="col-1"
                dense
                outlined
                type="text"
                label="U/M"
                v-model="tempDonacion.und_med"
              />

              <!-- TODO: "Cantidad" -->
              <q-input
                class="col-1"
                dense
                outlined
                type="number"
                label="Cantidad"
                lazy-rules
                v-model="tempDonacion.cant_don"
              />

              <!-- TODO: "Fecha de vencimiento" -->
              <q-input
                cclass="col-2"
                dense
                outlined
                label="Fecha de vencimiento"
                v-model="tempDonacion.fecha_venced"
                mask="date"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de nacimiento',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="tempDonacion.fecha_venced">
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
                v-if="EditDF"
                @click="updateDonFarm(tempDonacion.id_donacion)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDF"
                @click="createDonFarm(tempDonacion)"
              />
              <q-btn
                class="col-2 q-mx-sm"
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
import { useDonacionFarmaciaStore } from "src/stores/DonacionFarmacia-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listDonFarm();
  // }
});

const {
  resetTempDonFarm,
  listDonFarm,
  createDonFarm,
  retrieveDonFarm,
  updateDonFarm,
  destroyDonFarm,
} = useDonacionFarmaciaStore();

const { donacionfarmacia, AddDF, EditDF, showDialogDF, loading, tempDonacion } =
  storeToRefs(useDonacionFarmaciaStore());

  const columns = [
  {
    name: 'id_donacion',
    required: true,
    label: 'Id',
    align: 'left',
    field: row => row.id_donacion,
    format: val => `${val}`,
    sortable: true,
    align: "center",
  },
  {
    name: "lote_don",
    align: "center",
    label: "Lote",
    field: "lote_don",
  },
  {
    name: "prod_don",
    align: "center",
    label: "Producto",
    field: "prod_don",
    sortable: true,
  },
  {
    name: 'und_med',
    align: 'center',
    label: 'U/M',
    field: 'und_med',
  },
  {
    name: 'cant_don',
    align: 'center',
    label: 'Cantidad',
    field: 'cant_don',
  },
  {
    name: 'fecha_venced',
    align: 'center',
    label: 'Fecha de vencimiento',
    field: 'fecha_venced',
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDF.value = false;
  EditDF.value = true;
  tempDonacion.value = { ...row };
  showDialogDF.value = true;
};
const openAddDialog = () => {
  AddDF.value = true;
  EditDF.value = false;
  resetTempDonFarm();
  showDialogDF.value = true;
};

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(donacionfarmacia.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "DonacionFarmacia");
  writeFileXLSX(wb, "DonacionFarmacia.xlsx");
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
