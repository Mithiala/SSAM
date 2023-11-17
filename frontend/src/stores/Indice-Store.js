import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useIndiceStore = defineStore("Indice", {
  state: () => ({
    indice: [],
    pacientes: [],
    loading: false,

    tempIndice: {
      id: 0,
      estado_general: "",
      estado_mental: "",
      actividad: "",
      movilidad: "",
      incontinencia: "",
      fecha: "",
    },

    tempPaciente: {
      image: "",
      nombre: "",
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
        estado_general: "",
        estado_mental: "",
        actividad: "",
        movilidad: "",
        incontinencia: "",
        fecha: "",
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
        this.indice = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Indice-Store.js:99 ~ listIndices ~ error:",
          error
        );
      }
    },

    async listPacientes() {
      this.loading = true;
      try {
        const url = "/asistmedica/indice/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.pacientes = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Pacientes-Store.js:99 ~ listPaciente ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createIndices() {
      try {
        const url = "/asistmedica/indice/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempIndice, {
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
    async updateIndices(id_enf) {
      try {
        const url = `/api/v1/indicenortonvaluekats/${id_enf}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          id_enf: this.tempIndice.id_enf,
          estado_general: this.tempIndice.estado_general,
          estado_mental: this.tempIndice.estado_mental,
          actividad: this.tempIndice.actividad,
          movilidad: this.tempIndice.movilidad,
          incontinencia: this.tempIndice.incontinencia,
          fecha_ind: this.tempIndice.fecha_ind,
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

    async destroyIndices(id_enf) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/api/v1/indicenortonvaluekats/${id_enf}/`;
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
