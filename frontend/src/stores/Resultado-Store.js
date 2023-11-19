import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useResultadoStore = defineStore("Resultado", {
  state: () => ({
    resultado: [],
    pacientes: [],
    loading: false,

    tempResultado: {
      id: 0,
      depresion: 0,
      intentosuicida: 0,
      demencia: 0,
      normales: 0,
      resul_paciente: 0,
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
    resetTempResult() {
      console.log("aqui receteo");
      this.tempResultado = {
        depresion: 0,
        intentosuicida: 0,
        demencia: 0,
        normales: 0,
        resul_paciente: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listResult() {
      this.loading = true;
      try {
        const url = "/psicologia/resultado/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.resultado = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Resultado-Store.js:99 ~ listResult ~ error:",
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
    async createResult() {
      try {
        const url = "/psicologia/resultado/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("depresion", this.tempResultado.depresion);
        formData.append("intentosuicida", this.tempResultado.intentosuicida);
        formData.append("demencia", this.tempResultado.demencia);
        formData.append("normales", this.tempResultado.normales);
        formData.append("resul_paciente", this.tempResultado.resul_paciente.value);
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
          await this.listResult();
          this.showDialogDG = false;
          this.resetTempResult();
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
    async retrieveResult(id) {
      try {
        this.loading = true;
        const url = `/psicologia/resultado/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Resultado-Store.js:130 ~ retrieveResult ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Resultado-Store.js:132 ~ retrieveResult ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateResult(id) {
      try {
        const url = `/psicologia/resultado/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          depresion: this.tempResultado.depresion,
          intentosuicida: this.tempResultado.intentosuicida,
          demencia: this.tempResultado.demencia,
          normales: this.tempResultado.normales,
          resul_paciente: this.tempResultado.resul_paciente,
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
            "🚀 ~ file: Resultado-Store.js:171 ~ updateResult ~ response:",
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
        await this.listResult();
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

    async destroyResult(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/psicologia/resultado/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Resultado-Store.js:214 ~ destroyResult ~ response:",
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
          await this.listResult();
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
