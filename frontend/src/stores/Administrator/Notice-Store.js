import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { api } from "src/boot/axios";
import { Dialog } from "quasar";

import { useAuthStore } from "./Auth-Store";

export const useNoticeStore = defineStore("Notice", {
  state: () => ({
    notifications: [],
    count: 0,

    recibe: 0,
    loading: false,
    baseURL: "",
  }),

  getters: {
    // Crea un getter para la URL basada en los filtros
    getFilteredURL() {
      this.baseURL = "messages/notice/";
      const AuthStore = useAuthStore();

      const queryParams = [];
      if (AuthStore.isAuthenticated) {
        queryParams.push(`recibe=${AuthStore.me.id}`);
      }
      // Construye la URL final con los parámetros
      if (queryParams.length > 0) {
        return `${this.baseURL}?${queryParams.join("&")}`;
      } else {
        return this.baseURL;
      }
    },
  },

  actions: {
    //TODO: Accion para Obtener Notificaciones
    async listNotice() {
      this.loading = true;
      try {
        const token = LocalStorage.getItem("access_token");
        const apiUrl = this.getFilteredURL;
        const response = await api.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.count = response.data.count;
        this.notifications = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Notice-Store.js:51 ~ listNotice ~ error:",
          error.response.data
        );
      }
    },

    //TODO: Accion para crear Notificaciones
    async createNotice(msg) {
      try {
        const AuthStore = useAuthStore();
        const url = "messages/notice/";
        const token = LocalStorage.getItem("access_token");

        const request = {
          content: msg,
          recibe: this.recibe,
          envia: AuthStore.me.id,
        };

        await api.post(url, request, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await this.listNotice();
      } catch (error) {
        console.log(
          "🚀 ~ file: Notice-Store.js:73 ~ createMessages ~ error:",
          error.response.data
        );
      }
    },

    //TODO: Accion para Eliminar Notificaciones
    async destroyNotice(id) {
      try {
        const url = `messages/notice/${id}/`;
        const token = LocalStorage.getItem("access_token");
        await api.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await this.listNotice();
      } catch (error) {
        console.log(
          "🚀 ~ file: Notice-Store.js:92 ~ destroyNotice ~ error:",
          error.response.data
        );
      }
    },

    async CleanNotice() {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Advertencia!</span>',
          message: "Estás seguro que deseas limpiar las notificaciones?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const token = LocalStorage.getItem("access_token");
          const ids = this.notifications.map((item) => item.id);
          for (const id of ids) {
            const url = `messages/notice/${id}/`;
            await api.delete(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          }
          await this.listNotice();
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: Notice-Store.js:120 ~ CleanNotice ~ error:",
          error.response.data
        );
      }
    },
  },
});
