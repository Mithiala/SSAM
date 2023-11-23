import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useYesavageStore = defineStore("Yesavage", {
  state: () => ({
    yesavage: [],
    loading: false,

    tempYasevage: {
      id: null,
      fecha: "",
      depmoderada: null,
      depsevera: null,
      normal: null,
      y_paciente: null,
    },

    showDialogYP: false,
    EditYP: false,
    AddYP: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempYase() {
      console.log("aqui receteo");
      this.tempYasevage = {
        fecha: "",
        depmoderada: null,
        depsevera: null,
        normal: null,
        y_paciente: null,
      };
    },

    //TODO: Accion para Obtener todos 
    async listYase() {
      this.loading = true;
      try {
        const url = "/psicologia/escyasevage/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.yesavage = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Yesavage-Store.js:99 ~ listYase ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createYase() {
      try {
        const url = "/psicologia/escyasevage/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("depmoderada", this.tempYasevage.depmoderada);
        formData.append("fecha", this.tempYasevage.fecha);
        formData.append("depsevera", this.tempYasevage.depsevera);
        formData.append("normal", this.tempYasevage.normal);
        formData.append("y_paciente", this.tempYasevage.y_paciente.value);
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
          await this.listYase();
          this.showDialogYP = false;
          this.resetTempYase();
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
    async retrieveYase(id) {
      try {
        this.loading = true;
        const url = `/psicologia/escyasevage/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Yasevage-Store.js:130 ~ retrieveYase ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Yasevage-Store.js:132 ~ retrieveYase ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateYase(id) {
      try {
        const url = `/psicologia/escyasevage/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          depmoderada: this.tempYasevage.depmoderada,
          fecha: this.tempYasevage.fecha,
          depsevera: this.tempYasevage.depsevera,
          normal: this.tempYasevage.normal,
          y_paciente: this.tempYasevage.y_paciente,
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
            "🚀 ~ file: Yasevage-Store.js:171 ~ updateYase ~ response:",
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
        await this.listYase();
        this.showDialogYP = false;
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

    async destroyYase(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/psicologia/escyasevage/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Yasevage-Store.js:214 ~ destroyYase ~ response:",
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
          await this.listYase();
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
