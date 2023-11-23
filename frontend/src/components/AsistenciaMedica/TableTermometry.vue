<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="termometria"
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
            @click="destroyTer(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "paciente_ayuda tecnica" -->
              <q-select
                class="col-3"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempTermo.ter_paciente"
                label="Nombre del paciente"
                :options="IndOptions"
                @filter="filterInd"
                @popup-show="getNomInd"
                option-value="value"
                option-label="label"
                />

              <!-- TODO: "Hora 6:00am" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="text"
                label="Hora 6:00am"
                v-model="tempTermo.hora_6am"
              />

              <!-- TODO: "Hora 2:00pm" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="text"
                label="Hora 2:00pm"
                v-model="tempTermo.hora_2pm"
              />

              <!-- TODO: "Hora 10:00pm" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="text"
                label="Hora 10:00pm"
                v-model="tempTermo.hora_10pm"
              />

              <!-- TODO: "Fecha" -->
              <q-input
                class="col-2"
                dense
                outlined
                label="Fecha"
                v-model="tempTermo.fecha"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha',
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
                        v-model="tempTermo.fecha"
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

              <!-- TODO: "Observaciones" -->
              <q-input
                class="col-8"
                type="textarea"
                dense
                outlined
                label="Observaciones"
                v-model="tempTermo.observaciones"
              />

            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateTer(tempTermo.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createTer(tempTermo)"
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
import { useTermometriaStore } from "src/stores/Termometria-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listTer();
  // }
});

const {
  resetTempTer,
  listTer,
  createTer,
  updateTer,
  destroyTer,
} = useTermometriaStore();

const { termometria, AddDG, EditDG, showDialogDG, loading, tempTermo } =
  storeToRefs(useTermometriaStore());

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
    name: 'hora_6am',
    align: 'center',
    label: 'Hora_6am',
    field: 'hora_6am',
  },
  {
    name: 'hora_2pm',
    align: 'center',
    label: 'Hora_2pm',
    field: 'hora_2pm',
  },
  {
    name: 'hora_10pm',
    align: 'center',
    label: 'Hora_10pm',
    field: 'hora_10pm'
  },
  {
    name: 'fecha',
    align: 'center',
    label: 'Fecha',
    field: 'fecha',
  },
  {
    name: 'observaciones',
    align: 'center',
    label: 'Observaciones',
    field: 'observaciones'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempTermo.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempTer();
  showDialogDG.value = true;
};

// ----------Relacion paciente--------------------
const IndOptions = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomInd = async () => {
  console.log("hi");
  await listPacientes();
  pacientesArray.value = pacientes.value;
  IndOptions.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterInd(val, update) {
  if (val === "") {
    update(() => {
      IndOptions.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    IndOptions.value = pacientesArray.value
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
  const ws = utils.json_to_sheet(termometria.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Termometria");
  writeFileXLSX(wb, "Termometria.xlsx");
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
