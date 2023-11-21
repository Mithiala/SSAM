<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="sindrome"
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
            @click="destroySindromes(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width >
      <q-card class="column medium" >
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO: "Diabetes Mellitus" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="Diabetes Mellitus"
                lazy-rules
                v-model="tempSindrome.cant_diabetes"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO: "HTA" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="HTA"
                lazy-rules
                v-model="tempSindrome.cant_hta"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO: "Micosis" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="Micosis"
                lazy-rules
                v-model="tempSindrome.cant_micosis"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO: "Escabiosis" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="Escabiosis"
                lazy-rules
                v-model="tempSindrome.cant_escabiosis"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO: "EDA" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="EDA"
                lazy-rules
                v-model="tempSindrome.cant_eda"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO: "COVID-19" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="COVID-19"
                lazy-rules
                v-model="tempSindrome.cant_covid"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO: "Neumonías" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="Neumonías"
                lazy-rules
                v-model="tempSindrome.cant_neumonias"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO: "IRA" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="IRA"
                lazy-rules
                v-model="tempSindrome.cant_ira"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO: "Otras enfermedades" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="Otras enfermedades"
                lazy-rules
                v-model="tempSindrome.otras"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateSindromes(tempSindrome.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createSindromes(tempSindrome)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogDG = false"
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
import { useSindromeStore } from "src/stores/Sindrome-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listSindromes();
  // }
});

const {
  resetTempSindromes,
  listSindromes,
  createSindromes,
  retrieveSindromes,
  updateSindromes,
  destroySindromes,
} = useSindromeStore();

const { sindrome, AddDG, EditDG, showDialogDG, loading, tempSindrome } =
  storeToRefs(useSindromeStore());

  const columns = [
  {
    name: "cant_ira",
    align: "center",
    label: "IRA",
    field: "cant_ira",
  },
  {
    name: "cant_neumonias",
    align: "center",
    label: "Neumonías",
    field: "cant_neumonias",
    sortable: true,
  },

  {
    name: 'cant_covid',
    align: 'center',
    label: 'COVID-19',
    field: 'cant_covid',
  },
  {
    name: 'cant_eda',
    align: 'center',
    label: 'EDA',
    field: 'cant_eda',
  },
  {
    name: 'cant_micosis',
    align: 'center',
    label: 'Micosis',
    field: 'cant_micosis',
  },
  {
    name: 'cant_hta',
    align: 'center',
    label: 'HTA',
    field: 'cant_hta'
  },
  {
    name: 'cant_diabetes',
    align: 'center',
    label: 'Diabetes Mellitus',
    field: 'cant_diabetes',
  },
  {
    name: 'otras',
    align: 'center',
    label: 'Otras enfermedades',
    field: 'otras'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempSindrome.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempSindromes();
  showDialogDG.value = true;
};

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(sindrome.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sindrome");
  writeFileXLSX(wb, "Sindrome.xlsx");
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
