<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row flex-center ">
      <h5 class="col-xs-11 col-sm-5 col-md-4 text-center text-weight-medium q-pt-sm q-mb-none ellipsis-2-lines ">
        Evaluación Kats
      </h5>
      </div>
    <div>
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="enfvalue"
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
            @click="destroyValues(props.row.id)"
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

              <!-- TODO:  "paciente_kats" -->
              <q-select
                class="col-3"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempValue.kat_paciente"
                label="Nombre del paciente"
                :options="IndOptions"
                @filter="filterInd"
                @popup-show="getNomInd"
                option-value="value"
                option-label="label"
                />

              <!-- TODO:  "Bañarse" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.banarse"
                label="Bañarse"
                :options="BaOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Vestirse" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.vestirse"
                label="Vestirse"
                :options="VesOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Ir al servicio" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.servicio"
                label="Ir al servicio"
                :options="SerOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Levantarse" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.levantarse"
                label="Levantarse"
                :options="LevOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Continencia" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.continencia"
                label="Continencia"
                :options="ContOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Comer" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.comer"
                label="Comer"
                :options="ComerOptions"
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
                label="Fecha evaluación"
                v-model="tempValue.fecha_kats"
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
                        v-model="tempValue.fecha_kats"
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
                v-if="EditDG"
                @click="updateValues(tempValue.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createValues(tempValue)"
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
  </div>
</template>

<script setup>
import { PDFDocument, StandardFonts } from "pdf-lib";
import { utils, writeFileXLSX } from "xlsx";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useEnfvalueStore } from "src/stores/Enfvalue-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listValues();
  // }
});

const {
  resetTempValues,
  listValues,
  createValues,
  updateValues,
  destroyValues,
} = useEnfvalueStore();

const { enfvalue, AddDG, EditDG, showDialogDG, loading, tempValue } =
  storeToRefs(useEnfvalueStore());

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
    name: 'banarse',
    align: 'center',
    label: 'Bañarse',
    field: 'banarse',
  },
  {
    name: 'vestirse',
    align: 'center',
    label: 'Vestirse',
    field: 'vestirse',
  },
  {
    name: 'servicio',
    align: 'center',
    label: 'Ir al servicio',
    field: 'servicio',
  },
  {
    name: 'levantarse',
    align: 'center',
    label: 'Levantarse',
    field: 'levantarse'
  },
  {
    name: 'continencia',
    align: 'center',
    label: 'Continencia',
    field: 'continencia',
  },
  {
    name: 'comer',
    align: 'center',
    label: 'Comer',
    field: 'comer'
  },
  {
    name: 'fecha_kats',
    align: 'center',
    label: 'Fecha',
    field: 'fecha_kats'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempValue.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempValues();
  showDialogDG.value = true;
};

const BaOptions = [
  "Dependiente",
  "Independiente",
];

const VesOptions = [
  "Dependiente",
  "Independiente",
];

const SerOptions = [
  "Dependiente",
  "Independiente",
];

const LevOptions = [
  "Dependiente",
  "Independiente",
];

const ContOptions = [
  "Dependiente",
  "Independiente",
];

const ComerOptions = [
  "Dependiente",
  "Independiente",
];

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
  const ws = utils.json_to_sheet(enfvalue.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Enfvalue");
  writeFileXLSX(wb, "Enfvalue.xlsx");
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
