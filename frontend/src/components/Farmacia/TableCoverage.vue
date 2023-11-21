<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="coberturafarmacia"
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

      <!-- TODO: "Método para falta" -->
      <template v-slot:body-cell-falta="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.falta"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO: "Método para ocioso" -->
      <template v-slot:body-cell-ocioso="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.ocioso"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
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
            @click="destroyCob(props.row.id)"
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
                v-model="tempCobertura.lote_cob"
              />

              <!-- TODO: "Producto" -->
              <q-input
                class="col-6"
                dense
                outlined
                type="text"
                label="Producto"
                v-model="tempCobertura.tipo_med"
              />

              <!-- TODO: "Cantidad" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="Cantidad"
                lazy-rules
                v-model="tempCobertura.cantidad_cob"
              />

              <!-- TODO: "Medicamento en falta" -->
              <q-checkbox
                style="max-width: 270px"
                class="col-4"
                rigth-label
                dense
                outlined
                v-model="tempCobertura.falta"
                label="Medicamento en falta"
              />

              <!-- TODO: "Ocioso" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempCobertura.ocioso"
                label="Ocioso"
              />

            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-3 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDF"
                @click="updateCob(tempCobertura.id)"
              />
              <q-btn
                class="col-3 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDF"
                @click="createCob(tempCobertura)"
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
import { useCoberturaFarmaciaStore } from "src/stores/CoberturaFarmacia-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listCob();
  // }
});

const {
  resetTempCob,
  listCob,
  createCob,
  retrieveCob,
  updateCob,
  destroyCob,
} = useCoberturaFarmaciaStore();

const { coberturafarmacia, AddDF, EditDF, showDialogDF, loading, tempCobertura } =
  storeToRefs(useCoberturaFarmaciaStore());

  const columns = [
  {
    name: "lote_cob",
    align: "center",
    label: "Lote",
    field: "lote_cob",
  },
  {
    name: "tipo_med",
    align: "center",
    label: "Producto",
    field: "tipo_med",
    sortable: true,
  },
  {
    name: 'cantidad_cob',
    align: 'center',
    label: 'Cantidad',
    field: 'cantidad_cob',
  },
  {
    name: 'falta',
    align: 'center',
    label: 'Medicamento en falta',
    field: 'falta',
  },
  {
    name: 'ocioso',
    align: 'center',
    label: 'Ocioso',
    field: 'ocioso',
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDF.value = false;
  EditDF.value = true;
  tempCobertura.value = { ...row };
  showDialogDF.value = true;
};
const openAddDialog = () => {
  AddDF.value = true;
  EditDF.value = false;
  resetTempCob();
  showDialogDF.value = true;
};

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(coberturafarmacia.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "CoberturaFarmacia");
  writeFileXLSX(wb, "CoberturaFarmacia.xlsx");
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
