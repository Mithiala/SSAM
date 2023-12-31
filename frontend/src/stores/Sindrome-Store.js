import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useSindromeStore = defineStore("Sindrome", {
  state: () => ({
    sindrome: [],
    loading: false,

    tempSindrome: {
      id: 0,
      cant_ira: 0,
      fecha: "",
      cant_neumonias: 0,
      cant_covid: 0,
      cant_eda: 0,
      cant_escabiosis: 0,
      cant_micosis: 0,
      cant_hta: 0,
      cant_diabetes: 0,
      otras: "",
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempSindromes() {
      console.log("aqui receteo");
      this.tempSindrome = {
        cant_ira: 0,
        cant_neumonias: 0,
        fecha: "",
        cant_covid: 0,
        cant_eda: 0,
        cant_escabiosis: 0,
        cant_micosis: 0,
        cant_hta: 0,
        cant_diabetes: 0,
        otras: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listSindromes() {
      this.loading = true;
      try {
        const url = "/asistmedica/sindromes/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.sindrome = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Sindrome-Store.js:99 ~ listSindromes ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createSindromes() {
      try {
        const url = "/asistmedica/sindromes/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("cant_ira", this.tempSindrome.cant_ira);
        formData.append("fecha", this.tempSindrome.fecha);
        formData.append("cant_neumonias", this.tempSindrome.cant_neumonias);
        formData.append("cant_covid", this.tempSindrome.cant_covid);
        formData.append("cant_eda", this.tempSindrome.cant_eda);
        formData.append("cant_micosis", this.tempSindrome.cant_micosis);
        formData.append("cant_escabiosis", this.tempSindrome.cant_escabiosis);
        formData.append("cant_hta", this.tempSindrome.cant_hta);
        formData.append("cant_diabetes", this.tempSindrome.cant_diabetes);
        formData.append("otras", this.tempSindrome.otras);
        const response = await api.post(url, this.tempSindrome, {
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
          await this.listSindromes();
          this.showDialogDG = false;
          this.resetTempSindromes();
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
    async retrieveSindromes(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/sindromes/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Sindrome-Store.js:130 ~ retrieveSindromes ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Sindrome-Store.js:132 ~ retrieveSindromes ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateSindromes(id) {
      try {
        const url = `/asistmedica/sindromes/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          cant_ira: this.tempSindrome.cant_ira,
          cant_neumonias: this.tempSindrome.cant_neumonias,
          cant_covid: this.tempSindrome.cant_covid,
          cant_eda: this.tempSindrome.cant_eda,
          cant_escabiosis: this.tempSindrome.cant_escabiosis,
          cant_micosis: this.tempSindrome.cant_micosis,
          cant_hta: this.tempSindrome.cant_hta,
          cant_diabetes: this.tempSindrome.cant_diabetes,
          otras: this.tempSindrome.otras,
          fecha: this.tempSindrome.fecha,
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
            "🚀 ~ file: Sindrome-Store.js:171 ~ updateSindromes ~ response:",
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
        await this.listSindromes();
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

    async destroySindromes(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/sindromes/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Sindrome-Store.js:214 ~ destroySindromes ~ response:",
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
          await this.listSindromes();
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
