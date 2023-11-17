import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useDonacionFarmaciaStore = defineStore("DonacionFarmacia", {
  state: () => ({
    donacionfarmacia: [],
    loading: false,

    tempDonacion: {
      id_donacion: 0,
      lote_don: "",
      prod_don: "",
      und_med: "",
      cant_don: 0,
      fecha_venced: "",
    },

    showDialogDF: false,
    EditDF: false,
    AddDF: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempDonFarm() {
      console.log("aqui receteo");
      this.tempDonacion = {
        lote_don: "",
        prod_don: "",
        und_med: "",
        cant_don: 0,
        fecha_venced: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listDonFarm() {
      this.loading = true;
      try {
        const url = "/api/v1/donacionfarmacias";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.donacionfarmacia = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: DonacionFarmacia-Store.js:99 ~ listDonFarm ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createDonFarm() {
      try {
        const url = "/api/v1/donacionfarmacias";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempDonacion, {
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
          await this.listDonFarm();
          this.showDialogDF = false;
          this.resetTempDonFarm();
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
    async retrieveDonFarm(id_donacion) {
      try {
        this.loading = true;
        const url = `/api/v1/donacionfarmacias/${id_donacion}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: DonacionFarmacia-Store.js:130 ~ retrieveDonFarm ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: DonacionFarmacia-Store.js:132 ~ retrieveDonFarm ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateDonFarm(id_donacion) {
      try {
        const url = `/api/v1/donacionfarmacias/${id_donacion}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          id_donacion: this.tempDonacion.id_donacion,
          lote_don: this.tempDonacion.lote_don,
          prod_don: this.tempDonacion.prod_don,
          und_med: this.tempDonacion.und_med,
          cant_don: this.tempDonacion.cant_don,
          fecha_venced: this.tempDonacion.fecha_venced,
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
            "🚀 ~ file: DonacionFarmacia-Store.js:171 ~ updateDonFarm ~ response:",
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
        await this.listDonFarm();
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

    async destroyDonFarm(id_donacion) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/api/v1/donacionfarmacias/${id_donacion}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: DonacionFarmacia-Store.js:214 ~ destroyDonFarm ~ response:",
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
          await this.listDonFarm();
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
