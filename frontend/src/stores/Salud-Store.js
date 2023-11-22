import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useSaludStore = defineStore("Salud", {
  state: () => ({
    salud: [],
    loading: false,

    tempSalud: {
      id: null,
      orientemporal: null,
      orientespacial: null,
      fijacion: null,
      atcalculo: null,
      memoria: null,
      lenguaje: null,
      normal: null,
      sm_paciente: null,
    },

    showDialogSM: false,
    EditSM: false,
    AddSM: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempSaludm() {
      console.log("aqui receteo");
      this.tempSalud = {
        orientemporal: null,
        orientespacial: null,
        fijacion: null,
        atcalculo: null,
        memoria: null,
        lenguaje: null,
        normal: null,
        sm_paciente: null,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listSaludm() {
      this.loading = true;
      try {
        const url = "/psicologia/escsaludmental/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.salud = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Salud-Store.js:99 ~ listSaludm ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createSaludm() {
      try {
        const url = "/psicologia/escsaludmental/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("orientemporal", this.tempSalud.orientemporal);
        formData.append("orientespacial", this.tempSalud.orientespacial);
        formData.append("fijacion", this.tempSalud.fijacion);
        formData.append("atcalculo", this.tempSalud.atcalculo);
        formData.append("memoria", this.tempSalud.memoria);
        formData.append("lenguaje", this.tempSalud.lenguaje);
        formData.append("normal", this.tempSalud.normal);
        formData.append("sm_paciente", this.tempSalud.sm_paciente.value);
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
          await this.listSaludm();
          this.showDialogDG = false;
          this.resetTempEstad();
        }
      } catch (error) {
        console.log("Error completo:", error);
        console.log("error:", error.response.data);
        const message = error.response && error.response.data && error.response.data.error ? error.response.data.error : "Error desconocido";
        Notify.create({
          color: "negative",
          message: "Error al crear el registro",
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    //TODO: Accion para obtener un Registro desde un ID
    async retrieveSaludm(id) {
      try {
        this.loading = true;
        const url = `/psicologia/escsaludmental/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Salud-Store.js:130 ~ retrieveSaludm ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Salud-Store.js:132 ~ retrieveSaludm ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateSaludm(id) {
      try {
        const url = `/psicologia/escsaludmental/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          orientemporal: this.tempSalud.orientemporal,
          orientespacial: this.tempSalud.orientespacial,
          fijacion: this.tempSalud.fijacion,
          atcalculo: this.tempSalud.atcalculo,
          memoria: this.tempSalud.memoria,
          lenguaje: this.tempSalud.lenguaje,
          normal: this.tempSalud.normal,
          sm_paciente: this.tempSalud.sm_paciente,
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
            "🚀 ~ file: Salud-Store.js:171 ~ updateSaludm ~ response:",
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
        await this.listSaludm();
        this.showDialogDG = false;
      } catch (error) {
        console.log("Code: ", error);

        Notify.create({
          color: "negative",
          message: "Hubo un error al actualizar",
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    async destroySaludm(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/psicologia/escsaludmental/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Salud-Store.js:214 ~ destroySaludm ~ response:",
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
          await this.listSaludm();
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
          message: "Hubo un error al eliminar",
          position: "top",
          icon: "report_problem",
          position: "bottom",
          progress: true,
        });
      }
    }
  }
})
