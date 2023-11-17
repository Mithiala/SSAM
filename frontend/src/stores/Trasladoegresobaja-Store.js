import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useTrasladoegresobajaStore = defineStore("Trasladoegresobaja", {
  state: () => ({
    trasladoegresobaja: [],
    pacientes: [],
    loading: false,

    tempTraslado: {
      id_etb: 0,
      motivo_traslado_poli: "",
      fecha_traslado_poli: "",
      motivo_ingreso_hosp: "",
      fecha_ingreso_hosp: "",
      fecha_egreso: "",
      diagnostico: "",
      motivo_ingreso_psiquiatria: "",
      fecha_ingreso_psiquiatria: "",
      fecha_egreso_psiquiatria: "",
      diagnostico_psiquiatria: "",
      motivo_ingreso_subagudo: "",
      fecha_ingreso_subagudo: "",
      motivo_baja: "",
      fecha_baja: "",
      motivo_fallecido: "",
      fecha_fallecido: "",
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
    resetTempTrasladoEB() {
      console.log("aqui receteo");
      this.tempTraslado = {
        motivo_traslado_poli: "",
        fecha_traslado_poli: "",
        motivo_ingreso_hosp: "",
        fecha_ingreso_hosp: "",
        fecha_egreso: "",
        diagnostico: "",
        motivo_ingreso_psiquiatria: "",
        fecha_ingreso_psiquiatria: "",
        fecha_egreso_psiquiatria: "",
        diagnostico_psiquiatria: "",
        motivo_ingreso_subagudo: "",
        fecha_ingreso_subagudo: "",
        motivo_baja: "",
        fecha_baja: "",
        motivo_fallecido: "",
        fecha_fallecido: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listTrasladoEB() {
      this.loading = true;
      try {
        const url = "/api/v1/trasladoegresobajas";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.trasladoegresobaja = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Trasladoegresobaja-Store.js:99 ~ listTrasladoEB ~ error:",
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
        this.pacientes = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Pacientes-Store.js:99 ~ listPaciente ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
async createTrasladoEB() {
  try {
    const url = "/api/v1/trasladoegresobajas";
    // const token = LocalStorage.getItem("access_token");
    const response = await api.post(url, this.tempTraslado, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    if (response) {
      Notify.create({
        color: "positive",
        message: `Registro guardado exitosamente`,
        position: "bottom",
        progress: true,
        icon: "check",
      });
      await this.listTrasladoEB();
      this.showDialogDG = false;
      this.resetTempTrasladoEB();
    }
  } catch (error) {
    console.log("FullError: ", error);
    console.log("error: ", error.response.data);
    const menssage = error.response.data.error;
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
    async retrieveTrasladoEB(id_etb) {
      try {
        this.loading = true;
        const url = `/api/v1/trasladoegresobajas/${id_etb}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Trasladoegresobaja-Store.js:130 ~ retrieveTrasladoEB ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Trasladoegresobaja-Store.js:132 ~ retrieveTrasladoEB ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateTrasladoEB(id_etb) {
      try {
        const url = `/api/v1/trasladoegresobajas/${id_etb}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          id_etb: this.tempTraslado.id_etb,
          motivo_traslado_poli: this.tempTraslado.motivo_traslado_poli,
          fecha_traslado_poli: this.tempTraslado.fecha_traslado_poli,
          motivo_ingreso_hosp: this.tempTraslado.motivo_ingreso_hosp,
          fecha_ingreso_hosp: this.tempTraslado.fecha_ingreso_hosp,
          fecha_egreso: this.tempTraslado.fecha_egreso,
          diagnostico: this.tempTraslado.diagnostico,
          motivo_ingreso_psiquiatria: this.tempTraslado.motivo_ingreso_psiquiatria,
          fecha_ingreso_psiquiatria: this.tempTraslado.fecha_ingreso_psiquiatria,
          fecha_egreso_psiquiatria: this.tempTraslado.fecha_egreso_psiquiatria,
          diagnostico_psiquiatria: this.tempTraslado.diagnostico_psiquiatria,
          motivo_ingreso_subagudo: this.tempTraslado.motivo_ingreso_subagudo,
          fecha_ingreso_subagudo: this.tempTraslado.fecha_ingreso_subagudo,
          motivo_baja: this.tempTraslado.motivo_baja,
          fecha_baja: this.tempTraslado.fecha_baja,
          motivo_fallecido: this.tempTraslado.motivo_fallecido,
          fecha_fallecido: this.tempTraslado.fecha_fallecido,

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
            "🚀 ~ file: Trasladoegresobaja-Store.js:171 ~ updateTrasladoEB ~ response:",
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
        await this.listTrasladoEB();
        this.showDialogDG = false;
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

    async destroyTrasladoEB(id_etb) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/api/v1/trasladoegresobajas/${id_etb}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Trasladoegresobaja-Store.js:214 ~ destroyTrasladoEB ~ response:",
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
          await this.listTrasladoEB();
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
