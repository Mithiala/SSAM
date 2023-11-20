<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="indice"
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
            @click="destroyIndices(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "paciente_ayuda tecnica" -->
                <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndice.ind_paciente"
                label="Nombre del paciente"
                :options="IndOption"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Estado general" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndice.estado_general"
                label="Estado General"
                :options="GenOption"
                style="width: 250px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Estado mental" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndice.estado_mental"
                label="Estado Mental"
                :options="MentOption"
                style="width: 250px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Actividad" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndice.actividad"
                label="Actividad"
                :options="ActOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Movilidad" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndice.movilidad"
                label="Movilidad"
                :options="MovOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Incontinencia" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndice.incontinencia"
                label="Incontinencia"
                :options="IncontOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Fecha" -->
              <q-input
                class="col-2"
                dense
                outlined
                label="Fecha de evaluación"
                v-model="tempIndice.fecha"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de la evaluación',
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
                        v-model="tempIndice.fecha"
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

              <!-- TODO:  "Resultado" -->
              <q-input
              class="col-2"
                outlined
                dense
                readonly
                type="text"
                label="Resultado"
                v-model="tempIndice.resultado"
              />

            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateIndices(tempIndice.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createIndices(tempIndice)"
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
import { useIndiceStore } from "src/stores/Indice-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listIndices();
  await listPacientes();
  // }
});

const {
  resetTempIndices,
  listIndices,
  listPacientes,
  createIndices,
  updateIndices,
  destroyIndices,
} = useIndiceStore();

const { indice, AddDG, EditDG, showDialogDG, loading, tempIndice, tempPaciente } =
  storeToRefs(useIndiceStore());

  const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre y Apellidos",
    field: "nombre",
    sortable: true,
  },

  {
    name: 'fecha',
    align: 'center',
    label: 'Fecha de evaluación',
    field: 'fecha'
  },
  {
    name: 'estado_general',
    align: 'center',
    label: 'Estado general',
    field: 'estado_general',
  },
  {
    name: 'estado_mental',
    align: 'center',
    label: 'Estado mental',
    field: 'estado_mental',
  },
  {
    name: 'actividad',
    align: 'center',
    label: 'Actividad',
    field: 'actividad'
  },
  {
    name: 'movilidad',
    align: 'center',
    label: 'Movilidad',
    field: 'movilidad',
  },
  {
    name: 'incontinencia',
    align: 'center',
    label: 'Incontinencia',
    field: 'incontinencia'
  },
  {
    name: 'resultado',
    align: 'center',
    label: 'Resultado',
    field: 'resultado'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempIndice.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempIndices();
  showDialogDG.value = true;
};

const IndOption = [
  {
    label: "Andrés Cueva Heredia",
    value: "1",
  },
  {
    label: "Francisaca Navia Cuadrado",
    value: "2",
  },
];

const IncontOptions = [
  {
    label: "Ninguna",
    value: "4",
  },
  {
    label: "Ocacional",
    value: "3",
  },
  {
    label: "Urinaria",
    value: "2",
  },
  {
    label: "Doble Incontinencia",
    value: "1",
  },
];

const MovOptions = [
  {
    label: "Total",
    value: "4",
  },
  {
    label: "Disminuido",
    value: "3",
  },
  {
    label: "Muy Limitado",
    value: "2",
  },
  {
    label: "Inmovil",
    value: "1",
  },
];

const GenOption = [
  {
    label: "Bueno",
    value: "4",
  },
  {
    label: "Débil",
    value: "3",
  },
  {
    label: "Malo",
    value: "2",
  },
  {
    label: "Muy Malo",
    value: "1",
  },
];

const MentOption = [
  {
    label: "Alerta",
    value: "4",
  },
  {
    label: "Apático",
    value: "3",
  },
  {
    label: "Confuso",
    value: "2",
  },
  {
    label: "Estuporoso",
    value: "1",
  },
];

const ActOptions = [
  {
    label: "Caminando",
    value: "4",
  },
  {
    label: "Sentado",
    value: "3",
  },
  {
    label: "Con ayuda",
    value: "2",
  },
  {
    label: "En cama",
    value: "1",
  },
];

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(indice.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Indice");
  writeFileXLSX(wb, "Indice.xlsx");
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
