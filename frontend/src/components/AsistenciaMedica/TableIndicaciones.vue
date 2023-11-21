<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="indicaciones"
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
          bg-color="teal-3"
          label="Discapacidad"
          v-model="visibleColumns"
          transition-show="scale"
          transition-hide="scale"
          multiple
          outlined
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

      <!-- TODO:  "Método evitar caidas" -->
      <template v-slot:body-cell-evitar_caidas="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.evitar_caidas"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método glicemia" -->
      <template v-slot:body-cell-glicemia="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.glicemia"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método cambio de ropa" -->
      <template v-slot:body-cell-camb_ropa="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.camb_ropa"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método crisis convulsivas" -->
      <template v-slot:body-cell-crisis_convul="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.crisis_convul"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método restriccion" -->
      <template v-slot:body-cell-restriccion="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.restriccion"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método oxigenoterapia" -->
      <template v-slot:body-cell-oxigenot="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.oxigenot"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método sonda vesical" -->
      <template v-slot:body-cell-sonda="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.sonda"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
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
            @click="destroyIndic(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogIM" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "paciente_ayuda tecnica" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.indic_paciente"
                label="Nombre del paciente"
                :options="PacOption"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "temperatura" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.indic_termo"
                label="Temperatura"
                :options="TerOption"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "paciente_ayuda tecnica" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.indic_datoenf"
                label="IMC"
                :options="EnfOption"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Fecha" -->
              <q-input
                class="col-2"
                dense
                outlined
                label="Fecha"
                v-model="tempIndi.fecha"
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
                        v-model="tempIndi.fecha"
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

              <!-- TODO:  "Calorias" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="text"
                label="Calorías"
                v-model="tempIndi.calorias"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese las calorías del paciente'
                ]"
              />

              <!-- TODO:  "Hora" -->
              <q-select
                class="col-2"
                dense
                outlined
                v-model="tempIndi.momento"
                label="Hora"
                :options="MomOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la hora'
                ]"
              />

              <!-- TODO:  "Signos vitales" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="text"
                label="Signos vitales"
                v-model="tempIndi.sig_vitales"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese los signos vitales del paciente'
                ]"
              />

              <!-- TODO:  "Control del peso semanal" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="text"
                label="Control del peso semanal"
                v-model="tempIndi.ctrl_peso"
              />

              <!-- TODO:  "Dieta" -->
              <q-select
                class="col-4"
                dense
                outlined
                v-model="tempIndi.dieta"
                label="Dieta"
                :options="DietaOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la dieta correspondiente',
                ]"
              />

              <!-- TODO: "Evitar caídas" -->
              <q-checkbox
                style="max-width: 220px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempIndi.evitar_caidas"
                label="Evitar caídas"
              />

              <!-- TODO: "Cambio de ropa" -->
              <q-checkbox
                style="max-width: 220px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempIndi.camb_ropa"
                label="Cambio de ropa"
              />

              <!-- TODO: "Glicemia" -->
              <q-checkbox
                style="max-width: 220px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempIndi.glicemia"
                label="Glicemia"
              />

              <!-- TODO:  "Indicaciones de la glicemia" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones de la glicemia"
                v-model="tempIndi.ind_glic"
              />

              <!-- TODO:  "analgesicos" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.analgesicos"
                label="Analgésicos"
                :options="AnalgOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones analgesicos" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones analgésicos"
                v-model="tempIndi.ind_analg"
              />

              <!-- TODO:  "antiinflamatorio" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antiinflamatiorios"
                label="Antiinflamatorios"
                :options="FlamatOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones antiinflamatiorios" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antiinflamatiorios"
                v-model="tempIndi.ind_flamat"
              />

              <!-- TODO:  "antibioticos" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antibiotios"
                label="Antibióticos"
                :options="BiotOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones antibioticos" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antibióticos"
                v-model="tempIndi.ind_antib"
              />

              <!-- TODO:  "antidepresivos" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antidepresivos"
                label="Antidepresivos"
                :options="DepreOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones antidepresivos" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antidepresivos"
                v-model="tempIndi.ind_antid"
              />

              <!-- TODO:  "Antihistamínicos" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antihistaminicos"
                label="Antihistamínicos"
                :options="AntihisOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antihistamínicos" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antihistamínicos"
                v-model="tempIndi.ind_antis"
              />

              <!-- TODO:  "Anticoagulantes" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.anticoagulantes"
                label="Anticoagulantes"
                :options="CoagOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Anticoagulantes" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones anticoagulantes"
                v-model="tempIndi.ind_antic"
              />

              <!-- TODO:  "Antihipertensivo" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antihipertensivo"
                label="Antihipertensivo"
                :options="HiperOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antihipertensivo" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antihipertensivo"
                v-model="tempIndi.ind_antih"
              />

              <!-- TODO:  "Antidiabéticos" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antidiabeticos"
                label="Antidiabéticos"
                :options="DiabOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antidiabéticos" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antidiabéticos"
                v-model="tempIndi.ind_antidb"
              />

              <!-- TODO:  "antiepilepticos" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antiepilepticos"
                label="Antiepilépticos"
                :options="EpiOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antiepilépticos" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antiepilépticos"
                v-model="tempIndi.ind_antiep"
              />

              <!-- TODO:  "Antipsicóticos" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antipsicoticos"
                label="Antipsicóticos"
                :options="PsicOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antipsicóticos" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antipsicóticos"
                v-model="tempIndi.ind_antips"
              />

              <!-- TODO:  "antiansiedad" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antiansiedad"
                label="Antiansiedad"
                :options="AnsOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antiansiedad" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antiansiedad"
                v-model="tempIndi.ind_antian"
              />

              <!-- TODO:  "antiparasitario" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antiparasitario"
                label="Antiparasitario"
                :options="ParasOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antiparasitario" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antiparasitario"
                v-model="tempIndi.ind_antiparas"
              />

              <!-- TODO:  "antivirales" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antivirales"
                label="Antivirales"
                :options="VirusOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antivirales" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antivirales"
                v-model="tempIndi.ind_antiv"
              />

              <!-- TODO:  "antiarritmicos" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antiarritmicos"
                label="Antiarrítmicos"
                :options="ArritOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antiarrítmicos" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antiarrítmicos"
                v-model="tempIndi.ind_antia"
              />

              <!-- TODO:  "Antimicrobiano" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.antimicrobiano"
                label="Antimicrobiano"
                :options="AntimOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antiarrítmicos" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antimicrobiano"
                v-model="tempIndi.ind_antim"
              />

              <!-- TODO:  "Ácido dicarboxílico" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.acido_dicarb"
                label="Ácido dicarboxílico"
                :options="AcidoOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones ácido dicarboxílico" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones ácido dicarboxílico"
                v-model="tempIndi.ind_acido"
              />

              <!-- TODO:  "Antagonistas" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.otros_med"
                label="Antagonistas"
                :options="AntaOptions"
                style="width: 240px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Antagonistas" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones antagonistas"
                v-model="tempIndi.otras_indic"
              />

              <!-- TODO:  "broncodilatadores" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.broncodilatadores"
                label="Broncodilatadores"
                :options="BroncoOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Broncodilatadores" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones broncodilatadores"
                v-model="tempIndi.ind_bronco"
              />

              <!-- TODO:  "Diuréticos" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.diureticos"
                label="Diuréticos"
                :options="DiurOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Diuréticos" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones diuréticos"
                v-model="tempIndi.ind_diur"
              />

              <!-- TODO:  "Estatinas" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.estatinas"
                label="Estatinas"
                :options="EstOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Estatinas" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones Estatinas"
                v-model="tempIndi.ind_est"
              />

              <!-- TODO:  "Relajante muscular" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.relajante_muscular"
                label="Relajante muscular"
                :options="RmOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Relajante muscular" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones relajante muscular"
                v-model="tempIndi.ind_rm"
              />

              <!-- TODO:  "vitaminas" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.vitaminas"
                label="Vitaminas"
                :options="VitOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Vitaminas" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones vitaminas"
                v-model="tempIndi.ind_vit"
              />

              <!-- TODO:  "Vasodilatador" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempIndi.vasodilatador"
                label="Vasodilatador"
                :options="VasoOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Indicaciones Vasodilatador" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones Vasodilatador"
                v-model="tempIndi.ind_vaso"
              />

              <!-- TODO: "Sonda vesical" -->
              <q-checkbox
                style="max-width: 220px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempIndi.sonda"
                label="Sonda vesical"
              />

              <!-- TODO:  "Indicaciones Sonda vesical" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Indicaciones sonda vesical"
                v-model="tempIndi.ind_sonda"
              />

              <!-- TODO: "Crisis convulsiva" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempIndi.crisis_convul"
                label="Crisis convulsiva"
              />

              <!-- TODO: "Restricción" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempIndi.restriccion"
                label="Restricción"
              />

              <!-- TODO: "Oxígenoterapia" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempIndi.oxigenot"
                label="Oxígenoterapia"
              />

              <!-- TODO:  "Indicaciones generales" -->
              <q-input
                class="col-8"
                dense
                outlined
                type="textarea"
                label="Indicaciones generales"
                v-model="tempIndi.ind_gener"
              />

            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditIM"
                @click="updateIndic(tempIndi.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddIM"
                @click="createIndic(tempIndi)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogIM = false"
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
import { useIndicacinesStore } from "src/stores/Indicaciones-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listIndic();
  await listPacientes();
  // }
});

const {
  resetTempIndic,
  listIndic,
  listPacientes,
  createIndic,
  updateIndic,
  destroyIndic,
} = useIndicacinesStore();

const { indicaciones, AddIM, EditIM, showDialogIM, loading, tempIndi, tempPaciente } =
  storeToRefs(useIndicacinesStore());

  const columns = [
  {
    name: 'num_cama',
    align: 'center',
    label: 'No. Cama',
    field: 'num_cama'
  },
  {
    name: "clasif_imc",
    align: "center",
    label: "IMC",
    field: "clasif_imc",
    sortable: true,
  },
  {
    name: 'hora_6am',
    align: 'center',
    label: 'Temperatura - 6am',
    field: 'hora_6am',
  },
  {
    name: 'hora_2pm',
    align: 'center',
    label: 'Temperatura - 2pm',
    field: 'hora_2pm',
  },
  {
    name: 'hora_10pm',
    align: 'center',
    label: 'Temperatura - 10pm',
    field: 'hora_10pm'
  },
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
    align: "center",
    sortable: true,
    sort: (a, b) => a - b,
  },
  { name: "ci", align: "center", label: "Carnet de identidad", field: "ci" },

  {
    name: 'fecha',
    align: 'center',
    label: 'Fecha',
    field: 'fecha',
  },
  {
    name: 'calorias',
    align: 'center',
    label: 'Calorías',
    field: 'calorias',
  },
  {
    name: 'momento',
    align: 'center',
    label: 'Hora',
    field: 'momento'
  },
  {
    name: 'sig_vitales',
    align: 'center',
    label: 'Signos vitales',
    field: 'sig_vitales',
  },
  {
    name: 'ctrl_peso',
    align: 'center',
    label: 'Control del peso semanal',
    field: 'ctrl_peso'
  },
  {
    name: 'dieta',
    align: 'center',
    label: 'Dieta',
    field: 'dieta'
  },
  {
    name: 'camb_ropa',
    align: 'center',
    label: 'Cambio de ropa',
    field: 'camb_ropa'
  },
  {
    name: 'evitar_caidas',
    align: 'center',
    label: 'Evitar caídas',
    field: 'evitar_caidas'
  },
  {
    name: 'glicemia',
    align: 'center',
    label: 'Glicemia',
    field: 'glicemia'
  },
  {
    name: 'ind_glic',
    align: 'center',
    label: 'Indicación glicemia',
    field: 'ind_glic'
  },
  {
    name: 'analgesicos',
    align: 'center',
    label: 'Analgésicos',
    field: 'analgesicos'
  },
  {
    name: 'ind_analg',
    align: 'center',
    label: 'Indicación analgésicos',
    field: 'ind_analg'
  },
  {
    name: 'antiinflamatiorios',
    align: 'center',
    label: 'Antiinflamatiorios',
    field: 'antiinflamatiorios'
  },
  {
    name: 'ind_flamat',
    align: 'center',
    label: 'Indicación antiinflamatiorios',
    field: 'ind_flamat'
  },
  {
    name: 'antibiotios',
    align: 'center',
    label: 'Antibiotios',
    field: 'antibiotios'
  },
  {
    name: 'ind_antib',
    align: 'center',
    label: 'Indicación antibiotios',
    field: 'ind_antib'
  },
  {
    name: 'antidepresivos',
    align: 'center',
    label: 'Antidepresivos',
    field: 'antidepresivos'
  },
  {
    name: 'ind_antid',
    align: 'center',
    label: 'Indicación antidepresivos',
    field: 'ind_antid'
  },
  {
    name: 'antihistaminicos',
    align: 'center',
    label: 'Antihistaminicos',
    field: 'antihistaminicos'
  },
  {
    name: 'antihistaminicos',
    align: 'center',
    label: 'Indicación antihistaminicos',
    field: 'antihistaminicos'
  },
  {
    name: 'ind_antis',
    align: 'center',
    label: 'Indicación antihistaminicos',
    field: 'ind_antis'
  },
  {
    name: 'anticoagulantes',
    align: 'center',
    label: 'Anticoagulantes',
    field: 'anticoagulantes'
  },
  {
    name: 'ind_antic',
    align: 'center',
    label: 'Indicación Anticoagulantes',
    field: 'ind_antic'
  },
  {
    name: 'antihipertensivo',
    align: 'center',
    label: 'Antihipertensivo',
    field: 'antihipertensivo'
  },
  {
    name: 'ind_antih',
    align: 'center',
    label: 'Indicación antihipertensivo',
    field: 'ind_antih'
  },
  {
    name: 'antidiabeticos',
    align: 'center',
    label: 'Antidiabeticos',
    field: 'antidiabeticos'
  },
  {
    name: 'ind_antidb',
    align: 'center',
    label: 'Indicación antidiabeticos',
    field: 'ind_antidb'
  },
  {
    name: 'antiepilepticos',
    align: 'center',
    label: 'Antiepilepticos',
    field: 'antiepilepticos'
  },
  {
    name: 'ind_antiep',
    align: 'center',
    label: 'Indicación antiepilepticos',
    field: 'ind_antiep'
  },
  {
    name: 'antipsicoticos',
    align: 'center',
    label: 'Antipsicoticos',
    field: 'antipsicoticos'
  },
  {
    name: 'ind_antips',
    align: 'center',
    label: 'Indicación antipsicoticos',
    field: 'ind_antips'
  },
  {
    name: 'antiansiedad',
    align: 'center',
    label: 'Antiansiedad',
    field: 'antiansiedad'
  },
  {
    name: 'ind_antian',
    align: 'center',
    label: 'Indicación antiansiedad',
    field: 'ind_antian'
  },
  {
    name: 'antiparasitario',
    align: 'center',
    label: 'Antiparasitario',
    field: 'antiparasitario'
  },
  {
    name: 'ind_antiparas',
    align: 'center',
    label: 'Indicación antiparasitario',
    field: 'ind_antiparas'
  },
  {
    name: 'antivirales',
    align: 'center',
    label: 'Antivirales',
    field: 'antivirales'
  },
  {
    name: 'ind_antiv',
    align: 'center',
    label: 'Indicación antivirales',
    field: 'ind_antiv'
  },
  {
    name: 'antiarritmicos',
    align: 'center',
    label: 'Antiarritmicos',
    field: 'antiarritmicos'
  },
  {
    name: 'ind_antia',
    align: 'center',
    label: 'Indicación antiarritmicos',
    field: 'ind_antia'
  },
  {
    name: 'antimicrobiano',
    align: 'center',
    label: 'Antimicrobiano',
    field: 'antimicrobiano'
  },
  {
    name: 'ind_antim',
    align: 'center',
    label: 'Indicación antimicrobiano',
    field: 'ind_antim'
  },
  {
    name: 'acido_dicarb',
    align: 'center',
    label: 'Ácido dicarboxílico',
    field: 'acido_dicarb'
  },
  {
    name: 'ind_acido',
    align: 'center',
    label: 'Indicación ácido dicarboxílico',
    field: 'ind_acido'
  },
  {
    name: 'broncodilatadores',
    align: 'center',
    label: 'Broncodilatadores',
    field: 'broncodilatadores'
  },
  {
    name: 'broncodilatadores',
    align: 'center',
    label: 'Broncodilatadores',
    field: 'broncodilatadores'
  },
  {
    name: 'ind_bronco',
    align: 'center',
    label: 'Indicación broncodilatadores',
    field: 'ind_bronco'
  },
  {
    name: 'diureticos',
    align: 'center',
    label: 'Diureticos',
    field: 'diureticos'
  },
  {
    name: 'ind_diur',
    align: 'center',
    label: 'Indicación diureticos',
    field: 'ind_diur'
  },
  {
    name: 'estatinas',
    align: 'center',
    label: 'Estatinas',
    field: 'estatinas'
  },
  {
    name: 'ind_est',
    align: 'center',
    label: 'Indicación estatinas',
    field: 'ind_est'
  },
  {
    name: 'relajante_muscular',
    align: 'center',
    label: 'Relajante muscular',
    field: 'relajante_muscular'
  },
  {
    name: 'ind_rm',
    align: 'center',
    label: 'Indicación relajante muscular',
    field: 'ind_rm'
  },
  {
    name: 'vitaminas',
    align: 'center',
    label: 'Vitaminas',
    field: 'vitaminas'
  },
  {
    name: 'ind_vit',
    align: 'center',
    label: 'Indicación vitaminas',
    field: 'ind_vit'
  },
  {
    name: 'vasodilatador',
    align: 'center',
    label: 'Vasodilatador',
    field: 'vasodilatador'
  },
  {
    name: 'ind_vaso',
    align: 'center',
    label: 'Indicación vasodilatador',
    field: 'ind_vaso'
  },
  {
    name: 'sonda',
    align: 'center',
    label: 'Sonda vesical',
    field: 'sonda'
  },
  {
    name: 'ind_sonda',
    align: 'center',
    label: 'Indicación sonda vesical',
    field: 'ind_sonda'
  },
  {
    name: 'crisis_convul',
    align: 'center',
    label: 'crisis convulsiva',
    field: 'crisis_convul'
  },
  {
    name: 'restriccion',
    align: 'center',
    label: 'Restriccion',
    field: 'restriccion'
  },
  {
    name: 'oxigenot',
    align: 'center',
    label: 'Oxigenoterapia',
    field: 'oxigenot'
  },
  {
    name: 'otros_med',
    align: 'center',
    label: 'otros medicamentos',
    field: 'otros_med'
  },
  {
    name: 'otras_indic',
    align: 'center',
    label: 'otras indicaciones',
    field: 'otras_indic'
  },
  {
    name: 'ind_gener',
    align: 'center',
    label: 'Indicación generales',
    field: 'ind_gener'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddIM.value = false;
  EditIM.value = true;
  tempIndi.value = { ...row };
  showDialogIM.value = true;
};
const openAddDialog = () => {
  AddIM.value = true;
  EditIM.value = false;
  resetTempIndic();
  showDialogIM.value = true;
};

const MomOptions = [
  "6:00 am",
  "2:00 pm",
  "10:00 pm"
];

const DietaOptions = [
  "Libre",
  "Libre-Reforzada",
  "Libre-Reforzada (no yogurt)",
  "Hipertensa",
  "Hipertensa (no yogurt, no embutido)",
  "Hipertensa-Reforzado",
  "Diabética",
  "Hipertensa-Diabética",
  "Diabética-Hipertensa (no sirope)",
];

const AnalgOptions = [
  "DIPIRONA 600MG ÁMP",
  "DIPIRONA 600MG TAB",
  "ACIDO ACELTILSALICÍLICO 500MG TAB",
];

const FlamatOptions = [
  "TERBINEFINA TAB",
  "DICLOFENCO DE SODIO TAB",
  "TRIANCINOLONA 0.1% CREMA"
];

const BiotOptions = [
  "CEFALEXINA 500MG CAP",
  "AZITROMICINA 500MG TAB",
  "PENICILINA RAPILENTA BUL",
  "CO-TRIMOXAZOL TAB",
  "AMOXICILANA 500MG CAP",
  "TETRACICLINA 0.5 % UNGÜENTO OFTALMICO",
  "ACIDO NALIDIXICO 500MG TAB",
  "CIPROFLOXACINO 250MG TAB"
];

const DepreOptions = [
  "AMITRIPTILINA 25MG TAB",
  "CLORHIDRATO DE DILTIAZEM 120MG TAB",
];

const AntihisOptions = [
  "LORATADINA 10MG TAB",
  "PREDNISOLONA 5MG COLIRIO",
  "PREDNISOLONA 20MG TAB",
  "MECLIZINE 25MG TAB",
  "DIFENHIDRAMINA 25MG TAB",
  "RANITIDINA 50MG AMP",
  "RANITIDINA 150MG TAB"
];

const CoagOptions = [
  "TROFIN FCO 235ML",
  "CLOPIDOGREL 75MG TAB",
  "VENATON GOTAS 30ML",
  "PENTOXIFILINA 400MG TAB"
];

const HiperOptions = [
  "AMLODIPINO 10MG TAB",
  "CAPTOPRIL 25MG TAB",
  "ENALAPRIL 20MG TAB",
  "TERAZOSINA 2MG TAB",
  "TERAZOSINA 5MG TAB",
  "NIFEDIPINO 10 MG TAB",
];

const DiabOptions = [
  "INSULINA NPH LENTA 10ML",
  "METFORMINA 500MG TAB",
];

const EpiOptions = [
  "CARBAMAZEPINA TAB",
];

const PsicOptions = [
  "TIORIDAZINA 25MG TAB",
  "LEVOMEPROMACINA 25MG TAB",
  "HALOPERIDOL TAB",
  "TRIFLUOPERAZINA 5MG TAB",
  "TRIFLUOPERAZINA 1MG TAB"
];

const AnsOptions = [
  "ALPRAZOLAN 0.5MG TAB",
  "ALPRAZOLAN 0.5MG ORAL",
  "DIAZEPAM TAB",
  "CLORDIAZEPOXIDO 10MG TAB",
  "LEVODOPA+CARBIDOPA 25MG"
];

const ParasOptions = [
  "METRONIDAZOL TAB",
  "KETOCONAZOL CREMA",
  "CLOBETAZOL CREMA",
  "CLOBETAZOL UNGUENTO",
  "PERMETRINA 1% LOCION",
  "PERMETRINA TUBO",
  "BENZOATO DE BENCILO 10% LOCION",
  "SECNIDAZOL 500MG TAB"
];

const VirusOptions = [
  "PV-2 TAB",
  "PV-2 0.25MG TAB",
  "OSELTAMIVIR 75MG CAP",
  "AMANTADINA 100MG TAB"
];

const ArritOptions = [
  "ATENOLOL",
  "PROPANOLOL",
  "AMIODARONA 200MG TAB"
];

const BroncoOptions = [
  "AMINOFILINA 250MG AMP",
  "TEOFILINA ANHIDRA 200MG TAB",
  "SALBUTAMOL SPRAY",
  "PREDNISONA TAB",
];

const DiurOptions = [
  "HIDROCLOROTIAZIDA 25MG TAB",
  "FUROSEMIDA 40MG TAB",
  "FUROSEMIDA 20MG INY",
];

const RmOptions = [
  "METOCARBAMOL 400MG TAB",
];

const VasoOptions = [
  "NITROGLICERINA 0,5MG TAB",
  "DINITRATO ISOSORBIDE 10MG TAB",
];

const VitOptions = [
  "AMBROXOL 15MG JARABE",
  "ABEXOL TAB 50MG",
  "ACIDO FOLICO 1 MG TAB",
  "VITAMINA B6 10 MG TAB",
  "POLIVITAMINAICA TAB",
  "VIGMAN TAB",
  "VITAMINA B1, B6, B12 AMP",
  "TRUABIN AMP",
  "PIRIDOXINA CLORHIDRATO 50MG AMP",
  "PIRIDOXINA CLORHIDRATO 25MG AMP",
];

const AntaOptions = [
  "DOMPERIDONA 5MG ORAL",
  "EPINEFRINA 1MG AMP",
  "OMEPRAZOL 20MG CAPSULA",
  "ATEROMIXOL 20MG TAB",
  "ATEROMIXOL 10MG TAB",
];

const AntimOptions = [
  "HIDROXIDROP. D/TRIG.PINCELADAS (OLEOZON)",
];

const AcidoOptions = [
  "FUMARATO FERROSO 200MG TAB",
];

const EstOptions = [
  "ATORVASTATINA 20MG TAB",
];

const PacOption = [
  {
    label: "Andrés Cueva Heredia",
    value: "1",
  },
  {
    label: "Francisaca Navia Cuadrado",
    value: "2",
  },
];

const TerOption = [
  {
    label: "Andrés Cueva Heredia",
    value: "1",
  },
  {
    label: "Francisaca Navia Cuadrado",
    value: "2",
  },
];

const EnfOption = [
  {
    label: "Andrés Cueva Heredia",
    value: "1",
  },
  {
    label: "Francisaca Navia Cuadrado",
    value: "2",
  },
];

const visibleColumns = ref([
      'num_cama',
      'clasif_imc',
      'hora_6am',
      'hora_2pm',
      'hora_10pm',
      'nombre',
      'edad',
      'ci',
      'calorias',
      'fecha',
      'momento',
      'sig_vitales',
      'ctrl_peso',
      'dieta',
      'evitar_caidas',
      'glicemia',
      'ind_glic',
      'camb_ropa',
      'analgesicos',
      'ind_analg',
      'antiinflamatiorios',
      'ind_flamat',
      'antibiotios',
      'ind_antib',
      'antidepresivos',
      'ind_antid',
      'antihistaminicos',
      'ind_antis',
      'anticoagulantes',
      'ind_antic',
      'antihipertensivo',
      'ind_antih',
      'antidiabeticos',
      'ind_antidb',
      'antiepilepticos',
      'ind_antiep',
      'antipsicoticos',
      'ind_antips',
      'antiansiedad',
      'ind_antian',
      'antiparasitario',
      'ind_antiparas',
      'antivirales',
      'ind_antiv',
      'antiarritmicos',
      'ind_antia',
      'broncodilatadores',
      'ind_bronco',
      'diureticos',
      'ind_diur',
      'relajante_muscular',
      'ind_rm',
      'vitaminas',
      'ind_vit',
      'sonda',
      'ind_sonda',
      'crisis_convul',
      'restriccion',
      'oxigenot',
      'otras_indic',
      'otros_med',
      'vasodilatador',
      'ind_vaso',
      'estatinas',
      'ind_est',
      'acido_dicarb',
      'ind_acido',
      'antimicrobiano',
      'ind_antim',
      'ind_gener',
      'actions'
])

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(indicaciones.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Indicaciones");
  writeFileXLSX(wb, "Indicaciones.xlsx");
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
