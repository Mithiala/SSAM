<template>
  <div class="q-pa-md">
<div class="q-gutter-md row flex-center ">
  <h5 class="col-xs-11 col-sm-5 col-md-4 text-center text-weight-medium q-pt-sm q-mb-none ellipsis-2-lines ">
    Control Intercurrencia
  </h5>
  </div>
<q-table
  class="table"
  flat
  bordered
  color="green"
  :rows="ctrlintercurrencia"
  :columns="columnss"
  row-key="id"
  :loading="loadingIN"
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
        @click="openAddDialogIN()"
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
        @click="exportFileIN"
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
        @click="openEditDialogIN(props.row)"
      />
      <q-btn
        flat
        round
        dense
        color="warning"
        icon="delete"
        @click="destroyInt(props.row.id_inter)"
      />
    </q-td>
  </template>
</q-table>

<!-- TODO: Añadir - Editar -->
<q-dialog v-model="showDialogIN" persistent full-width >
  <q-card class="column medium">
    <q-card-section>
      <q-form>
        <div class="row justify-around q-gutter-md">

          <!-- TODO:  "paciente_intercurrencia" -->
          <q-select
                class="col-3"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempInter.inter_paciente"
                label="Nombre del paciente"
                :options="InterOptions"
                @filter="filterInter"
                @popup-show="getNomInter"
                option-value="value"
                option-label="label"
              />

          <!-- TODO:  "Tratamiento" -->
          <q-input
            class="col-8"
            type="textarea"
            dense
            outlined
            label="Tratamiento"
            v-model="tempInter.tratamiento"
          />

          <!-- TODO:  "Fecha de inicio" -->
          <q-input
                class="col-2"
                dense
                outlined
                label="Fecha de inicio"
                v-model="tempInter.fecha_inicio"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de inicio',
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
                        v-model="tempInter.fecha_inicio"
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

          <!-- TODO:  "Fecha en que termina" -->
          <q-input
                class="col-2"
                dense
                outlined
                label="Fecha del término"
                v-model="tempInter.fecha_termina"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de término',
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
                        v-model="tempInter.fecha_termina"
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
            v-if="EditIN"
            @click="updateInt(tempInter.id)"
          />
          <q-btn
            class="col-2 q-mx-sm"
            type="submit"
            label="Añadir"
            color="light-blue-8"
            v-if="AddIN"
            @click="createInt(tempInter)"
          />
          <q-btn
            class="col-2 q-mx-sm"
            color="purple-9"
            label="Salir"
            @click="showDialogIN = false"
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
import { useCtrlintercurrenciaStore } from "src/stores/Ctrlintercurrencia-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listInt();
  // }
});

const {
  resetTempInt,
  listInt,
  createInt,
  updateInt,
  destroyInt,
} = useCtrlintercurrenciaStore();

const { ctrlintercurrencia, AddIN, EditIN, showDialogIN, loadingIN, tempInter } =
  storeToRefs(useCtrlintercurrenciaStore());

const { listPacientes } = usePacientesStore();
const { pacientes } = storeToRefs(usePacientesStore());

  const columnss = [
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
    field: "edad",
    sortable: true,
    align: "center",
    sort: (a, b) => a - b,
  },
  {
    name: "tratamiento",
    align: "center",
    label: "Tratamiento",
    field: "tratamiento",
    sortable: true,
  },
  {
    name: "fecha_inicio",
    align: "center",
    label: "Fecha de Inicio",
    field: "fecha_inicio",
  },
  {
    name: 'fecha_termina',
    align: 'center',
    label: 'Fecha en que termina',
    field: 'fecha_termina',
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialogIN = (row) => {
  AddIN.value = false;
  EditIN.value = true;
  tempInter.value = { ...row };
  showDialogIN.value = true;
};
const openAddDialogIN = () => {
  AddIN.value = true;
  EditIN.value = false;
  resetTempInt();
  showDialogIN.value = true;
};

const InterOptions = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomInter = async () => {
  console.log("hi");
  await listPacientes();
  pacientesArray.value = pacientes.value;
  InterOptions.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterInter(val, update) {
  if (val === "") {
    update(() => {
      InterOptions.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    InterOptions.value = pacientesArray.value
      .filter((item) => item.nombre.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
  });
}

const date = ref("");

// TODO: Export To Excel:
async function exportFileIN() {
  const ws = utils.json_to_sheet(ctrlintercurrencia.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Ctrlintercurrencia");
  writeFileXLSX(wb, "Intercurrencia.xlsx");
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
