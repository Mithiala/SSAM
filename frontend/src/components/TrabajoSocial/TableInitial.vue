<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="encuestainicial"
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
          label="Encuesta inicial"
          bg-color="teal-3"
          v-model="visibleColumns"
          transition-show="scale"
          transition-hide="scale"
          multiple
          outlined
          standout="bg-teal-10 text-white"
          dense
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

      <!-- TODO:  "Método para lectura" -->
      <template v-slot:body-cell-lectura="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.lectura"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para tv" -->
      <template v-slot:body-cell-tv="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.tv"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para juegos de mesa" -->
      <template v-slot:body-cell-juegomesa="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.juegomesa"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para cine" -->
      <template v-slot:body-cell-cine="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.cine"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para radio" -->
      <template v-slot:body-cell-radio="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.radio"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para pelota" -->
      <template v-slot:body-cell-pelota="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.pelota"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para otras" -->
      <template v-slot:body-cell-otras="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.otras"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para ingresado" -->
      <template v-slot:body-cell-ingresado="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.ingresado"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para jefe de núcleo" -->
      <template v-slot:body-cell-jefenucleo="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.jefenucleo"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para impedido físico" -->
      <template v-slot:body-cell-impfisico="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.impfisico"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para prótesis" -->
      <template v-slot:body-cell-protesis="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.protesis"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para calsado ortopédico" -->
      <template v-slot:body-cell-calsadoortop="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.calsadoortop"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para espejuelos" -->
      <template v-slot:body-cell-espejuelos="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.espejuelos"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para resibe visitas" -->
      <template v-slot:body-cell-visitafamiliares="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.visitafamiliares"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para visita de amistades" -->
      <template v-slot:body-cell-visitaamistades="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.visitaamistades"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para avisarle de ingreso" -->
      <template v-slot:body-cell-avisarleingreso="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.avisarleingreso"
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
            @click="destroyEncuestas(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO:  "Añadir -- editar" -->
    <q-dialog v-model="showDialogDG" persistent full-width >
      <q-card class="column full-height">
        <q-card-section>
          <q-form class="">
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "Fecha" -->
              <q-input
                class="col-2 q-gutter-md"
                dense
                outlined
                label="Fecha"
                v-model="tempEncuesta.fecha"
                mask="date"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de la encuesta',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="tempEncuesta.fecha" color="green-5" mask="YYYY-MM-DD">
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

              <!-- TODO:  "lectura" -->
              <q-checkbox
                style="max-width: 100px"
                class="col-2"
                rigth-label
                dense
                outlined
                v-model="tempEncuesta.lectura"
                label="Lectura"
              />

              <!-- TODO:  "tv" -->
              <q-checkbox
                style="max-width: 80px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.tv"
                label="TV"
              />

              <!-- TODO:  "juegos de mesa" -->
              <q-checkbox
                style="max-width: 130px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.juegomesa"
                label="Juego de mesa"
              />

              <!-- TODO:  "cine" -->
              <q-checkbox
                style="max-width: 80px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.cine"
                label="Cine"
              />

              <!-- TODO:  "radio" -->
              <q-checkbox
                style="max-width: 80px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.radio"
                label="Radio"
              />

              <!-- TODO:  "pelota" -->
              <q-checkbox
                style="max-width: 80px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.pelota"
                label="Pelota"
              />

              <!-- TODO:  "otras" -->
              <q-checkbox
                style="max-width: 80px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.otras"
                label="Otras"
              />

              <!-- TODO:  "Procedencia si es atendido por la asistencia social" -->
              <q-input
                class="col-6"
                outlined
                dense
                type="text"
                label="Procedencia si es atendido por la asistencia social"
                v-model="tempEncuesta.procedencia_at_asist_social"
              />

              <!-- TODO:  "¿Qué persona cobra su chequera?" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="text"
                label="¿Qué persona cobra su chequera?"
                v-model="tempEncuesta.persona_cobra_chequera"
              />

              <!-- TODO:  "Grado de parentesco" -->
              <q-select
                class="col-2"
                outlined
                dense
                label="Parentesco"
                v-model="tempEncuesta.grado_parentesco"
                :options="ParentOptions"
                style="width: 170px"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el parentesco del familiar',
                ]"
              />

              <!-- TODO:  "Dirección de la persona responsable" -->
              <q-input
                class="col-5"
                outlined
                dense
                type="text"
                label="Dirección de la persona responsable"
                v-model="tempEncuesta.direc_person_responsable"
              />

              <!-- TODO:  "¿A estado ingresado?" -->
              <q-checkbox
                style="max-width: 170px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.ingresado"
                label="¿A estado ingresado?"
              />

              <!-- TODO:  "Motivo" -->
              <q-input
                class="col-4"
                outlined
                dense
                type="text"
                label="Motivo"
                v-model="tempEncuesta.motivo"
              />

              <!-- TODO:  "Antes de ingreso dónde residía" -->
              <q-input
                class="col-4"
                outlined
                dense
                type="text"
                label="Antes de ingreso dónde residía"
                v-model="tempEncuesta.antes_donde_residia"
              />

              <!-- TODO:  "¿Era jefa de núcleo?" -->
              <q-checkbox
                style="max-width: 170px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.jefenucleo"
                label="¿Era jefa de núcleo?"
              />

              <!-- TODO:  "Impedido físico" -->
              <q-checkbox
                style="max-width: 170px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.impfisico"
                label="Impedido físico"
              />

              <!-- TODO:  "Prótesis" -->
              <q-checkbox
                style="max-width: 170px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.protesis"
                label="Prótesis"
              />

              <!-- TODO:  "Calzado ortopédico" -->
              <q-checkbox
                style="max-width: 170px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.calsadoortop"
                label="Calzado ortopédico"
              />

              <!-- TODO:  "Espejuelos" -->
              <q-checkbox
                style="max-width: 170px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.espejuelos"
                label="Espejuelos"
              />

              <!-- TODO:  "Recibe visita de familiares" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.visitafamiliares"
                label="Recibe visita de familiares"
              />

              <!-- TODO:  "Recibe visita de amistades" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.visitaamistades"
                label="Recibe visita de amistades"
              />

              <!-- TODO:  "Recibe visita de amistades" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-2"
                rigth-label
                dense
                v-model="tempEncuesta.avisarleingreso"
                label="Avisarles de ingreso"
              />

              <!-- TODO:  "Antecedentes patológicos" -->
              <q-input
                class="col-10"
                type="textarea"
                dense
                outlined
                label="Antecedentes patológicos"
                v-model="tempEncuesta.antecedentes_patologicos"
              />
            </div>

            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateEncuestas(tempEncuesta.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createEncuestas(tempEncuesta)"
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
import { useEncuestaInicialStore } from "src/stores/EncuestaInicial-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listEncuestas();
  await listPacientes();
  // }
});

const {
  resetTempEncuestas,
  listEncuestas,
  listPacientes,
  createEncuestas,
  updateEncuestas,
  destroyEncuestas,
} = useEncuestaInicialStore();

const { encuestainicial, AddDG, EditDG, showDialogDG, loading, tempEncuesta, tempPaciente } =
  storeToRefs(useEncuestaInicialStore());

  const baseurl = "http://127.0.0.1:8000";

  const columns = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    align: "center",
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },

  {
    name: "image",
    align: "center",
    label: "Foto",
    field: "image",
  },
  {
    name: "nombre",
    align: "center",
    label: "Nombre del paciente",
    field: "nombre",
    sortable: true,
  },
  {
    name: "ci",
    align: "center",
    label: "Carnet de identidad",
    field: "ci"
  },
  {
    name: "num_hs",
    align: "center",
    label: "Historia social",
    field: "num_hs"
  },
  {
    name: "fecha_inscripcion",
    label: "Fecha de inscripción",
    field: "fecha_inscripcion",
    align: "center",
  },

  {
    name: "fecha",
    label: "Fecha",
    field: "fecha",
    align: "center",
  },

  {
    name: 'lectura',
    align: 'center',
    label: 'Lectura',
    field: 'lectura',
  },
  {
    name: 'tv',
    align: 'center',
    label: 'TV',
    field: 'tv',
  },
  {
    name: 'juegomesa',
    align: 'center',
    label: 'Juego de mesa',
    field: 'juegomesa',
  },
  {
    name: 'cine',
    align: 'center',
    label: 'Cine',
    field: 'cine',
  },
  {
    name: 'radio',
    align: 'center',
    label: 'Radio',
    field: 'radio',
  },
  {
    name: 'pelota',
    align: 'center',
    label: 'Pelota',
    field: 'pelota',
  },
  {
    name: 'otras',
    align: 'center',
    label: 'Otras',
    field: 'otras',
  },
  {
    name: 'procedencia_at_asist_social',
    align: 'center',
    label: 'Procedencia si es atendido por la asistencia social',
    field: 'procedencia_at_asist_social',
  },
  {
    name: 'persona_cobra_chequera',
    align: 'center',
    label: '¿Qué persona cobra su chequera?',
    field: 'persona_cobra_chequera'
  },
  {
    name: 'grado_parentesco',
    align: 'center',
    label: 'Grado de parentesco',
    field: 'grado_parentesco'
  },
  {
    name: 'direc_person_responsable',
    align: 'center',
    label: 'Dirección de la persona responsable',
    field: 'direc_person_responsable'
  },
  {
    name: 'ingresado',
    align: 'center',
    label: '¿A estado ingresado?',
    field: 'ingresado'
  },
  {
    name: 'motivo',
    align: 'center',
    label: 'Motivo',
    field: 'motivo'
  },
  {
    name: 'antes_donde_residia',
    align: 'center',
    label: 'Antes de ingreso donde residía',
    field: 'antes_donde_residia'
  },
  {
    name: 'jefenucleo',
    align: 'center',
    label: '¿Era jefa de núcleo?',
    field: 'jefenucleo'
  },
  {
    name: 'impfisico',
    align: 'center',
    label: 'Impedido físico',
    field: 'impfisico'
  },
  {
    name: 'protesis',
    align: 'center',
    label: 'Prótesis',
    field: 'protesis'
  },
  {
    name: 'calsadoortop',
    align: 'center',
    label: 'Calsado ortopédico',
    field: 'calsadoortop'
  },
  {
    name: 'espejuelos',
    align: 'center',
    label: 'Espejuelos',
    field: 'espejuelos'
  },
  {
    name: 'visitafamiliares',
    align: 'center',
    label: 'Recibe visita de familiares',
    field: 'visitafamiliares'
  },
  {
    name: 'visitaamistades',
    align: 'center',
    label: 'Recibe visita de amistades',
    field: 'visitaamistades'
  },
  {
    name: 'avisarleingreso',
    align: 'center',
    label: 'Avisarles de ingreso',
    field: 'avisarleingreso'
  },
  {
    name: 'antecedentes_patologicos',
    align: 'center',
    label: 'Antecedentes patológicos',
    field: 'antecedentes_patologicos'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempEncuesta.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempEncuestas();
  showDialogDG.value = true;
};

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
  'id_encuesta',
  'image',
  'nombre',
  'ci',
  'num_hs',
  'fecha_inscripcion',
  'fecha',
  'lectura',
  'tv',
  'juegomesa',
  'cine',
  'radio',
  'pelota',
  'otras',
  'procedencia_at_asist_social',
  'persona_cobra_chequera',
  'grado_parentesco',
  'ingresado',
  'motivo',
  'antes_donde_residia',
  'direc_person_responsable',
  'jefenucleo',
  'impfisico',
  'protesis',
  'calsadoortop',
  'espejuelos',
  'visitafamiliares',
  'visitaamistades',
  'avisarleingreso',
  'antecedentes_patologicos',
  'actions',
])
const date = ref("")

const imagenFile = ref(null);
const imagenURL = ref("");
function generarURL() {
  if (tempPaciente.value.image) {
    imagenURL.value = URL.createObjectURL(tempPaciente.value.image);
  } else {
    imagenURL.value = "";
  }
}

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(encuestainicial.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "EncuestaInicial");
  writeFileXLSX(wb, "EncuestaInicial.xlsx");
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
