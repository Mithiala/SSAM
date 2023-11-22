import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog, LocalStorage } from "quasar";

export const useTrabajoDiarioStore = defineStore("TrabajoDiario", {
  state: () => ({
    trabajodiario: [],
    loading: false,

    tempDiario: {
      id: null,
      fecha_ent: "",
      lugar_entrevista: "",
      tarjeton_medicamento: "",
      recibidos: false,
      enviados: false,
      observaciones: "",
      mot_invest: "",
      efectuada: false,
      conclusiones: "",
      td_paciente: null,
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempDiarios() {
      console.log("aqui receteo");
      this.tempDiario = {
      fecha_ent: "",
      lugar_entrevista: "",
      tarjeton_medicamento: "",
      recibidos: false,
      enviados: false,
      observaciones: "",
      mot_invest: "",
      efectuada: false,
      conclusiones: "",
      td_paciente: null,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listDiarios() {
      this.loading = true;
      try {
        const url = "/tsocial/tdiario/";
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
            //Authorization: `Bearer ${token}`,
          //},
        });
        this.trabajodiario = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: TrabajoDiario-Store.js:99 ~ listDiarios ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createDiarios() {
      try {
        const url = "/tsocial/tdiario/";
        //const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("fecha_ent", this.tempDiario.fecha_ent);
        formData.append("lugar_entrevista", this.tempDiario.lugar_entrevista);
        formData.append("tarjeton_medicamento", this.tempDiario.tarjeton_medicamento);
        formData.append("recibidos", this.tempDiario.recibidos);
        formData.append("enviados", this.tempDiario.enviados);
        formData.append("observaciones", this.tempDiario.observaciones);
        formData.append("mot_invest", this.tempDiario.mot_invest);
        formData.append("efectuada", this.tempDiario.efectuada);
        formData.append("conclusiones", this.tempDiario.conclusiones);
        formData.append("td_paciente", this.tempDiario.td_familiar.value);
        formData.append("td_familiar", this.tempDiario.td_paciente.value);

        const response = await api.post(url, formData, {
          //headers: {
            //Authorization: `Bearer ${token}`,
            //},
        });
        if (response) {
          Notify.create({
            color: "positive",
            message: `Regitro guardado exitosamente`,
            position: "bottom",
            progress: true,
            icon: "check",
          });
          await this.listDiarios();
          this.showDialogDG = false;
          this.resetTempDiarios();
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
    async retrieveDiarios(id) {
      try {
        this.loading = true;
        const url = `/tsocial/tdiario/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
            //Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: TrabajoDiario-Store.js:130 ~ retrieveDiarios ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: TrabajoDiario-Store.js:132 ~ retrieveDiarios ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateDiarios(id) {
      try {
        const url = `/tsocial/tdiario/${id}/`;
        //const token = LocalStorage.getItem("access_token");

        const request = {
          fecha_ent: this.tempDiario.fecha_ent,
          lugar_entrevista: this.tempDiario.lugar_entrevista,
          recibidos: this.tempDiario.recibidos,
          enviados: this.tempDiario.enviados,
          observaciones: this.tempDiario.observaciones,
          mot_invest: this.tempDiario.mot_invest,
          efectuada: this.tempDiario.efectuada,
          conclusiones: this.tempDiario.conclusiones,
          td_familiar: this.tempDiario.td_familiar,
          td_paciente: this.tempDiario.td_paciente,
          tarjeton_medicamento: this.tempDiario.tarjeton_medicamento,
        };

        const response = await api.patch( url, request, {
            //headers: {
              //Authorization: `Bearer ${token}`,
            //},
          });

        if (response.status === 201) {
          console.log("Status: ", response.statusText);
          console.log(
            "🚀 ~ file: TrabajoDiario-Store.js:171 ~ updateDiarios ~ response:",
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
        await this.listDiarios();
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

    async destroyDiarios(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/tsocial/tdiario/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
            //headers: {
                //Authorization: `Bearer ${token}`,
              //},
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: TrabajoDiario-Store.js:214 ~ destroyDiarios ~ response:",
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
          await this.listDiarios();
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
