import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useMntStore = defineStore("Mnt", {
  state: () => ({
    mnt: [],
    pacientes: [],
    loading: false,

    tempMntprog: {
      id: 0,
      tratamiento: "",
      diagnostico: "",
      frecuencia: "",
      fecha_mnt: "",
      mnt_paciente: 0,
    },

    tempPaciente: {
      image: "",
      nombre: "",
      edad: 0,
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempMntp() {
      console.log("aqui receteo");
      this.tempMntprog = {
        tratamiento: "",
        diagnostico: "",
        frecuencia: "",
        fecha_mnt: "",
        mnt_paciente: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listMntp() {
      this.loading = true;
      try {
        const url = "/asistmedica/mnt/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.mnt = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Mnt-Store.js:99 ~ listMntp ~ error:",
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
    async createMntp() {
      try {
        const url = "/asistmedica/mnt/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("tratamiento", this.tempMntprog.tratamiento);
        formData.append("diagnostico", this.tempMntprog.diagnostico);
        formData.append("frecuencia", this.tempMntprog.frecuencia);
        formData.append("fecha_mnt", this.tempMntprog.fecha_mnt);
        formData.append("mnt_paciente", this.tempMntprog.mnt_paciente.value);
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
          await this.listMntp();
          this.showDialogDG = false;
          this.resetTempMntp();
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
    async retrieveMntp(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/mnt/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Mnt-Store.js:130 ~ retrieveMntp ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Mnt-Store.js:132 ~ retrieveMntp ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateMntp(id) {
      try {
        const url = `/asistmedica/mnt/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          tratamiento: this.tempMntprog.tratamiento,
          diagnostico: this.tempMntprog.diagnostico,
          frecuencia: this.tempMntprog.frecuencia,
          fecha_mnt: this.tempMntprog.fecha_mnt,
          mnt_paciente: this.tempMntprog.mnt_paciente,
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
            "🚀 ~ file: Mnt-Store.js:171 ~ updateMntp ~ response:",
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
        await this.listMntp();
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

    async destroyMntp(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/mnt/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Mnt-Store.js:214 ~ destroyMntp ~ response:",
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
          await this.listMntp();
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
