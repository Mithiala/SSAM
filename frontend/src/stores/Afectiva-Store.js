import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useAfectivaStore = defineStore("Afectiva", {
  state: () => ({
    afectiva: [],
    pacientes: [],
    loading: false,

    tempAfectivo: {
      id: 0,
      depresion: false,
      anciedad: false,
      intentosuicida: false,
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
    resetTempAfectiva() {
      console.log("aqui receteo");
      this.tempAfectivo = {
        depresion: false,
        anciedad: false,
        intentosuicida: false,
        observaciones: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listAfectiva() {
      this.loading = true;
      try {
        const url = "/psicologia/afectivo/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.afectiva = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Afectiva-Store.js:99 ~ listAfectiva ~ error:",
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
    async createAfectiva() {
      try {
        const url = "/psicologia/afectivo/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempAfectivo, {
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
          await this.listAfectiva();
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
    async retrieveAfectiva(id) {
      try {
        this.loading = true;
        const url = `/psicologia/afectivo/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Afectiva-Store.js:130 ~ retrieveAfectiva ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Afectiva-Store.js:132 ~ retrieveAfectiva ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateAfectiva(id) {
      try {
        const url = `/psicologia/afectivo/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          depresion: this.tempAfectivo.depresion,
          anciedad: this.tempAfectivo.anciedad,
          intentosuicida: this.tempAfectivo.intentosuicida,
          observaciones_a: this.tempAfectivo.observaciones,
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
            "🚀 ~ file: Afectiva-Store.js:171 ~ updateAfectiva ~ response:",
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
        await this.listAfectiva();
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

    async destroyAfectiva(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/psicologia/afectivo/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Afectiva-Store.js:214 ~ destroyAfectiva ~ response:",
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
          await this.listAfectiva();
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
