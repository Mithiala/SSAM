import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useEnfvalueStore = defineStore("Enfvalue", {
  state: () => ({
    enfvalue: [],
    loading: false,

    tempValue: {
      id: 0,
      banarse: "",
      vestirse: "",
      servicio: "",
      levantarse: "",
      continencia: "",
      comer: "",
      fecha_kats: "",
      kat_paciente: null,
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
        kat_paciente: null,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listValues() {
      this.loading = true;
      try {
        const url = "/asistmedica/kats/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.enfvalue= response.data.results;
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
        const url = "/asistmedica/kats/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("banarse", this.tempValue.banarse);
        formData.append("vestirse", this.tempValue.vestirse);
        formData.append("servicio", this.tempValue.servicio);
        formData.append("levantarse", this.tempValue.levantarse);
        formData.append("continencia", this.tempValue.continencia);
        formData.append("comer", this.tempValue.comer);
        formData.append("fecha_kats", this.tempValue.fecha_kats);
        formData.append("kat_paciente", this.tempValue.kat_paciente.value);
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
    async retrieveValues(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/kats/${id}/`;
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
    async updateValues(id) {
      try {
        const url = `/asistmedica/kats/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          banarse: this.tempValue.banarse,
          vestirse: this.tempValue.vestirse,
          servicio: this.tempValue.servicio,
          levantarse: this.tempValue.levantarse,
          continencia: this.tempValue.continencia,
          comer: this.tempValue.comer,
          fecha_kats: this.tempValue.fecha_kats,
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

    async destroyValues(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/kats/${id}/`;
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
