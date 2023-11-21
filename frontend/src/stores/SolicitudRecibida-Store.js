import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useSolicitudRecibidaStore = defineStore("SolicitudRecibida", {
  state: () => ({
    solicitudrecibida: [],
    loading: false,

    tempSolenv: {
      id: 0,
      producto: "",
      unidad_medida: "",
      cantidad: 0,
      fecha_pedido: "",
    },

    showDialogPD: false,
    AcceptPD: false,
    DeclinePD: false,
  }),

  actions: {
    // Resetear Variable Temporal
    resetTempSolicitud() {
      this.tempSolenv = {
        producto: "",
        unidad_medida: "",
        cantidad: 0,
        fecha_pedido: "",
      };
    },

    // Obtener todas las solicitudes enviadas
    async listSolicitud() {
      this.loading = true;
      try {
        const url = "/api/v1/solicitudmedicamentos";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.solicitudrecibida = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Solicitudrecibida-Store.js:99 ~ listSolicitud ~ error:",
          error
        );
      }
    },

    // Crear una nueva solicitud enviada
    async createSolicitud() {
      try {
        const url = "/api/v1/solicitudmedicamentos";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempSolenv, {
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
          await this.listSolicitud();
          this.showDialogPD = false;
          this.resetTempSolicitud();
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

    // Obtener los detalles de una solicitud enviada por ID
    async retrieveSolicitud(id_ped) {
      try {
        this.loading = true;
        const url = `/api/v1/solicitudmedicamentos/${id_ped}/`;
        const response = await api.get(url);
        console.log("Response: ", response.statusText);
        this.loading = false;
      } catch (error) {
        console.log("Error: ", error.response.data);
      }
    },

    // Eliminar una solicitud enviada por ID
    async destroySolicitud(id_ped) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar este pedido?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/api/v1/solicitudmedicamentos/${id_ped}/`;
          const response = await api.delete(url);
          if (response.status === 204) {
            console.log("Status: ", response.statusText);
            Notify.create({
              color: "positive",
              message: "Eliminado con éxito",
              position: "bottom",
              progress: true,
              icon: "check",
            });
          }
          await this.listSolicitud();
        });
      } catch (error) {
        console.log("Code: ", error);
        Notify.create({
          color: "negative",
          message: "Hubo un error al eliminar",
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },
    // Rechazar una solicitud enviada por ID
    async declineSolicitud(id_ped) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Rechazar</span>',
          message: "¿Estás seguro de que deseas rechazar este pedido?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const response = this.DeclinePD.id_ped;
          if (response.status === 204) {
            console.log("Status: ", response.statusText);
            Notify.create({
              color: "positive",
              message: "Pedido rechazado con éxito",
              position: "bottom",
              progress: true,
              icon: "check",
            });
          }
          await this.listSolicitud();
        });
      } catch (error) {
        console.log("Code: ", error);
        Notify.create({
          color: "negative",
          message: "Hubo un error al rechazar el pedido",
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },
  },
});
