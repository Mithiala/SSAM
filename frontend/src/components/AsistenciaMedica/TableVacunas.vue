<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="vaccines"
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
            @click="destroyVac(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent height >
      <q-card class="column width">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "paciente_vacuna" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempVacuna.vac_paciente"
                label="Nombre del paciente"
                :options="VacOption"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO: "Tipo de vacunación" -->
              <q-select
                class="col-4"
                dense
                outlined
                v-model="tempVacuna.tipo"
                label="Tipo de vacunación"
                :options="TipoOptions"
                behavior="menu"
              />

              <!-- TODO: "Lote" -->
              <q-input
                class="col-4"
                dense
                outlined
                label="Lote"
                v-model="tempVacuna.lote"
              />

              <!-- TODO: "Fecha de vacunación" -->
              <q-input
                class="col-2"
                dense
                outlined
                label="Fecha de vacunación"
                v-model="tempVacuna.fecha"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor inserte la fecha de vacunación',
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
                        v-model="tempVacuna.fecha"
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
                v-if="EditDG"
                @click="updateVac(tempVacuna.id)"
              />
              <q-btn
                class="col-3 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createVac(tempVacuna)"
              />
              <q-btn
                class="col-3 q-mx-sm"
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
import { useVaccinesStore } from "src/stores/Vaccines-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listVac();
  await listPacientes();
  // }
});

const {
  resetTempVac,
  listVac,
  listPacientes,
  createVac,
  updateVac,
  destroyVac,
} = useVaccinesStore();

const { vaccines, AddDG, EditDG, showDialogDG, loading, tempVacuna, tempPaciente } =
  storeToRefs(useVaccinesStore());

  const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre y Apellidos",
    field: "nombre",
    sortable: true,
  },
  {
    name: "edad",
    label: "Edad",
    field: "edad",
    align: "center",
    sortable: true,
    sort: (a, b) => a - b,
  },

  {
    name: 'tipo',
    align: 'center',
    label: 'Tipo de vacunación',
    field: 'tipo',
  },
  {
    name: 'lote',
    align: 'center',
    label: 'Lote',
    field: 'lote',
  },
  {
    name: 'fecha',
    align: 'center',
    label: 'Fecha de la vacunación',
    field: 'fecha'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempVacuna.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempVac();
  showDialogDG.value = true;
};

const TipoOptions = [
  "Toxoide tetánico",
  "Antigripal",
  "Biomodulina",
  "Interferón nasal",
  "PrevengoVir",
  "Otras",
];

const VacOption = [
  {
    label: "Andrés Cueva Heredia",
    value: "1",
  },
  {
    label: "Francisaca Navia Cuadrado",
    value: "2",
  },
];

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(vaccines.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Vaccines");
  writeFileXLSX(wb, "Vaccines.xlsx");
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
