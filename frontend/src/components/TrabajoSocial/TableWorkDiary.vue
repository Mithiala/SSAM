<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="trabajodiario"
      :columns="columns"
      :visible-columns="visibleColumns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[10, 20, 30]"
      separator="cell"
    >
      <template v-slot:top="props">
        <div
          class="row col-12">
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
          label="Trabajo diario"
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

      <!-- TODO:  "Método para image" -->
      <template v-slot:body-cell-recibidos="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.recibidos"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "método para enviados" -->
      <template v-slot:body-cell-enviados="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.enviados"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "método para efectuada" -->
      <template v-slot:body-cell-efectuada="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.efectuada"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para image" -->
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-avatar size="xl">
            <template v-if="props.row.image">
              <q-img :src="baseurl + props.row.image.url" />
            </template>
          </q-avatar>
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
            @click="destroyDiarios(props.row.id)"
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

              <!-- TODO:  "familiar_diario" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempDiario.td_familiar"
                label="Nombre del familiar"
                :options="FamilyOptions"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "paciente_diario" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempDiario.td_paciente"
                label="Nombre del paciente"
                :options="PacOptions"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Fecha de entrevista" -->
              <q-input
                class="col-3"
                dense
                outlined
                label="Fecha de entrevista"
                v-model="tempDiario.fecha_ent"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de la entrevista',
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
                        v-model="tempDiario.fecha_ent"
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

              <!-- TODO: "Entrevista en" -->
              <q-select
                class="col-3"
                outlined
                dense
                v-model="tempDiario.lugar_entrevista"
                label="Entrevista en:"
                :options="EntrevistaOptions"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el lugar de entrevista',
                ]"
              />

              <!-- TODO: "Recibidos" -->
              <q-checkbox
                style="max-width: 340px"
                class="col-2"
                rigth-label
                dense
                outlined
                v-model="tempDiario.recibidos"
                label="Recibidos"
              />

              <!-- TODO: "Enviados" -->
              <q-checkbox
                style="max-width: 340px"
                class="col-2"
                rigth-label
                dense
                outlined
                v-model="tempDiario.enviados"
                label="Enviados"
              />

              <q-space class="col-3" />

              <!-- TODO: "Medicamentos Autorizados" -->
              <q-input
                class="col-5"
                outlined
                dense
                type="textarea"
                label="Medicamentos Autorizados"
                v-model="tempDiario.tarjeton_medicamento"
              />

              <!-- TODO: "Observaciones" -->
              <q-input
                class="col-5"
                outlined
                dense
                type="textarea"
                label="Observaciones"
                v-model="tempDiario.observaciones"
              />

              <!-- TODO: "Motivo de investigación" -->
              <q-input
                class="col-8"
                outlined
                dense
                type="text"
                label="Motivo de investigación"
                v-model="tempDiario.mot_invest"
              />

              <!-- TODO: "Efectuada" -->
              <q-checkbox
                cstyle="max-width: 340px"
                class="col-2"
                rigth-label
                dense
                outlined
                v-model="tempDiario.efectuada"
                label="Efectuada"
              />

              <!-- TODO: "Conclusiones" -->
              <q-input
                class="col-8"
                outlined
                dense
                type="textarea"
                label="Conclusiones"
                v-model="tempDiario.conclusiones"
              />
            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateDiarios(tempDiario.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createDiarios(tempDiario)"
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
import { useTrabajoDiarioStore } from "src/stores/TrabajoDiario-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listDiarios();
  await listPacientes();
  // }
});

const {
  resetTempDiarios,
  listDiarios,
  listPacientes,
  createDiarios,
  updateDiarios,
  destroyDiarios,
} = useTrabajoDiarioStore();

const { trabajodiario, AddDG, EditDG, showDialogDG, loading, tempDiario, tempPaciente } =
  storeToRefs(useTrabajoDiarioStore());

  const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre y Apellidos",
    field: "nombre",
    sortable: true,
  },
  { name: "num_hs", align: "center", label: "Historia social", field: "num_hs" },

  {
    name: 'fecha_ent',
    align: 'center',
    label: 'Fecha',
    field: 'fecha_ent',
  },
  {
    name: 'lugar_entrevista',
    align: 'center',
    label: 'Entrevistas en:',
    field: 'lugar_entrevista',
  },
  {
    name: 'tarjeton_medicamento',
    align: 'center',
    label: 'Medicamentos autorizados',
    field: 'tarjeton_medicamento',
  },
  {
    name: 'recibidos',
    align: 'center',
    label: 'Recibidos',
    field: 'recibidos'
  },
  { name: "enviados", align: "center", label: "Enviados", field: "enviados" },
  {
    name: 'observaciones',
    align: 'center',
    label: 'Observaciones',
    field: 'observaciones'
  },
  {
    name: 'mot_invest',
    align: 'center',
    label: 'Motivo de investigación',
    field: 'mot_invest'
  },
  {
    name: 'efectuada',
    align: 'center',
    label: 'Efectuada',
    field: 'efectuada'
  },
  {
    name: 'conclusiones',
    align: 'center',
    label: 'Conclusiones',
    field: 'conclusiones'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempDiario.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempDiarios();
  showDialogDG.value = true;
};

const EntrevistaOptions = [
  "Departamento",
  "Sala",
  "Centro de trabajo",
  "Escuela",
  "Otros"
];

const FamilyOptions = [
  {
    label: "Juan",
    value: "1",
  },
  {
    label: "Pedro",
    value: "2",
  },
];

const PacOptions = [
  {
    label: "Andrés Cueva Heredia",
    value: "1",
  },
  {
    label: "Francisca Navia Cuadrado",
    value: "2",
  },
];

const visibleColumns = ref([
'fecha_ent',
'nombre',
'num_hs',
'lugar_entrevista',
'tarjeton_medicamento',
'recibidos',
'enviados',
'observaciones',
'mot_invest',
'efectuada',
'conclusiones',
'actions',
])

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(trabajodiario.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "TrabajoDiario");
  writeFileXLSX(wb, "TrabajoDiario.xlsx");
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
