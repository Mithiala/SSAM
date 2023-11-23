import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useLawtonStore = defineStore("Lawton", {
  state: () => ({
    lawton: [],
    loading: false,

    tempLw: {
      id: 0,
      usotelef: "",
      compras: "",
      prepalim: "",
      manejocasa: "",
      lavar: "",
      transporte: "",
      manejofin: "",
      usomed: "",
      fecha_value: "",
      law_paciente: null,
    },

    showDialogLW: false,
    EditLW: false,
    AddLW: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempLaw() {
      console.log("aqui receteo");
      this.tempLw = {
        usotelef: "",
        compras: "",
        prepalim: "",
        manejocasa: "",
        lavar: "",
        transporte: "",
        manejofin: "",
        usomed: "",
        fecha_value: "",
        law_paciente: null,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listLaw() {
      this.loading = true;
      try {
        const url = "/asistmedica/lawton/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.lawton = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Lawton-Store.js:99 ~ listLaw ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createLaw() {
      try {
        const url = "/asistmedica/lawton/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("usotelef", this.tempLw.usotelef);
        formData.append("compras", this.tempLw.compras);
        formData.append("prepalim", this.tempLw.prepalim);
        formData.append("manejocasa", this.tempLw.manejocasa);
        formData.append("lavar", this.tempLw.lavar);
        formData.append("transporte", this.tempLw.transporte);
        formData.append("manejofin", this.tempLw.manejofin);
        formData.append("usomed", this.tempLw.usomed);
        formData.append("fecha_value", this.tempLw.fecha_value);
        formData.append("law_paciente", this.tempLw.law_paciente);
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
          await this.listLaw();
          this.showDialogLW = false;
          this.resetTempLaw();
        }
      } catch (error) {
        console.log("Error en createLaw:", error);
        const message = error.response.data.error;
        Notify.create({
          color: "negative",
          message: message,
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    //TODO: Accion para obtener un Registro desde un ID
    async retrieveLaw(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/lawton/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Lawton-Store.js:130 ~ retrieveLaw ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Lawton-Store.js:132 ~ retrieveLaw ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateLaw(id) {
      try {
        const url = `/asistmedica/lawton/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          usotelef: this.tempLw.usotelef,
          compras: this.tempLw.compras,
          prepalim: this.tempLw.prepalim,
          manejocasa: this.tempLw.manejocasa,
          lavar: this.tempLw.lavar,
          transporte: this.tempLw.transporte,
          manejofin: this.tempLw.manejofin,
          usomed: this.tempLw.usomed,
          fecha_value: this.tempLw.fecha_value,
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
            "🚀 ~ file: Lawton-Store.js:171 ~ updateLaw ~ response:",
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
        await this.listLaw();
        this.showDialogLW = false;
      } catch (error) {
        console.log("Error en updateLaw:", error);
        const message = error.response.data.error;
        Notify.create({
          color: "negative",
          message: message,
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    async destroyLaw(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/lawton/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Lawton-Store.js:214 ~ destroyLaw ~ response:",
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
          await this.listLaw();
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
