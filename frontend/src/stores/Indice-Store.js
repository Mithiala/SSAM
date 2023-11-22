import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useIndiceStore = defineStore("Indice", {
  state: () => ({
    indice: [],
    loading: false,

    tempIndice: {
      id: null,
      estado_general: null,
      estado_mental: null,
      actividad: null,
      movilidad: null,
      incontinencia: null,
      fecha: null,
      resultado: null,
      resultadoIndice: null,
      ind_paciente: null,
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempIndices() {
      console.log("aqui receteo");
      this.tempIndice = {
        estado_general: null,
        estado_mental: null,
        actividad: null,
        movilidad: null,
        incontinencia: null,
        fecha: null,
        resultado: null,
        ind_paciente: null,
        resultadoIndice: null,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listIndices() {
      this.loading = true;
      try {
        const url = "/asistmedica/indice/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.indice = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Indice-Store.js:99 ~ listIndices ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createIndices() {
      try {
        const url = "/asistmedica/indice/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("estado_general", this.tempIndice.estado_general);
        formData.append("estado_mental", this.tempIndice.estado_mental);
        formData.append("actividad", this.tempIndice.actividad);
        formData.append("movilidad", this.tempIndice.movilidad);
        formData.append("incontinencia", this.tempIndice.incontinencia);
        formData.append("fecha", this.tempIndice.fecha);
        formData.append("resultado", this.tempIndice.resultado);
        formData.append("resultadoIndice", this.tempIndice.resultadoIndice);
        formData.append("ind_paciente", this.tempIndice.ind_paciente);
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
          this.resultadoIndice = response.data.resultado;
          await this.listIndices();
          this.showDialogDG = false;
          this.resetTempIndices();
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
    async retrieveIndices(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/indice/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Indice-Store.js:130 ~ retrieveIndices ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Indice-Store.js:132 ~ retrieveIndices ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateIndices(id) {
      try {
        const url = `/asistmedica/indice/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          estado_general: this.tempIndice.estado_general,
          estado_mental: this.tempIndice.estado_mental,
          actividad: this.tempIndice.actividad,
          movilidad: this.tempIndice.movilidad,
          incontinencia: this.tempIndice.incontinencia,
          fecha: this.tempIndice.fecha,
          resultado: this.tempIndice.resultado,
          resultadoIndice: this.tempIndice.resetTempIndices,
          ind_paciente: this.tempIndice.ind_paciente,
        };

        const response = await api.patch(
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
            "🚀 ~ file: Indice-Store.js:171 ~ updateIndices ~ response:",
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
        await this.listIndices();
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

    async destroyIndices(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/indice/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Indice-Store.js:214 ~ destroyIndices ~ response:",
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
          await this.listIndices();
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
