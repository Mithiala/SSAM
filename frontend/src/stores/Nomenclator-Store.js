import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useNomenclatorStore = defineStore("Nomenclator", {
  state: () => ({
    loading: false,
    nomestadomental: [],
    nomorientemporal: [],
    nomorientespacial: [],
  }),

  getters: {},

  actions: {
    //TODO: Accion para Obtener nomestadomental
    async listnomestadomental() {
      this.loading = true;
      try {
        const url = "asistmedica/nomestadomental/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomestadomental = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomestadomental ~ error:",
          error.response
        );
      }
    },

    //TODO: Accion para Obtener nomorientemporal
    async listnomorientemporal() {
      this.loading = true;
      try {
        const url = "/psicologia/nomorientemporal/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomorientemporal = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomorientemporal ~ error:",
          error.response
        );
      }
    },

    //TODO: Accion para Obtener nomorientespacial
    async listnomorientespacial() {
      this.loading = true;
      try {
        const url = "/psicologia/nomorientespacial/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomorientespacial = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomorientespacial ~ error:",
          error.response
        );
      }
    },
  },
});
