<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row flex-center ">
      <h5 class="col-xs-11 col-sm-5 col-md-4 text-center text-weight-medium q-pt-sm q-mb-none ellipsis-2-lines ">
        Control Glucémico
      </h5>
      </div>
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="ctrlglucemico"
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
            @click="destroyGlu(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogGL" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "paciente_glucemico" -->
              <q-select
                class="col-3"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempGlucemico.gluc_paciente"
                label="Nombre del paciente"
                :options="GlucemicoOptions"
                @filter="filterGlucemico"
                @popup-show="getNomGlucemico"
                option-value="value"
                option-label="label"
              />

              <q-space class="col-1" />

              <!-- TODO:  "Fecha" -->
              <q-input
                class="col-3"
                dense
                outlined
                label="Fecha"
                v-model="tempGlucemico.fecha_gluc"
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
                        v-model="tempGlucemico.fecha_gluc"
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
                v-model="tempGlucemico.turno"
                label="Turno"
                :options="TurnoOptions"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Resultado" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Resultado"
                v-model="tempGlucemico.resultado"
              />

              <!-- TODO:  "Observaciones" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Observaciones"
                v-model="tempGlucemico.observaciones"
              />

            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditGL"
                @click="updateGlu(tempGlucemico.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddGL"
                @click="createGlu(tempGlucemico)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogGL = false"
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
import { useCtrlglucemicoStore } from "src/stores/Ctrlglucemico-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listGlu();
  // }
});

const {
  resetTempGlu,
  listGlu,
  createGlu,
  updateGlu,
  destroyGlu,
} = useCtrlglucemicoStore();

const { ctrlglucemico, AddGL, EditGL, showDialogGL, loading, tempGlucemico } =
  storeToRefs(useCtrlglucemicoStore());

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
    field: "edad",
    sortable: true,
    align: "center",
    sort: (a, b) => a - b,
  },
  {
    name: "turno",
    align: "center",
    label: "Turno",
    field: "turno",
    sortable: true,
  },
  {
    name: "fecha_gluc",
    align: "center",
    label: "Fecha",
    field: "fecha_gluc",
  },
  {
    name: 'resultado',
    align: 'center',
    label: 'Resultado',
    field: 'resultado',
  },
  {
    name: 'observaciones',
    align: 'center',
    label: 'Observaciones',
    field: 'observaciones',
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddGL.value = false;
  EditGL.value = true;
  tempGlucemico.value = { ...row };
  showDialogGL.value = true;
};
const openAddDialog = () => {
  AddGL.value = true;
  EditGL.value = false;
  resetTempGlu();
  showDialogGL.value = true;
};

const TurnoOptions = [
  "7:00 am a 7:00 pm",
  "7:00 pm a 7:00 am",
]

const GlucemicoOptions = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomGlucemico = async () => {
  console.log("hi");
  await listPacientes();
  pacientesArray.value = pacientes.value;
  GlucemicoOptions.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterGlucemico(val, update) {
  if (val === "") {
    update(() => {
      GlucemicoOptions.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    GlucemicoOptions.value = pacientesArray.value
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
  const ws = utils.json_to_sheet(ctrlglucemico.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Ctrlglucémico");
  writeFileXLSX(wb, "Glucémico.xlsx");
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
