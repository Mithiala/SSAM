import { defineStore, getActivePinia } from "pinia";
import { Notify, Dialog, LocalStorage } from "quasar";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("Auth", {
  state: () => ({
    access: "",
    refresh: "",
    isAuthenticated: false,

    me: {
      id: 0,
      avatar: "",
      username: "",
      especialidad: "",
      centro_pertenece: 0,
      grupo: "",
      last_login: "",
      is_staff: Boolean,
      is_active: Boolean,
    },

    loginForm: {
      username: "",
      password: "",
    },

    users: [],
    loading: false,

    tempUser: {
      id: 0,
      avatar: new File([], ""),
      username: "",
      especialidad: "",
      centro_pertenece: 0,
      password: "",
      re_password: "",
      oldPassword: "",
      is_staff: false,
      is_active: true,
      grupo: "",
    },
    changeAvatar: false,
    changeAvatarL: false,
    changePassword: false,
    changePass: false,
    showDialogU: false,
    dialogAvatarLayout: false,
    dialogPasswordLayout: false,
    EditU: false,
    AddU: false,
    ViewU: false,
  }),

  actions: {
    clearTempUser() {
      this.tempUser = {
        id: 0,
        avatar: new File([], ""),
        username: "",
        especialidad: "",
        centro_pertenece: 0,
        password: "",
        re_password: "",
        oldPassword: "",
        is_staff: false,
        is_active: true,
        grupo: "",
      };
    },

    async submitLogin() {
      try {
        const url = "api/jwt/create/";
        const response = await api.post(url, this.loginForm);

        this.access = response.data.access;
        this.refresh = response.data.refresh;
        this.isAuthenticated = true;

        // Guardar los tokens en el almacenamiento local
        LocalStorage.set("access_token", response.data.access);
        LocalStorage.set("refresh_token", response.data.refresh);

        // Obtener el usuario autenticado
        await this.fetchUserAuth();

        Notify.create({
          icon: "las la-sign-in-alt",
          position: "bottom",
          message: `Bienvenido: ${this.me.username}`,
          progress: true,
          color: "positive",
        });

        this.loginForm.username = "";
        this.loginForm.password = "";
      } catch (error) {
        console.log(
          "🚀 ~ file: Auth-Store.js:102 ~ submitLogin ~ error:",
          error.response.data.detail
        );

        let errorMessage = error.response.data.detail;

        Notify.create({
          icon: "las la-exclamation-circle",
          position: "bottom",
          progress: true,
          message: errorMessage,
          color: "negative",
        });
      } finally {
        this.router.push("/");
      }
    },

    async fetchUserAuth() {
      try {
        const url = "auth/users/me/";
        const access_token = LocalStorage.getItem("access_token");

        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (response.status === 200) {
          await this.retrieveUser(response.data.id);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: Auth-Store.js:133 ~ fetchUserAuth ~ error:",
          error.response.data.detail
        );
      }
    },

    async refreshToken() {
      try {
        const url = "api/jwt/refresh/";
        const refresh_token = LocalStorage.getItem("refresh_token");
        const response = await api.post(url, {
          refresh: refresh_token,
        });
        if (response.status === 200) {
          LocalStorage.set("access_token", response.data.access);
          LocalStorage.set("refresh_token", response.data.refresh);
          this.access = response.data.access;
          this.refresh = response.data.refresh;
          this.isAuthenticated = true;
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: Auth-Store.js:157 ~ refreshToken ~ error:",
          error.response.data.detail
        );
        Notify.create({
          icon: "las la-exclamation-circle",
          position: "bottom",
          progress: true,
          message: error.response.data.detail,
          color: "negative",
        });
        this.isAuthenticated = false;
        this.router.push("/login");
      }
    },

    async verifyToken() {
      const storedAccess_token = LocalStorage.getItem("access_token");
      const storedRefreshToken = LocalStorage.getItem("refresh_token");

      if (!storedAccess_token || !storedRefreshToken) {
        this.isAuthenticated = false;
        Notify.create({
          icon: "las la-exclamation-circle",
          position: "bottom",
          progress: true,
          message: "El Usuario no esta Autenticado:",
          color: "negative",
        });
        this.router.push("/login");
        return;
      }
      try {
        const url = "api/jwt/verify/";
        const response = await api.post(url, {
          token: storedAccess_token,
        });

        if (response.status === 200) {
          await this.fetchUserAuth();
          this.isAuthenticated = true;
        } else {
          console.log(
            "🚀 ~ file: Auth-Store.js:194 ~ verifyToken ~ response:",
            response
          );
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: Auth-Store.js:197 ~ verifyToken ~ error:",
          error.response.data.detail
        );

        if (error.response.status === 401) {
          await this.refreshToken();
          if (this.isAuthenticated) {
            await this.fetchUserAuth();
          }
        } else {
          Notify.create({
            icon: "las la-exclamation-circle",
            position: "bottom",
            progress: true,
            message: error.response.data.detail,
            color: "negative",
          });
          this.router.push("/login");
        }
      }
    },

    async submitlogout() {
      const pinia = getActivePinia();
      LocalStorage.clear();
      await this.router.push("/login");
      pinia._s.forEach((store) => store.$reset());
    },

    // -----------------------------
    async listUsers() {
      try {
        this.loading = true;
        const url = "auth/users/";
        const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.users = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log("Code: ", error.code);
        console.log("Mensaje : ", error.response.data.detail);
      }
    },

    async createUser() {
      try {
        const url = "auth/users/";
        const token = LocalStorage.getItem("access_token");
        const request = {
          username: this.tempUser.username,
          password: this.tempUser.password,
          re_password: this.tempUser.re_password,
        };
        const response = await api.post(url, request, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          Notify.create({
            color: "positive",
            message: `Usuario ${response.data.username} registrado exitosamente`,
            position: "bottom",
            progress: true,
            icon: "check",
          });
          await this.listUsers();
          this.showDialogU = false;
          this.clearTempUser();
        }
      } catch (error) {
        console.log("Code: ", error.code);
        console.log("responseText : ", error.request.responseText);

        let errorMessage = "";

        for (const field in error.response.data) {
          if (error.response.data.hasOwnProperty(field)) {
            errorMessage += `${field}: ${error.response.data[field].join(
              ", "
            )} `;
          }
        }

        Notify.create({
          color: "negative",
          message: errorMessage,
          position: "top",
          icon: "report_problem",
        });
      }
    },

    async retrieveUser(id) {
      try {
        const url = `auth/users/${id}/`;
        const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.me = response.data;
      } catch (error) {
        console.log("retrieveUser error.code: ", error.code);
        console.log("retrieveUser error.detail ", error.response.data.detail);
      }
    },

    async updateUser(id) {
      try {
        const url = `auth/users/${id}/`;
        const token = LocalStorage.getItem("access_token");

        const request = {
          username: this.tempUser.username,
          metropropio: this.tempUser.metropropio
            ? this.tempUser.metropropio.value
            : null,
          grupo: this.tempUser.grupo,
          is_staff: this.tempUser.is_staff,
          is_active: this.tempUser.is_active,
        };

        const response = await api.patch(url, request, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          Notify.create({
            color: "positive",
            message: "Actualizado con éxito",
            position: "bottom",
            progress: true,
            icon: "check",
          });
        }
        await this.listUsers();
        this.showDialogU = false;
        this.clearTempUser();
      } catch (error) {
        console.log("Code: ", error);
        console.log("responseText : ", error.request.responseText);

        let errorMessage = "";

        for (const field in error.response.data) {
          if (error.response.data.hasOwnProperty(field)) {
            errorMessage += `${field}: ${error.response.data[field].join(
              ", "
            )} `;
          }
        }

        Notify.create({
          color: "negative",
          message: errorMessage,
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    async updateAvatar(id) {
      try {
        const url = `auth/users/${id}/`;
        const token = LocalStorage.getItem("access_token");

        const formData = new FormData();
        if (this.tempUser.avatar.size > 0) {
          formData.append("avatar", this.tempUser.avatar);
        }
        const response = await api.patch(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          Notify.create({
            color: "positive",
            message: "Actualizado con éxito",
            position: "bottom",
            progress: true,
            icon: "check",
          });
        }
        await this.listUsers();
        this.showDialogU = false;
        this.changeAvatar = false;
        this.dialogAvatarLayout = false;
        this.clearTempUser();
      } catch (error) {
        console.log("Code updateAvatar: ", error);
        console.log("responseText : ", error.request.responseText);

        let errorMessage = "";

        for (const field in error.response.data) {
          if (error.response.data.hasOwnProperty(field)) {
            errorMessage += `${field}: ${error.response.data[field].join(
              ", "
            )} `;
          }
        }

        Notify.create({
          color: "negative",
          message: errorMessage,
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    async updatePassword() {
      try {
        this.loading = true;
        const url = `/auth/change-password/`;
        const token = LocalStorage.getItem("access_token");

        const request = {
          user_id: this.tempUser.id,
          new_password: this.tempUser.password,
        };

        const response = await api.post(url, request, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          Notify.create({
            color: "positive",
            message: response.data.message,
            position: "bottom",
            progress: true,
            icon: "check",
          });
        }
        this.changePassword = false;
        this.loading = false;
      } catch (error) {
        console.log("Code: ", error.code);
        console.log("Mensaje : ", error.response.data.detail);
      }
    },

    async set_password() {
      try {
        this.loading = true;
        const url = `/auth/users/set_password/`;
        const token = LocalStorage.getItem("access_token");

        const request = {
          current_password: this.tempUser.oldPassword,
          new_password: this.tempUser.password,
        };

        const response = await api.post(url, request, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 204) {
          Notify.create({
            color: "positive",
            message: "Contraseña actualizada correctamente",
            position: "bottom",
            progress: true,
            icon: "check",
          });
        }

        this.loading = false;
      } catch (error) {
        console.log("Code: ", error.response.data);
        let errorMessage = "";

        for (const field in error.response.data) {
          if (error.response.data.hasOwnProperty(field)) {
            errorMessage += error.response.data[field]
              .map((message) => `*${message}`)
              .join("<br>");
          }
        }

        Notify.create({
          color: "negative",
          message: errorMessage,
          position: "bottom",
          html: true,
          progress: true,
          icon: "report_problem",
        });
      }
    },

    async destroyUser(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el usuario?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `auth/users/${id}/`;
          const token = LocalStorage.getItem("access_token");

          const response = await api.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response) {
            Notify.create({
              message: "Eliminado con éxito",
              icon: "check",
              color: "positive",
              position: "bottom",
              progress: true,
            });
          }
          await this.listUsers();
        });
      } catch (error) {
        Notify.create({
          message: "Error al eliminar",
          icon: "times",
          color: "negative",
          position: "bottom",
          progress: true,
        });
      }
    },
  },
  persist: false,
});
