import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useCtrlintercurrenciaStore = defineStore("Ctrlintercurrencia", {
  state: () => ({
    ctrlintercurrencia: [],
    pacientes: [],
    loading: false,

    tempInter: {
      id: 0,
      tratamiento: "",
      fecha_inicio: "",
      fecha_termina: "",
      mg_paciente: 0,
    },

    tempPaciente: {
      image: "",
      nombre: "",
      edad: 0,
    },

    showDialogIN: false,
    EditIN: false,
    AddIN: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempInt() {
      console.log("aqui receteo");
      this.tempInter = {
        tratamiento: "",
        fecha_inicio: "",
        fecha_termina: "",
        mg_paciente: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listInt() {
      this.loading = true;
      try {
        const url = "/asistmedica/intercurrencia/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.ctrlintercurrencia = response.data;
        this.loadingIN = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Ctrlintercurrencia-Store.js:99 ~ listInt ~ error:",
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
    async createInt() {
      try {
        const url = "/asistmedica/intercurrencia/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempInter, {
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
          await this.listInt();
          this.showDialogIN = false;
          this.resetTempInt();
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
    async retrieveInt(id) {
      try {
        this.loadingIN = true;
        const url = `/asistmedica/intercurrencia/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Ctrlintercurrencia-Store.js:130 ~ retrieveInt ~ response:",
          response.statusText
        );
        this.loadingIN = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Ctrlintercurrencia-Store.js:132 ~ retrieveInt ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateInt(id) {
      try {
        const url = `/asistmedica/intercurrencia/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          tratamiento_inter: this.tempInter.tratamiento_inter,
          fecha_inicio: this.tempInter.fecha_inicio,
          fecha_termina: this.tempInter.fecha_termina
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
            "🚀 ~ file: Ctrlintercurrencia-Store.js:171 ~ updateInt ~ response:",
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
        await this.listInt();
        this.showDialogIN = false;
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

    async destroyInt(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/intercurrencia/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Ctrlintercurrencia-Store.js:214 ~ destroyInt  ~ response:",
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
          await this.listInt();
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
