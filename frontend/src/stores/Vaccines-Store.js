import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useVaccinesStore = defineStore("Vaccines", {
  state: () => ({
    vaccines: [],
    loading: false,

    tempVacuna: {
      id: 0,
      tipo: "",
      lote: "",
      fecha: "",
      vac_paciente: null,
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempVac() {
      console.log("aqui receteo");
      this.tempVacuna = {
        tipo: "",
        lote: "",
        fecha: "",
        vac_paciente: null,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listVac() {
      this.loading = true;
      try {
        const url = "/asistmedica/vacunacion/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.vaccines = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Vaccines-Store.js:99 ~ listVac ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createVac() {
      try {
        const url = "/asistmedica/vacunacion/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("tipo", this.tempVacuna.tipo);
        formData.append("lote", this.tempVacuna.lote);
        formData.append("fecha", this.tempVacuna.fecha);
        formData.append("vac_paciente", this.tempVacuna.vac_paciente.value);
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
          await this.listVac();
          this.showDialogDG = false;
          this.resetTempVac();
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
    async retrieveVac(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/vacunacion/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Vaccines-Store.js:130 ~ retrieveVac ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Vaccines-Store.js:132 ~ retrieveVac ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateVac(id) {
      try {
        const url = `/asistmedica/vacunacion/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          tipo: this.tempVacuna.tipo,
          lote: this.tempVacuna.lote,
          fecha: this.tempVacuna.fecha,
          vac_paciente: this.tempVacuna.vac_paciente,
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
            "🚀 ~ file: Vaccines-Store.js:171 ~ updateVac ~ response:",
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
        await this.listVac();
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

    async destroyVac(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/vacunacion/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Vaccines-Store.js:214 ~ destroyVac ~ response:",
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
          await this.listVac();
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
