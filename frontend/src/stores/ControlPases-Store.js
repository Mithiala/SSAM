import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useControlPasesStore = defineStore("ControlPases", {
  state: () => ({
    controlpases: [],
    loading: false,

    tempPase: {
      id_pase: null,
      fecha_salida: "",
      direc_part: "",
      fecha_regreso: "",
      cp_paciente: null,
    },

    showDialogDP: false,
    EditDP: false,
    AddDP: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempPases() {
      console.log("aqui receteo");
      this.tempPase = {
        fecha_salida: "",
        direc_part: "",
        fecha_regreso: "",
        cp_paciente: null,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listPases() {
      this.loading = true;
      try {
        const url = "/tsocial/pases/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.controlpases = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: ControlPases-Store.js:99 ~ listPases ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createPases() {
      try {
        const url = "/tsocial/pases/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("fecha_salida", this.tempPase.fecha_salida);
        formData.append("direc_part", this.tempPase.direc_part);
        formData.append("fecha_regreso", this.tempPase.fecha_regreso);
        formData.append("cp_paciente", this.tempPase.cp_familiar.value);
        formData.append("cp_familiar", this.tempPase.cp_paciente.value);

        const response = await api.post(url, this.tempPase, {
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
          await this.listPases();
          this.showDialogDP = false;
          this.resetTempPases();
        }
      } catch (error) {
        console.log("FullError: ", error);
        console.log("error: ", error.response ? error.response.data : error);
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
    async retrievePases(id) {
      try {
        this.loading = true;
        const url = `/tsocial/pases/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: ControlPases-Store.js:130 ~ retrievePases ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: ControlPases-Store.js:132 ~ retrievePases ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updatePases(id) {
      try {
        const url = `/tsocial/pases/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          fecha_salida: this.tempPase.fecha_salida,
          direc_part: this.tempPase.direc_part,
          fecha_regreso: this.tempPase.fecha_regreso,
          cp_familiar: this.tempPase.cp_familiar,
          cp_paciente: this.tempPase.cp_paciente,
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
            "🚀 ~ file: ControlPases-Store.js:171 ~ updatePases ~ response:",
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
        await this.listPases();
        this.showDialogDP = false;
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

    async destroyPases(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/tsocial/pases/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: ControlPases-Store.js:214 ~ destroyPases ~ response:",
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
          await this.listPases();
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
