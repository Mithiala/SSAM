import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useEnfvalueStore = defineStore("Enfvalue", {
  state: () => ({
    enfvalue: [],
    loading: false,

    tempValue: {
      id_venf: 0,
      banarse: "",
      vestirse: "",
      servicio: "",
      levantarse: "",
      continencia: "",
      comer: "",
      fecha_kats: "",
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempValues() {
      console.log("aqui receteo");
      this.tempValue = {
      banarse: "",
      vestirse: "",
      servicio: "",
      levantarse: "",
      continencia: "",
      comer: "",
      fecha_kats: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listValues() {
      this.loading = true;
      try {
        const url = "/api/v1/enfvalues";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.enfvalue= response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Enfvalue-Store.js:99 ~ listValues ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createValues() {
      try {
        const url = "/api/v1/enfvalues";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempValue, {
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
          await this.listValues();
          this.showDialogDG = false;
          this.resetTempValues();
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
    async retrieveValues(id_venf) {
      try {
        this.loading = true;
        const url = `/api/v1/enfvalues/${id_venf}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Enfvalue-Store.js:130 ~ retrieveValues ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Enfvalue-Store.js:132 ~ retrieveValues ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateValues(id_venf) {
      try {
        const url = `/api/v1/enfvalues/${id_venf}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          id_venf: this.tempValue.id_venf,
          banarse: this.tempValue.banarse,
          vestirse: this.tempValue.vestirse,
          servicio: this.tempValue.servicio,
          levantarse: this.tempValue.levantarse,
          continencia: this.tempValue.continencia,
          comer: this.tempValue.comer,
          fecha_kats: this.tempValue.fecha_kats,
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
            "🚀 ~ file: Enfvalue-Store.js:171 ~ updateValues ~ response:",
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
        await this.listValues();
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

    async destroyValues(id_venf) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/api/v1/enfvalues/${id_venf}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Enfvalue-Store.js:214 ~ destroyValues ~ response:",
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
          await this.listValues();
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
