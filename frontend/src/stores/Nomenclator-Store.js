import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useNomenclatorStore = defineStore("Nomenclator", {
  state: () => ({
    loading: false,
    nomestadomental: [],
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
      } catch (error) {}
    },
  },
});
