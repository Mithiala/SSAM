import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useCtrlglucemicoStore = defineStore("Ctrlglucemico", {
  state: () => ({
    ctrlglucemico: [],
    loading: false,

    tempGlucemico: {
      id: 0,
      fecha_gluc: "",
      turno: "",
      resultado: "",
      observaciones: "",
      gluc_paciente: null,
    },

    showDialogGL: false,
    EditGL: false,
    AddGL: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempGlu() {
      console.log("aqui receteo");
      this.tempGlucemico = {
        fecha_gluc: "",
        turno: "",
        resultado: "",
        observaciones: "",
        gluc_paciente: null,

      };
    },

    //TODO: Accion para Obtener todos Registros
    async listGlu() {
      this.loading = true;
      try {
        const url = "/asistmedica/ctrlglucemico/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.ctrlglucemico = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Ctrlglucemico-Store.js:99 ~ listGlu ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createGlu() {
      try {
        const url = "/asistmedica/ctrlglucemico/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("fecha_gluc", this.tempGlucemico.fecha_gluc);
        formData.append("turno", this.tempGlucemico.turno);
        formData.append("resultado", this.tempGlucemico.resultado);
        formData.append("observaciones", this.tempGlucemico.observaciones);
        formData.append("gluc_paciente", this.tempGlucemico.gluc_paciente.value);
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
          await this.listGlu();
          this.showDialogGL = false;
          this.resetTempGlu();
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
    async retrieveGlu(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/ctrlglucemico/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Ctrlglucemico-Store.js:130 ~ retrieveGlu ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Ctrlglucemico-Store.js:132 ~ retrieveGlu ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateGlu(id) {
      try {
        const url = `/asistmedica/ctrlglucemico/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          fecha_gluc: this.tempGlucemico.fecha_gluc,
          turno: this.tempGlucemico.turno,
          resultado: this.tempGlucemico.resultado,
          observaciones: this.tempGlucemico.observaciones,
          gluc_paciente: this.tempGlucemico.gluc_paciente,
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
            "🚀 ~ file: Ctrlglucemico-Store.js:171 ~ updateGlu ~ response:",
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
        await this.listGlu();
        this.showDialogGL = false;
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

    async destroyGlu(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/ctrlglucemico/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Ctrlglucemico-Store.js:214 ~ destroyGlu ~ response:",
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
          await this.listGlu();
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
