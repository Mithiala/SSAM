import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useCoberturaFarmaciaStore = defineStore("CoberturaFarmacia", {
  state: () => ({
    coberturafarmacia: [],
    loading: false,

    tempCobertura: {
      id_cob: 0,
      lote_cob: "",
      tipo_med: "",
      cantidad_cob: 0,
      falta: false,
      ocioso: false,
    },

    showDialogDF: false,
    EditDF: false,
    AddDF: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempCob() {
      console.log("aqui receteo");
      this.tempCobertura = {
        lote_cob: "",
        tipo_med: "",
        cantidad_cob: 0,
        falta: false,
        ocioso: false,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listCob() {
      this.loading = true;
      try {
        const url = "/api/v1/coberturafarmacias";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.coberturafarmacia = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: CoberturaFarmacia-Store.js:99 ~ listCob ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createCob() {
      try {
        const url = "/api/v1/coberturafarmacias";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempCobertura, {
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
          await this.listCob();
          this.showDialogDF = false;
          this.resetTempCob();
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
    async retrieveCob(id_cob) {
      try {
        this.loading = true;
        const url = `/api/v1/coberturafarmacias/${id_cob}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: CoberturaFarmacia-Store.js:130 ~ retrieveCob ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: CoberturaFarmacia-Store.js:132 ~ retrieveCob ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateCob(id_cob) {
      try {
        const url = `/api/v1/coberturafarmacias/${id_cob}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          id_cob: this.tempCobertura.id_cob,
          lote_cob: this.tempCobertura.lote_cob,
          tipo_med: this.tempCobertura.tipo_med,
          cantidad_cob: this.tempCobertura.cantidad_cob,
          falta: this.tempCobertura.falta,
          ocioso: this.tempCobertura.ocioso,
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
            "🚀 ~ file: CoberturaFarmacia-Store.js:171 ~ updateCob ~ response:",
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
        await this.listCob();
        this.showDialogDF = false;
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

    async destroyCob(id_cob) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/api/v1/coberturafarmacias/${id_cob}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: CoberturaFarmacia-Store.js:214 ~ destroyCob ~ response:",
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
          await this.listCob();
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
