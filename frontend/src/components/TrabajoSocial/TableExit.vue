<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="controlpases"
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
          <q-space class="col-3" />
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
            @click="destroyPases(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDP" persistent full-medium >
      <q-card class="column">
        <q-card-section>
          <q-form class="">
            <div class="row justify-center q-gutter-md">

              <!-- TODO:  "familiar_pase" -->
              <q-select
                class="col-4"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempPase.cp_paciente"
                label="Nombre del paciente"
                :options="PaseOption"
                @filter="filterPase"
                @popup-show="getNomPase"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Fecha" -->
              <q-input
                class="col-4"
                dense
                outlined
                label="Fecha de salida"
                v-model="tempPase.fecha_salida"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de salida',
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
                        v-model="tempPase.fecha_salida"
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

              <!-- TODO:  "Fecha de regreso" -->
              <q-input
                class="col-4"
                dense
                outlined
                label="Fecha de regreso"
                v-model="tempPase.fecha_regreso"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de regreso',
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
                        v-model="tempPase.fecha_regreso"
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

              <!-- TODO: "Dirección particular" -->
              <q-input
                class="col-10"
                outlined
                dense
                type="text"
                label="Dirección particular"
                v-model="tempPase.direc_part"
              />
            </div>

            <div class="q-mt-lg row q-gutter-md justify-center">
              <q-btn
                class="col-3 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDP"
                @click="updatePases(tempPase.id)"
              />
              <q-btn
                class="col-3 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDP"
                @click="createPases(tempPase)"
              />
              <q-btn
                class="col-3 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogDP = false"
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
import { useControlPasesStore } from "src/stores/ControlPases-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listPases();
  // }
});

const {
  resetTempPases,
  listPases,
  createPases,
  updatePases,
  destroyPases,
} = useControlPasesStore();

const { controlpases, AddDP, EditDP, showDialogDP, loading, tempPase } =
  storeToRefs(useControlPasesStore());

  const { listPacientes } = usePacientesStore();

const { pacientes } = storeToRefs(usePacientesStore());

  const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre del paciente",
    field: "nombre",
    sortable: true,
  },
  {
    name: "edad",
    label: "Edad",
    align: "center",
    field: "edad",
    sortable: true,
    sort: (a, b) => a - b,
  },
  {
    name: "num_hs",
    label: "Historia social",
    field: "num_hs",
    align: "center",
  },
  {
    name: "nombre_f",
    align: "center",
    label: "Nombre del familiar",
    field: "nombre_f",
    sortable: true,
  },

  {
    name: 'fecha_salida',
    align: 'center',
    label: 'Fecha de salida',
    field: 'fecha_salida',
  },
  {
    name: 'direc_part',
    align: 'center',
    label: 'Dirección particular',
    field: 'direc_part'
  },
  {
    name: 'fecha_regreso',
    align: 'center',
    label: 'Fecha de regreso',
    field: 'fecha_regreso',
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDP.value = false;
  EditDP.value = true;
  tempPase.value = { ...row };
  showDialogDP.value = true;
};
const openAddDialog = () => {
  AddDP.value = true;
  EditDP.value = false;
  resetTempPases();
  showDialogDP.value = true;
};

const PasefOptions = [
  {
    label: "Juan",
    value: "1",
  },
  {
    label: "Pedro",
    value: "2",
  },
];

const PaseOption = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomPase = async () => {
  await listPacientes();
  pacientesArray.value = pacientes.value;
  PaseOption.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterPase(val, update) {
  if (val === "") {
    update(() => {
      PaseOption.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    PaseOption.value = pacientesArray.value
      .filter((item) => item.nombre.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
  });
}

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(controlpases.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "ControlPases");
  writeFileXLSX(wb, "ControlPases.xlsx");
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
    background-color: #2eb8a1

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
