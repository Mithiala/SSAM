import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useDiscapacidadStore = defineStore("Discapacidad", {
  state: () => ({
    discapacidad: [],
    pacientes: [],
    loading: false,

    tempdiscapacidad: {
      id: 0,
      motora: false,
      auditiva: false,
      visual: false,
      intelectual: false,
      sensorial: false,
      mixta: false,
      psicopatia: false,
      inconturinaria: false,
      incontfecal: false,
      incontmixta: false,
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
    resetTempDiscap() {
      console.log("aqui receteo");
      this.tempdiscapacidad = {
        motora: false,
        auditiva: false,
        visual: false,
        intelectual: false,
        sensorial: false,
        mixta: false,
        psicopatia: false,
        inconturinaria: false,
        incontfecal: false,
        incontmixta: false,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listDiscap() {
      this.loading = true;
      try {
        const url = "/tsocial/discapacidades/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.discapacidad = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Discapacidad-Store.js:99 ~ listDiscap ~ error:",
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
    async createDiscap() {
      try {
        const url = "/tsocial/discapacidades/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempdiscapacidad, {
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
          await this.listDiscap();
          this.showDialogDG = false;
          this.resetTempDiscap();
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
    async retrieveDiscap(id) {
      try {
        this.loading = true;
        const url = `/tsocial/discapacidades/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Discapacidad-Store.js:130 ~ retrieveDiscap ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Discapacidad-Store.js:132 ~ retrieveDiscap ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateDiscap(id) {
      try {
        const url = `/tsocial/discapacidades/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          motora: this.tempdiscapacidad.motora,
          auditiva: this.tempdiscapacidad.auditiva,
          visual: this.tempdiscapacidad.visual,
          intelectual: this.tempdiscapacidad.intelectual,
          sensorial: this.tempdiscapacidad.sensorial,
          mixta: this.tempdiscapacidad.mixta,
          psicopatia: this.tempdiscapacidad.psicopatia,
          inconturinaria: this.tempdiscapacidad.inconturinaria,
          incontfecal: this.tempdiscapacidad.incontfecal,
          incontmixta: this.tempdiscapacidad.incontmixta,
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
        await this.listDiscap();
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

    async destroyDiscap(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/tsocial/discapacidades/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Discapacidad-Store.js:214 ~ destroyDiscap ~ response:",
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
          await this.listDiscap();
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
