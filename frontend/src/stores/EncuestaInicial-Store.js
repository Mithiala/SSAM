import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";
import { RichTextFieldReadError } from "pdf-lib";

export const useEncuestaInicialStore = defineStore("EncuestaInicial", {
  state: () => ({
    encuestainicial: [],
    pacientes: [],
    loading: false,

    tempEncuesta: {
      id: 0,
      fecha: "",
      lectura: false,
      tv: false,
      juegomesa: false,
      cine: false,
      radio: false,
      pelota: false,
      otras: false,
      procedencia_at_asist_social: "",
      direc_person_responsable: "",
      grado_parentesco: "",
      direc_person_responsable: "",
      ingresado: false,
      motivo: "",
      antes_donde_residia: "",
      jefenucleo: false,
      impfisico: false,
      protesis: false,
      calsadoortop: false,
      espejuelos: false,
      visitafamiliares: false,
      visitaamistades: false,
      avisarleingreso: false,
      antecedentes_patologicos: "",
      enc_paciente: 0,
    },

    tempPaciente: {
      image: "",
      nombre: "",
      ci: 0,
      num_hs: 0,
      fecha_inscripcion: "",
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempEncuestas() {
      console.log("aqui receteo");
      this.tempEncuesta = {
        fecha: new Date().toISOString().substring(0,10),
        lectura: false,
        tv: false,
        juegomesa: false,
        cine: false,
        radio: false,
        pelota: false,
        otras: false,
        procedencia_at_asist_social: "",
        persona_cobra_chequera: "",
        grado_parentesco: "",
        direc_person_responsable: "",
        ingresado: false,
        motivo: "",
        antes_donde_residia: "",
        jefenucleo: false,
        impfisico: false,
        protesis: false,
        calsadoortop: false,
        espejuelos: false,
        visitafamiliares: false,
        visitaamistades: false,
        avisarleingreso: false,
        antecedentes_patologicos: "",
        enc_paciente: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listEncuestas() {
      this.loading = true;
      try {
        const url = "/tsocial/encuestainicial/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.encuestainicial = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: EncuestaInicial-Store.js:99 ~ listEncuestas ~ error:",
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
    async createEncuestas() {
      try {
        const url = "/tsocial/encuestainicial/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("fecha", this.tempEncuesta.fecha);
        formData.append("lectura", this.tempEncuesta.lectura);
        formData.append("tv", this.tempEncuesta.tv);
        formData.append("juegomesa", this.tempEncuesta.juegomesa);
        formData.append("cine", this.tempEncuesta.cine);
        formData.append("radio", this.tempEncuesta.radio);
        formData.append("pelota", this.tempEncuesta.pelota);
        formData.append("otras", this.tempEncuesta.otras);
        formData.append("procedencia_at_asist_social", this.tempEncuesta.procedencia_at_asist_social);
        formData.append("persona_cobra_chequera", this.tempEncuesta.persona_cobra_chequera);
        formData.append("grado_parentesco", this.tempEncuesta.grado_parentesco);
        formData.append("direc_person_responsable", this.tempEncuesta.direc_person_responsable);
        formData.append("ingresado", this.tempEncuesta.ingresado);
        formData.append("motivo", this.tempEncuesta.motivo);
        formData.append("antes_donde_residia", this.tempEncuesta.antes_donde_residia);
        formData.append("jefenucleo", this.tempEncuesta.jefenucleo);
        formData.append("impfisico", this.tempEncuesta.impfisico);
        formData.append("protesis", this.tempEncuesta.protesis);
        formData.append("calsadoortop", this.tempEncuesta.calsadoortop);
        formData.append("espejuelos", this.tempEncuesta.espejuelos);
        formData.append("visitafamiliares", this.tempEncuesta.visitafamiliares);
        formData.append("visitaamistades", this.tempEncuesta.visitaamistades);
        formData.append("avisarleingreso", this.tempEncuesta.avisarleingreso);
        formData.append("antecedentes_patologicos", this.tempEncuesta.antecedentes_patologicos);
        formData.append("enc_paciente", this.tempEncuesta.enc_paciente.value);
        const response = await api.post(url, formData, {
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
          await this.listEncuestas();
          this.showDialogDG = false;
          this.resetTempEncuestas();
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
    async retrieveEncuestas(id) {
      try {
        this.loading = true;
        const url = `/tsocial/encuestainicial/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: EncuestaInicial-Store.js:130 ~ retrieveEncuestas ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: EncuestaInicial-Store.js:132 ~ retrieveEncuestas ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateEncuestas(id) {
      try {
        const url = `/tsocial/encuestainicial/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          fecha: this.this.tempEncuesta.fecha,
          lectura: this.tempEncuesta.lectura,
          tv: this.tempEncuesta.tv,
          juegomesa: this.tempEncuesta.juegomesa,
          cine: this.tempEncuesta.cine,
          radio: this.tempEncuesta.radio,
          pelota: this.tempEncuesta.pelota,
          otras: this.tempEncuesta.otras,
          procedencia_at_asist_social: this.tempEncuesta.procedencia_at_asist_social,
          persona_cobra_chequera: this.tempEncuesta.persona_cobra_chequera,
          grado_parentesco: this.tempEncuesta.grado_parentesco,
          direc_person_responsable: this.tempEncuesta.direc_person_responsable,
          ingresado: this.tempEncuesta.ingresado,
          motivo: this.tempEncuesta.motivo,
          antes_donde_residia: this.tempEncuesta.antes_donde_residia,
          jefenucleo: this.tempEncuesta.jefenucleo,
          impfisico: this.tempEncuesta.impfisico,
          protesis: this.tempEncuesta.protesis,
          calsadoortop: this.tempEncuesta.calsadoortop,
          espejuelos: this.tempEncuesta.espejuelos,
          visitafamiliares: this.tempEncuesta.visitafamiliares,
          visitaamistades: this.tempEncuesta.visitaamistades,
          avisarleingreso: this.tempEncuesta.avisarleingreso,
          antecedentes_patologicos: this.tempEncuesta.antecedentes_patologicos,
          enc_paciente: this.tempEncuesta.enc_paciente,
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
            "🚀 ~ file: EncuestaInicial-Store.js:171 ~ updateEncuestas ~ response:",
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
        await this.listEncuestas();
        this.showDialogDG = false;
      } catch (error) {
        console.log("Code: ", error);

        let errorMessage = "";

        for (const field in error.response.data) {
          if (error.response.data.hasOwnProperty(field)) {
            errorMessage += error.response.data[field].join(", ") + " ";
          }
        }

        Notify.create({
          color: "negative",
          message: errorMessage,
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    async destroyEncuestas(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/tsocial/encuestainicial/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: EncuestaInicial-Store.js:214 ~ destroyEncuestas ~ response:",
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
          await this.listEncuestas();
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
