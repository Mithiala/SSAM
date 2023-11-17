import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useCtrlmatgastableStore = defineStore("Ctrlmatgastable", {
  state: () => ({
    ctrlmatgastable: [],
    pacientes: [],
    loading: false,

    tempGast: {
      id: 0,
      fecha_mat: "",
      turno: "",
      mat_util: "",
      med_util: "",
      via_admin: "",
    },

    tempPaciente: {
      image: "",
      nombre: "",
      edad: 0,
    },

    showDialogMG: false,
    EditMG: false,
    AddMG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempMatg() {
      console.log("aqui receteo");
      this.tempGast = {
        fecha_mat: "",
        turno: "",
        mat_util: "",
        med_util: "",
        via_admin: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listMatg() {
      this.loading = true;
      try {
        const url = "/asistmedica/matgastable/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.ctrlmatgastable = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Ctrlmatgastable-Store.js:99 ~ listMatg ~ error:",
          error
        );
      }
    },

    async listPacientes() {
      this.loading = true;
      try {
        const url = "/api/v1/pacientes";
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
    async createMatg() {
      try {
        const url = "/asistmedica/matgastable/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempGast, {
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
          await this.listMatg();
          this.showDialogMG = false;
          this.resetTempMatg();
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
    async retrieveMatg(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/matgastable/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Ctrlmatgastable-Store.js:130 ~ retrieveMatg ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Ctrlmatgastable-Store.js:132 ~ retrieveMatg ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateMatg(id) {
      try {
        const url = `/asistmedica/matgastable/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          fecha_mat: this.tempGast.fecha_mat,
          fecha_mat: this.tempGast.fecha_mat,
          turno: this.tempGast.turno,   
          via_admin: this.tempGast.via_admin,
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
            "🚀 ~ file: Ctrlmatgastable-Store.js:171 ~ updateMatg ~ response:",
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
        await this.listMatg();
        this.showDialogMG = false;
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

    async destroyMatg(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/matgastable/${id_mat}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Ctrlmatgastable-Store.js:214 ~ destroyMatg  ~ response:",
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
          await this.listMatg();
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
