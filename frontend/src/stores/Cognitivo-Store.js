import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useCognitivoStore = defineStore("Cognitivo", {
  state: () => ({
    cognitivo: [],
    pacientes: [],
    loading: false,

    tempCognitivos: {
      id: 0,
      esquizofrenia: false,
      fumador: false,
      alcoholico: false,
      demencia: false,
      parkinson: false,
      observaciones: "",
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
    resetTempCog() {
      console.log("aqui receteo");
      this.tempCognitivos = {
      esquizofrenia: false,
      fumador: false,
      alcoholico: false,
      demencia: false,
      parkinson: false,
      observaciones: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listCog() {
      this.loading = true;
      try {
        const url = "/psicologia/cognitivo/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.cognitivo = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Cognitivo-Store.js:99 ~ listCog ~ error:",
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
    async createCog() {
      try {
        const url = "/psicologia/cognitivo/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempCognitivos, {
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
          await this.listCog();
          this.showDialogDG = false;
          this.resetTempAfectiva();
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
    async retrieveCog(id) {
      try {
        this.loading = true;
        const url = `/psicologia/cognitivo/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Cognitivo-Store.js:130 ~ retrieveCog ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Cognitivo-Store.js:132 ~ retrieveCog ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateCog(id) {
      try {
        const url = `/psicologia/cognitivo/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          esquizofrenia: this.tempCognitivos.esquizofrenia,
          fumador: this.tempCognitivos.fumador,
          alcoholico: this.tempCognitivos.alcoholico,
          demencia: this.tempCognitivos.demencia,
          parkinson: this.tempCognitivos.parkinson,
          observaciones: this.tempCognitivos.observaciones,
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
            "🚀 ~ file: Cognitivo-Store.js:171 ~ updateCog ~ response:",
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
        await this.listCog();
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

    async destroyCog(id_cognitivo) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/api/v1/valuecognitivos/${id_cognitivo}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Cognitivo-Store.js:214 ~ destroyCog ~ response:",
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
          await this.listCog();
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
