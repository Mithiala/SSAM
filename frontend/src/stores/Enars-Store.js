import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useEnarsStore = defineStore("Enars", {
  state: () => ({
    enars: [],
    pacientes: [],
    loading: false,

    tempEna: {
      id: 0,
      algveces: 0,
      frecuente: 0,
      siempre: 0,
      nunca: 0,
      en_paciente: 0,
    },

    tempPaciente: {
      nombre: "",
      edad: 0,
      sexo: "",
    },

    showDialogEE: false,
    EditEE: false,
    AddEE: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempEnars() {
      console.log("aqui receteo");
      this.tempEna = {
        algveces: 0,
        frecuente: 0,
        siempre: 0,
        nunca: 0,
        en_paciente: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listEnars() {
      this.loading = true;
      try {
        const url = "/psicologia/escenars/";
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
          "🚀 ~ file: Enars-Store.js:99 ~ listEnars ~ error:",
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
    async createEnars() {
      try {
        const url = "/psicologia/escenars/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("algveces", this.tempEna.algveces);
        formData.append("frecuente", this.tempEna.frecuente);
        formData.append("siempre", this.tempEna.siempre);
        formData.append("nunca", this.tempEna.nunca);
        formData.append("en_paciente", this.tempEna.en_paciente.value);
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
          await this.listEnars();
          this.showDialogEE = false;
          this.resetTempEnars();
        }
      } catch (error) {
        console.log("FullError: ", error);
        console.log("error: ", error.response.data);
        const menssage = ( error.response.data.error)
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
    async retrieveEnars(id) {
      try {
        this.loading = true;
        const url = `/psicologia/escenars/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Enars-Store.js:130 ~ retrieveEnars ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Enars-Store.js:132 ~ retrieveEnars ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateEnars(id) {
      try {
        const url = `/psicologia/escenars/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          algveces: this.tempEna.enars,
          frecuente: this.tempEna.frecuente,
          siempre: this.tempEna.siempre,
          nunca: this.tempEna.nunca,
          en_paciente: this.tempEna.en_paciente,
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
            "🚀 ~ file: Enars-Store.js:171 ~ updateEnars ~ response:",
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
        await this.listEnars();
        this.showDialogEE = false;
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

    async destroyEnars(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/psicologia/escenars/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Enars-Store.js:214 ~ destroyEnars ~ response:",
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
          await this.listEnars();
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
