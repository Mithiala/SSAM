import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useEstadisticaStore = defineStore("Estadistica", {
  state: () => ({
    estadistica: [],
    pacientes: [],
    loading: false,

    tempEstadistica: {
      id: 0,
      protesisdental: false,
      protesisauditiva: false,
      anteojos: false,
      protesisortopedica: false,
      sillaruedas: false,
      baston: false,
      andador: false,
      colchon: false,
      camaplana: false,
      camafowler: false,
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
    resetTempEstad() {
      console.log("aqui receteo");
      this.tempEstadistica = {
        protesisdental: false,
        protesisauditiva: false,
        anteojos: false,
        protesisortopedica: false,
        sillaruedas: false,
        baston: false,
        andador: false,
        colchon: false,
        camaplana: false,
        camafowler: false,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listEstad() {
      this.loading = true;
      try {
        const url = "/tsocial/atecnica/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.estadistica = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Estadistica-Store.js:99 ~ listEstad ~ error:",
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
    async createEstad() {
      try {
        const url = "/tsocial/atecnica/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempEstadistica, {
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
          await this.listEstad();
          this.showDialogDG = false;
          this.resetTempEstad();
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
    async retrieveEstad(id) {
      try {
        this.loading = true;
        const url = `/tsocial/atecnica/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Estadistica-Store.js:130 ~ retrieveEstad ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Estadistica-Store.js:132 ~ retrieveEstad ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateEstad(id) {
      try {
        const url = `/tsocial/atecnica/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          protesisdental: this.tempEstadistica.protesisdental,
          protesisauditiva: this.tempEstadistica.protesisauditiva,
          anteojos: this.tempEstadistica.anteojos,
          protesisortopedica: this.tempEstadistica.protesisortopedica,
          sillaruedas: this.tempEstadistica.sillaruedas,
          baston: this.tempEstadistica.baston,
          andador: this.tempEstadistica.andador,
          colchon: this.tempEstadistica.colchon,
          camaplana: this.tempEstadistica.camaplana,
          camafowler: this.tempEstadistica.camafowler,
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
            "🚀 ~ file: Estadistica-Store.js:171 ~ updateEstad ~ response:",
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
        await this.listEstad();
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

    async destroyEstad(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/api/v1/estadisticaasistmedicas/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Estadistica-Store.js:214 ~ destroyEstad ~ response:",
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
          await this.listEstad();
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
