import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useNomenclatorStore = defineStore("Nomenclator", {
  state: () => ({
    loading: false,
    nomestadomental: [],
    nomorientemporal: [],
    nomorientespacial: [],
    nomfijacion: [],
    nommemoria: [],
    nomlenguaje: [],
    nomnormal: [],
    nomatencalculo: [],
    nomdepmoderada: [],
    nomdepsevera: [],
    nomnodepresion: [],
    nomalgveces: [],
    nomfrecuente: [],
    nomsiempre: [],
    nomnunca: [],
    nomincontinencia: [],
    nommovilidad: [],
    nomactividad: [],
    nomestadogeneral: [],
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

    //TODO: Accion para Obtener nomfijacion
    async listnomfijacionl() {
      this.loading = true;
      try {
        const url = "/psicologia/nomfijacion/";
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
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomfijacionl ~ error:",
          error.response
        );
      }
    },

    //TODO: Accion para Obtener nommemoria
    async listnommemoria() {
      this.loading = true;
      try {
        const url = "/psicologia/nommemoria/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nommemoria = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnommemoria ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomlenguaje
    async listnomlenguaje() {
      this.loading = true;
      try {
        const url = "/psicologia/nomlenguaje/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomlenguaje = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomlenguaje ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomnormal
    async listnomnormal() {
      this.loading = true;
      try {
        const url = "/psicologia/nomnormal/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomnormal = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomnormal ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomatencalculo
    async listnomatencalculo() {
      this.loading = true;
      try {
        const url = "/psicologia/nomatencalculo/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomatencalculo = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomatencalculo ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomdepmoderada
    async listnomdepmoderada() {
      this.loading = true;
      try {
        const url = "/psicologia/nomdepmoderadatemporal/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomdepmoderada = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomdepmoderada ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomdepsevera
    async listnomdepsevera() {
      this.loading = true;
      try {
        const url = "/psicologia/nomdepsevera/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomdepsevera = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomdepsevera ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomnodepresion
    async listnomnodepresion() {
      this.loading = true;
      try {
        const url = "/psicologia/nomnodepresion/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomnodepresion = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomnodepresion ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomalgveces
    async listnomalgveces() {
      this.loading = true;
      try {
        const url = "/psicologia/nomalgveces/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomalgveces = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomalgveces ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomfrecuente
    async listnomfrecuente() {
      this.loading = true;
      try {
        const url = "/psicologia/nomfrecuente/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomfrecuente = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomfrecuente ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomsiempre
    async listnomsiempre() {
      this.loading = true;
      try {
        const url = "/psicologia/nomsiempre/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomsiempre = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomsiempre ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomnunca
    async listnomnunca() {
      this.loading = true;
      try {
        const url = "/psicologia/nomnunca/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomnunca = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomnunca ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomincontinencia
    async listnomincontinencia() {
      this.loading = true;
      try {
        const url = "/asistmedica/nomincontinencia/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomincontinencia = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomincontinencia ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nommovilidad
    async listnommovilidad() {
      this.loading = true;
      try {
        const url = "/asistmedica/nommovilidad/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nommovilidad = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnommovilidad ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomactividad
    async listnomactividad() {
      this.loading = true;
      try {
        const url = "/asistmedica/nomactividad/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomactividad = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomactividad ~ error:",
          error.response
        );
      }
    },
    //TODO: Accion para Obtener nomestadogeneral
    async listnomestadogeneral() {
      this.loading = true;
      try {
        const url = "/asistmedica/nomestadogeneral/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.nomestadogeneral = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Nomenclator-Store.js:27 ~ listnomestadogeneral ~ error:",
          error.response
        );
      }
    },
  },
});
