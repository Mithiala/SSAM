import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useTermometriaStore = defineStore("Termometria", {
  state: () => ({
    termometria: [],
    pacientes: [],
    loading: false,

    tempTermo: {
      id: 0,
      hora_6am: "",
      hora_2pm: "",
      hora_10pm: "",
      fecha: "",
      observaciones: "",
      ter_paciente: 0,
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
    resetTempTer() {
      console.log("aqui receteo");
      this.tempTermo = {
        hora_6am: "",
        hora_2pm: "",
        hora_10pm: "",
        fecha: "",
        observaciones: "",
        ter_paciente: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listTer() {
      this.loading = true;
      try {
        const url = "/asistmedica/termometria/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.termometria = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Termometria-Store.js:99 ~ listTer ~ error:",
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
    async createTer() {
      try {
        const url = "/asistmedica/termometria/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("hora_6am", this.tempTermo.hora_6am);
        formData.append("hora_2pm", this.tempTermo.hora_2pm);
        formData.append("hora_10pm", this.tempTermo.hora_10pm);
        formData.append("fecha", this.tempTermo.fecha);
        formData.append("observaciones", this.tempTermo.observaciones);
        formData.append("ter_paciente", this.tempTermo.ter_paciente);
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
          await this.listTer();
          this.showDialogDG = false;
          this.resetTempTer();
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
    async retrieveTer(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/termometria/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Termometria-Store.js:130 ~ retrieveTer ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Termometria-Store.js:132 ~ retrieveTer ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateTer(id) {
      try {
        const url = `/asistmedica/termometria/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          hora_6am: this.tempTermo.hora_6am,
          hora_2pm: this.tempTermo.hora_2pm,
          hora_10pm: this.tempTermo.hora_10pm,
          fecha: this.tempTermo.fecha,
          observaciones: this.tempTermo.observaciones,
        };

        const response = await api.pash(
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
            "🚀 ~ file: Termometria-Store.js:171 ~ updateTer ~ response:",
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
        await this.listTer();
        this.showDialogDG = false;
      } catch (error) {
        console.log("Code:", error);

        Notify.create({
          color: "negative",
          message: errorMessage,
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    async destroyTer(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/termometria/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Termometria-Store.js:214 ~ destroyTer ~ response:",
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
          await this.listTer();
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
