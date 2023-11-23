<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row flex-center ">
      <h5 class="col-xs-11 col-sm-5 col-md-4 text-center text-weight-medium q-pt-sm q-mb-none ellipsis-2-lines ">
        Control de Material Gastable
      </h5>
      </div>
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="ctrlmatgastable"
      :columns="columnsss"
      row-key="id"
      :loading="loadingMG"
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
            @click="openAddDialogMG()"
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
            @click="exportFileMG"
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
            @click="openEditDialogMG(props.row)"
          />
          <q-btn
            flat
            round
            dense
            color="warning"
            icon="delete"
            @click="destroyMatg(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogMG" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "paciente_material gastable" -->
              <q-select
                class="col-3"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempGast.mg_paciente"
                label="Nombre del paciente"
                :options="MatOptions"
                @filter="filterMat"
                @popup-show="getNomMat"
                option-value="value"
                option-label="label"
              />

              <q-space class="col-1" />

              <!-- TODO:  "Fecha" -->
              <q-input
                class="col-2"
                dense
                outlined
                label="Fecha"
                v-model="tempGast.fecha_mat"
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
                        v-model="tempGast.fecha_mat"
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

              <q-space class="col-1" />

              <!-- TODO:  "Turno" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempGast.turno"
                label="Turno"
                :options="TurnoOptions"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Material utilizado" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="text"
                label="Material utilizado"
                v-model="tempGast.mat_util"
              />

              <!-- TODO:  "Medicamento utilizado" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="text"
                label="Medicamento utilizado"
                v-model="tempGast.med_util"
              />

              <!-- TODO:  "Vía de administración" -->
              <q-select
                class="col-3"
                outlined
                dense
                :options="ViaOptions"
                style="width: 250px"
                behavior="menu"
                label="Vía de administración"
                v-model="tempGast.via_admin"
              />

            </div>
            <div class="q-mt-lg row q-gutter-md justify-center">
              <q-btn
                class="col-2"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditMG"
                @click="updateMatg(tempGast.id)"
              />
              <q-btn
                class="col-2"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddMG"
                @click="createMatg(tempGast)"
              />
              <q-btn
                class="col-2"
                color="purple-9"
                label="Salir"
                @click="showDialogMG = false"
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
import { useCtrlmatgastableStore } from "src/stores/Ctrlmatgastable-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listMatg();
  // }
});

const {
  resetTempMatg,
  listMatg,
  createMatg,
  updateMatg,
  destroyMatg,
} = useCtrlmatgastableStore();

const { ctrlmatgastable, AddMG, EditMG, showDialogMG, loadingMG, tempGast, tempPaciente } =
  storeToRefs(useCtrlmatgastableStore());

const { listPacientes } = usePacientesStore();
const { pacientes } = storeToRefs(usePacientesStore());


  const columnsss = [
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
    name: "fecha_mat",
    align: "center",
    label: "Fecha",
    field: "fecha_mat",
  },
  {
    name: "turno",
    align: "center",
    label: "Turno",
    field: "turno",
    sortable: true,
  },
  {
    name: 'mat_util',
    align: 'center',
    label: 'Material utilizado',
    field: 'mat_util',
  },
  {
    name: 'med_util',
    align: 'center',
    label: 'Medicina utilizada',
    field: 'med_util',
  },
  {
    name: 'via_admin',
    align: 'center',
    label: 'Vía de administración',
    field: 'via_admin',
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialogMG = (row) => {
  AddMG.value = false;
  EditMG.value = true;
  tempGast.value = { ...row };
  showDialogMG.value = true;
};
const openAddDialogMG = () => {
  AddMG.value = true;
  EditMG.value = false;
  resetTempMatg();
  showDialogMG.value = true;
};

const TurnoOptions = [
  "7:00 am a 7:00 pm",
  "7:00 pm a 7:00 am",
]

const ViaOptions = [
  "Oral",
  "Tópica",
  "Subcutánea",
  "Intravenosa",
  "Intramuscular",
  "Inhalatoria",
]

const MatOptions = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomMat = async () => {
  console.log("hi");
  await listPacientes();
  pacientesArray.value = pacientes.value;
  MatOptions.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterMat(val, update) {
  if (val === "") {
    update(() => {
      MatOptions.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    MatOptions.value = pacientesArray.value
      .filter((item) => item.nombre.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
  });
}

const date = ref("");

// TODO: Export To Excel:
async function exportFileMG() {
  const ws = utils.json_to_sheet(ctrlmatgastable.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Ctrlmatgastable");
  writeFileXLSX(wb, "Ctrlmatgastable.xlsx");
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
