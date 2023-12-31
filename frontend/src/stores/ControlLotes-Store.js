import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useControlLotesStore = defineStore("ControlLotes", {
  state: () => ({
    controllotes: [],
    loading: false,

    tempLotes: {
      id: 0,
      lotes: "",
      producto_lotes: "",
      unidad_med: "",
      cant: 0,
      fecha_produccion: "",
      fecha_vence: "",
      cl_disp: 0,
    },

    showDialogDF: false,
    EditDF: false,
    AddDF: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempClotes() {
      console.log("aqui receteo");
      this.tempLotes = {
        lotes: "",
        producto_lotes: "",
        unidad_med: "",
        cant: 0,
        fecha_produccion: "",
        fecha_vence: "",
        cl_disp: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listClotes() {
      this.loading = true;
      try {
        const url = "/farmacia/lotes/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.controllotes = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: ControlLotes-Store.js:99 ~ listClotes ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createClotes() {
      try {
        const url = "/farmacia/lotes/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("lotes", this.tempLotes.lotes);
        formData.append("producto_lotes", this.tempLotes.producto_lotes);
        formData.append("unidad_med", this.tempLotes.unidad_med);
        formData.append("cant", this.tempLotes.cant);
        formData.append("fecha_produccion", this.tempLotes.fecha_produccion);
        formData.append("fecha_vence", this.tempLotes.fecha_vence);
        formData.append("cl_disp", this.tempLotes.cl_disp.value);
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
          await this.listClotes();
          this.showDialogDF = false;
          this.resetTempClotes();
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
    async retrieveClotes(id) {
      try {
        this.loading = true;
        const url = `/farmacia/lotes/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: ControlLotes-Store.js:130 ~ retrieveClotes ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: ControlLotes-Store.js:132 ~ retrieveClotes ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateClotes(id) {
      try {
        const url = `/farmacia/lotes/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          lotes: this.tempLotes.lotes,
          producto_lotes: this.tempLotes.producto_lotes,
          unidad_med: this.tempLotes.unidad_med,
          cant: this.tempLotes.cant,
          fecha_produccion: this.tempLotes.fecha_produccion,
          fecha_vence: this.tempLotes.fecha_vence,
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
            "🚀 ~ file: ControlLotes-Store.js:171 ~ updateClotes ~ response:",
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
        await this.listClotes();
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

    async destroyClotes(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/farmacia/lotes/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: ControlLotes-Store.js:214 ~ destroyClotes ~ response:",
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
          await this.listClotes();
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
