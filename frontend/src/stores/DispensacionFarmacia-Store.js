import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useDispensacionFarmaciaStore = defineStore("DispensacionFarmacia", {
  state: () => ({
    dispensacionfarmacia: [],
    loading: false,

    tempDispensacion: {
      id_codigo: 0,
      lote_disp: "",
      producto_medicamento: "",
      unidad_medida: "",
      cantidad_medicamento: 0,
      fecha_entrada: "",
      fecha_salida: "",
      fecha_vence: "",
      clasificacion: "",
    },

    showDialogDF: false,
    EditDF: false,
    AddDF: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempDisp() {
      console.log("aqui receteo");
      this.tempDispensacion = {
        lote_disp: "",
        producto_medicamento: "",
        unidad_medida: "",
        cantidad_medicamento: 0,
        fecha_entrada: "",
        fecha_salida: "",
        fecha_vence: "",
        clasificacion: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listDisp() {
      this.loading = true;
      try {
        const url = "/api/v1/dispensacionfarmacias";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.dispensacionfarmacia = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: DispensacionFarmacia-Store.js:99 ~ listDisp ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createDisp() {
      try {
        const url = "/api/v1/dispensacionfarmacias";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempDispensacion, {
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
          await this.listDisp();
          this.showDialogDF = false;
          this.resetTempDisp();
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
    async retrieveDisp(id_codigo) {
      try {
        this.loading = true;
        const url = `/api/v1/dispensacionfarmacias/${id_codigo}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: DispensacionFarmacia-Store.js:130 ~ retrieveDisp ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: DispensacionFarmacia-Store.js:132 ~ retrieveDisp ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateDisp(id_codigo) {
      try {
        const url = `/api/v1/dispensacionfarmacias/${id_codigo}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          id_codigo: this.tempDispensacion.id_codigo,
          lote_disp: this.tempDispensacion.lote_disp,
          producto_medicamento: this.tempDispensacion.producto_medicamento,
          unidad_medida: this.tempDispensacion.unidad_medida,
          cantidad_medicamento: this.tempDispensacion.cantidad_medicamento,
          fecha_entrada: this.tempDispensacion.fecha_entrada,
          fecha_salida: this.tempDispensacion.fecha_salida,
          fecha_vence: this.tempDispensacion.fecha_vence,
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
            "🚀 ~ file: DispensacionFarmacia-Store.js:171 ~ updateDisp ~ response:",
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
        await this.listDisp();
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

    async destroyDisp(id_codigo) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/api/v1/dispensacionfarmacias/${id_codigo}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: DispensacionFarmacia-Store.js:214 ~ destroyDisp ~ response:",
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
          await this.listDisp();
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
