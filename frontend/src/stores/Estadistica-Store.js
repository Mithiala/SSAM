import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useEstadisticaStore = defineStore("Estadistica", {
  state: () => ({
    estadistica: [],
    pacientes: [],
    loading: false,

    tempEstadistica: {
      id: 0,
      protesisdental: false,
      protesisauditiva: false,
      anteojos: false,
      protesisortopedica: false,
      sillaruedas: false,
      baston: false,
      andador: false,
      colchon: false,
      camaplana: false,
      camafowler: false,
      at_paciente: 0,
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
    resetTempEstad() {
      console.log("aqui receteo");
      this.tempEstadistica = {
        protesisdental: false,
        protesisauditiva: false,
        anteojos: false,
        protesisortopedica: false,
        sillaruedas: false,
        baston: false,
        andador: false,
        colchon: false,
        camaplana: false,
        camafowler: false,
        at_paciente: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listEstad() {
      this.loading = true;
      try {
        const url = "/tsocial/atecnica/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.estadistica = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Estadistica-Store.js:99 ~ listEstad ~ error:",
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
    async createEstad() {
      try {
        const url = "/tsocial/atecnica/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("protesisdental", this.tempEstadistica.protesisdental);
        formData.append("protesisauditiva", this.tempEstadistica.protesisauditiva);
        formData.append("anteojos", this.tempEstadistica.anteojos);
        formData.append("protesisortopedica", this.tempEstadistica.protesisortopedica);
        formData.append("sillaruedas", this.tempEstadistica.sillaruedas);
        formData.append("baston", this.tempEstadistica.baston);
        formData.append("andador", this.tempEstadistica.andador);
        formData.append("colchon", this.tempEstadistica.colchon);
        formData.append("camaplana", this.tempEstadistica.camaplana);
        formData.append("camafowler", this.tempEstadistica.camafowler);
        formData.append("at_paciente", this.tempEstadistica.at_paciente.value);
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
          await this.listEstad();
          this.showDialogDG = false;
          this.resetTempEstad();
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
    async retrieveEstad(id) {
      try {
        this.loading = true;
        const url = `/tsocial/atecnica/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Estadistica-Store.js:130 ~ retrieveEstad ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Estadistica-Store.js:132 ~ retrieveEstad ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateEstad(id) {
      try {
        const url = `/tsocial/atecnica/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          protesisdental: this.tempEstadistica.protesisdental,
          protesisauditiva: this.tempEstadistica.protesisauditiva,
          anteojos: this.tempEstadistica.anteojos,
          protesisortopedica: this.tempEstadistica.protesisortopedica,
          sillaruedas: this.tempEstadistica.sillaruedas,
          baston: this.tempEstadistica.baston,
          andador: this.tempEstadistica.andador,
          colchon: this.tempEstadistica.colchon,
          camaplana: this.tempEstadistica.camaplana,
          camafowler: this.tempEstadistica.camafowler,
          at_paciente: this.tempEstadistica.at_paciente,
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
            "🚀 ~ file: Discapacidad-Store.js:171 ~ updateDiscap ~ response:",
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
        await this.listEstad();
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

    async destroyEstad(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/tsocial/atecnica/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Estadistica-Store.js:214 ~ destroyEstad ~ response:",
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
          await this.listEstad();
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
