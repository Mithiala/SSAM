import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useSolicitudMedicamentoStore = defineStore("SolicitudMedicamento", {
  state: () => ({
    solicitudmedicamento: [],
    loading: false,

    tempSolicitud: {
      id: 0,
      producto: "",
      unidad_medida: "",
      cantidad: 0,
      fecha_pedido: "",
      sp_disp: 0,
    },

    showDialogPD: false,
    EditPD: false,
    AddPD: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempMed() {
      console.log("aqui receteo");
      this.tempSolicitud = {
        producto: "",
        unidad_medida: "",
        cantidad: 0,
        fecha_pedido: "",
        sp_disp: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listMed() {
      this.loading = true;
      try {
        const url = "/asistmedica/pedido/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.solicitudmedicamento = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: SolicitudMedicamento-Store.js:99 ~ listMed ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createMed() {
      try {
        const url = "/asistmedica/pedido/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("producto", this.tempSolicitud.producto);
        formData.append("unidad_medida", this.tempSolicitud.unidad_medida);
        formData.append("cantidad", this.tempSolicitud.cantidad);
        formData.append("fecha_pedido", this.tempSolicitud.fecha_pedido);
        formData.append("sp_disp", this.tempSolicitud.sp_disp.value);
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
          await this.listMed();
          this.showDialogPD = false;
          this.resetTempMed();
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
    async retrieveMed(id) {
      try {
        this.loading = true;
        const url = `/api/v1/solicitudmedicamentos/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: SolicitudMedicamento-Store.js:130 ~ retrieveMed ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: SolicitudMedicamento-Store.js:132 ~ retrieveMed ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateMed(id) {
      try {
        const url = `/asistmedica/pedido/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          producto: this.tempSolicitud.producto,
          unidad_medida: this.tempSolicitud.unidad_medida,
          cantidad: this.tempSolicitud.cantidad,
          fecha_pedido: this.tempSolicitud.fecha_pedido,
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
            "🚀 ~ file: SolicitudMedicamento-Store.js:171 ~ updateMed ~ response:",
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
        await this.listMed();
        this.showDialogPD = false;
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

    async destroyMed(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/pedido/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: SolicitudMedicamento-Store.js:214 ~ destroyMed ~ response:",
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
          await this.listMed();
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
