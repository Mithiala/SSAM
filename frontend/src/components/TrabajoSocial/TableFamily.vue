<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="composicionfamiliar"
      :columns="columns"
      row-key="id"
      :visible-columns="visibleColumns"
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

          <q-select
          label="Familiares"
          bg-color="teal-3"
          v-model="visibleColumns"
          transition-show="scale"
          transition-hide="scale"
          multiple
          outlined
          dense
          standout="bg-teal-10 text-white"
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="field"
          options-cover
          style="min-width: 150px"
        />

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
            @click="destroyFamiliares(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form class="">
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "encuesta_cf_paciente" -->
              <q-select
                class="col-3"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempFamiliar.cf_paciente"
                label="Nombre del paciente"
                :options="FamiliaOption"
                @filter="filterFamilia"
                @popup-show="getNomFamilia"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Nombre y Apellidos" -->
              <q-input
                class="col-5"
                outlined
                dense
                type="text"
                label="Nombre y Apellidos"
                v-model="tempFamiliar.nombre_f"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el nombre del familiar',
                ]"
              />

              <!-- TODO:  "Edad" -->
              <q-input
                class="col-1"
                outlined
                dense
                type="number"
                label="Edad"
                lazy-rules
                v-model="tempFamiliar.edad"
                :rules="[
                  (val) =>
                    (val > 0 && val < 100) || 'Por favor ingrese la edad real',
                ]"
                mask="##"
              />

              <!-- TODO:  "Parentesco" -->
              <q-select
                class="col-2"
                outlined
                dense
                label="Parentesco"
                v-model="tempFamiliar.parentesco"
                :options="ParentOptions"
                style="width: 170px"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el parentesco del familiar',
                ]"
              />

              <!-- TODO:  "Teléfono" -->
              <q-input
                class="col-1"
                outlined
                dense
                v-model="tempFamiliar.telefono"
                label="Teléfono"
              />

              <!-- TODO:  "Dirección particular" -->
              <q-input
                class="col-5"
                outlined
                dense
                type="text"
                v-model="tempFamiliar.direc_part"
                label="Dirección particular"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el la dirección particular del familiar',
                ]"
              />

              <!-- TODO:  "Estado civil" -->
              <q-select
                class="col-3"
                outlined
                dense
                v-model="tempFamiliar.estado_civil"
                label="Estado civil"
                :options="CivilOptions"
                style="width: 170px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el estado civil del familiar',
                ]"
              />

              <!-- TODO:  "Escolaridad" -->
              <q-select
                class="col-3"
                outlined
                dense
                v-model="tempFamiliar.escolaridad"
                label="Escolaridad"
                :options="EscOptions"
                style="width: 150px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el nivel escolar del familiar',
                ]"
              />

              <!-- TODO:  "Ocupación" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="text"
                label="Ocupación"
                v-model="tempFamiliar.ocupacion"
              />

              <!-- TODO:  "Ingreso económico" -->
              <q-input
                class="col-10"
                outlined
                dense
                type="text"
                label="Ingreso económico"
                v-model="tempFamiliar.ingreso_economico"
              />
            </div>

            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateFamiliares(tempFamiliar.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createFamiliares(tempFamiliar)"
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
import { useComposicionFamiliarStore } from "src/stores/ComposicionFamiliar-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listFamiliares();
  // }
});

const {
  resetTempFamiliares,
  listFamiliares,
  createFamiliares,
  updateFamiliares,
  destroyFamiliares,
} = useComposicionFamiliarStore();

const { composicionfamiliar, AddDG, EditDG, showDialogDG, loading, tempFamiliar } =
  storeToRefs(useComposicionFamiliarStore());

  const { listPacientes } = usePacientesStore();

const { pacientes } = storeToRefs(usePacientesStore());

  const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre del Paciente",
    field: "nombre",
    sortable: true,
  },
  {
    name: "recibevisita",
    label: "Recibe visitas",
    field: "recibevisita",
    align: "center",
  },

  {
    name: 'nombre_f',
    align: 'center',
    sortable: true,
    label: 'Nombre y Apellidos',
    field: 'nombre_f',
  },
  {
    name: "edad",
    label: "Edad",
    field: "edad",
    align: 'center',
    sortable: true,
    sort: (a, b) => a - b,
  },
  {
    name: 'parentesco',
    align: 'center',
    label: 'Parentesco',
    field: 'parentesco'
  },
  {
    name: "telefono",
    label: "Teléfono",
    field: "telefono",
    align: 'center',
  },
  {
    name: 'direc_part',
    align: 'center',
    label: 'Dirección particular',
    field: 'direc_part'
  },
  {
    name: 'estado_civil',
    align: 'center',
    label: 'Estado civil',
    field: 'estado_civil'
  },
  {
    name: 'escolaridad',
    align: 'center',
    label: 'Escolaridad',
    field: 'escolaridad'
  },
  {
    name: 'ocupacion',
    align: 'center',
    label: 'Ocupación',
    field: 'ocupacion'
  },
  {
    name: 'ingreso_economico',
    align: 'center',
    label: 'Ingreso económico',
    field: 'ingreso_economico'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempFamiliar.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempFamiliares();
  showDialogDG.value = true;
};

const FamiliaOption = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomFamilia = async () => {
  await listPacientes();
  pacientesArray.value = pacientes.value;
  FamiliaOption.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterFamilia(val, update) {
  if (val === "") {
    update(() => {
      FamiliaOption.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    FamiliaOption.value = pacientesArray.value
      .filter((item) => item.nombre.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
  });
}

const CivilOptions = [
  "Casado",
  "Soltero",
  "Unión Consensual",
  "Viudo",
  "Divorciado"
];

const EscOptions = [
  "Primaria",
  "Secundaria",
  "Preuniversitaria",
  "Universitaria",
];

const ParentOptions = [
  'Hijos',
  'Esposo(a)',
  'Sobrino(a)',
  'Nietos',
  'Hermanos',
  'Sin Familia',
  'Otros(hijastros)',
]

const visibleColumns = ref([
'nombre',
'recibevisita',
'nombre_f',
'edad',
'parentesco',
'telefono',
'direc_part',
'estado_civil',
'escolaridad',
'ocupacion',
'ingreso_economico',
'actions',
])

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(composicionfamiliar.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "ComposicionFamiliar");
  writeFileXLSX(wb, "ComposicionFamiliar.xlsx");
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
