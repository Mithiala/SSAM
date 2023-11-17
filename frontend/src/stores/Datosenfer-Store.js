import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useDatosenferStore = defineStore("Datosenfer", {
  state: () => ({
    datosenfer: [],
    pacientes: [],
    loading: false,

    tempDatos: {
      id: 0,
      peso: "",
      talla: "",
      clasif_imc: "",
      app: "",
      patologia: "",
      operaciones: "",
      fecha_e: "",
      atencion_estomatologia: "",
      fecha_a: "",
      programa_auditivo: "",
      fecha_o: "",
      atencion_oftalmologia: "",
      fecha_ge: "",
      diagnostico_geriatria: "",
      fecha_on: "",
      diagnostico_oncologia: "",
      fecha_an: "",
      diagnostico_angiologia: "",
      fecha_car: "",
      diagnostico_cardiologia: "",
      fecha_cir: "",
      diagnostico_cirugia: "",
      fecha_der: "",
      diagnostico_dermatologia: "",
      fecha_fi: "",
      diagnostico_fisiatria: "",
      fecha: "",
      otros_diagnosticos: "",
      ulcerapres: "",
      sindrome_respiratorio: "",
      programa_tb: "",
      morbilidad: "",
      transfuciones: "",
      habitos_toxicos: "",
      alergia_medicamentos: "",
      accidentes: "",
      clasificacion_validismo: "",
      num_cama: 0,
      sala: "",
    },

    tempPaciente: {
      image: "",
      nombre: "",
      edad: 0,
      sexo: "",
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempDatose() {
      console.log("aqui receteo");
      this.tempDatos = {
        peso: "",
      talla: "",
      clasif_imc: "",
      app: "",
      patologia: "",
      operaciones: "",
      fecha_e: "",
      atencion_estomatologia: "",
      fecha_a: "",
      programa_auditivo: "",
      fecha_o: "",
      atencion_oftalmologia: "",
      fecha_ge: "",
      diagnostico_geriatria: "",
      fecha_on: "",
      diagnostico_oncologia: "",
      fecha_an: "",
      diagnostico_angiologia: "",
      fecha_car: "",
      diagnostico_cardiologia: "",
      fecha_cir: "",
      diagnostico_cirugia: "",
      fecha_der: "",
      diagnostico_dermatologia: "",
      fecha_fi: "",
      diagnostico_fisiatria: "",
      fecha: "",
      otros_diagnosticos: "",
      ulcerapres: "",
      sindrome_respiratorio: "",
      programa_tb: "",
      morbilidad: "",
      transfuciones: "",
      habitos_toxicos: "",
      alergia_medicamentos: "",
      accidentes: "",
      clasificacion_validismo: "",
      num_cama: 0,
      sala: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listDatose() {
      this.loading = true;
      try {
        const url = "/asistmedica/enfermeria/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.datosenfer = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Datosenfer-Store.js:99 ~ listDatose ~ error:",
          error
        );
      }
    },

    async listPacientes() {
      this.loading = true;
      try {
        const url = "/tsocial/pacientes/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.pacientes = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Pacientes-Store.js:99 ~ listPaciente ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createDatose() {
      try {
        const url = "/asistmedica/enfermeria/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempDatos, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        if (response) {
          Notify.create({
            color: "positive",
            message: `Regitro guardado exitosamente`,
            position: "bottom",
            progress: true,
            icon: "check",
          });
          await this.listDatose();
          this.showDialogDG = false;
          this.resetTempDatose();
        }
      } catch (error) {
        console.log("FullError: ", error);
        console.log("error: ", error.response.data);
        const menssage = ( error.response.data.error)
        Notify.create({
          color: "negative",
          message: menssage,
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    //TODO: Accion para obtener un Registro desde un ID
    async retrieveDatose(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/enfermeria/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Datosenfer-Store.js:130 ~ retrieveDatose ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Datosenfer-Store.js:132 ~ retrieveDatose ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateDatose(id) {
      try {
        const url = `/asistmedica/enfermeria/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          peso: this.tempDatos.peso,
          talla: this.tempDatos.talla,
          clasif_imc: this.tempDatos.clasif_imc,
          app: this.tempDatos.app,
          patologia: this.tempDatos.patologia,
          operaciones: this.tempDatos.operaciones,
          fecha_e: this.tempDatos.fecha_e,
          atencion_estomatologia: this.tempDatos.atencion_estomatologia,
          fecha_a: this.tempDatos.fecha_a,
          programa_auditivo: this.tempDatos.programa_auditivo,
          fetcha_o: this.tempDatos.fecha_o,
          atencion_oftalmologia: this.tempDatos.atencion_oftalmologia,
          fecha_ge: this.tempDatos.fecha_ge,
          diagnostico_geriatria: this.tempDatos.diagnostico_geriatria,
          fecha_on: this.tempDatos.fecha_on,
          diagnostico_oncologia: this.tempDatos.diagnostico_oncologia,
          fecha_an: this.tempDatos.fecha_an,
          diagnostico_angiologia: this.tempDatos.diagnostico_angiologia,
          fecha_car: this.tempDatos.fecha_an,
          diagnostico_cardiologia: this.tempDatos.diagnostico_cardiologia,
          fecha_cir: this.tempDatos.fecha_car,
          diagnostico_cirugia: this.tempDatos.diagnostico_cirugia,
          fecha_der: this.tempDatos.fecha_der,
          diagnostico_dermatologia: this.tempDatos.diagnostico_dermatologia,
          fecha_fi: this.tempDatos.fecha_fi,
          diagnostico_fisiatria: this.tempDatos.diagnostico_fisiatria,
          fecha: this.tempDatos.fecha,
          otros_diagnosticos: this.tempDatos.otros_diagnosticos,
          local_ulcerapres: this.tempDatos.local_ulcerapres,
          sindrome_respiratorio: this.tempDatos.sindrome_respiratorio,
          programa_tb: this.tempDatos.programa_tb,
          morbilidad: this.tempDatos.morbilidad,
          transfuciones: this.tempDatos.transfuciones,
          habitos_toxicos: this.tempDatos.habitos_toxicos,
          alergia_medicamentos: this.tempDatos.alergia_medicamentos,
          accidentes: this.tempDatos.accidentes,
          clasificacion_validismo: this.tempDatos.clasificacion_validismo,
          num_cama: this.tempDatos.num_cama,
          sala: this.tempDatos.sala,
        };

        const response = await api.put(
          url,
          request
          //   , {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );

        if (response.status === 201) {
          console.log("Status: ", response.statusText);
          console.log(
            "🚀 ~ file: Datosenfer-Store.js:171 ~ updateDatose ~ response:",
            response.data
          );

          Notify.create({
            color: "positive",
            message: "Actualizado con éxito",
            position: "bottom",
            progress: true,
            icon: "check",
          });
        }
        await this.listDatose();
        this.showDialogDG = false;
      } catch (error) {
        console.log("Code: ", error);

        Notify.create({
          color: "negative",
          message: errorMessage,
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    async destroyDatose(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/enfermeria/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Datosenfer-Store.js:214 ~ destroyDatose ~ response:",
              response.statusText
            );

            Notify.create({
              message: "Eliminado con éxito",
              icon: "check",
              color: "positive",
              position: "bottom",
              progress: true,
            });
          }
          await this.listDatose();
        });
      } catch (error) {
        console.log("Code: ", error.code);
        console.log("responseText : ", error.request.responseText);

        let errorMessage = "";

        for (const field in error.response.data) {
          if (error.response.data.hasOwnProperty(field)) {
            errorMessage += error.response.data[field].join(", ") + " ";
          }
        }

        Notify.create({
          color: "negative",
          message: errorMessage,
          position: "top",
          icon: "report_problem",
          position: "bottom",
          progress: true,
        });
      }
    }
  }
})
