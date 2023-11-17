import { defineStore } from "pinia";
import { Notify, Dialog } from "quasar";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("Auth", {
  state: () => ({
    token: "",
    isAuthenticated: false,
    me: {},

    loginForm: {
      identity: "",
      password: "",
    },
    registerForm: {
      nombre_esp: "",
      especialidad: "",
      username: "",
      centro: "",
      password: "",
      passwordConfirm: "",
      rol: "",
      avatar: null,
      activo: false,
    },

    usuarios: [],
    tempUsuario: {
      avatar: null,
      nombre_esp: "",
      especialidad: "",
      username: "",
      centro_pertenece: "",
      oldPassword: "",
      password: "",
      passwordConfirm: "",
      rol: "",
      activo: false,
    },
    changePass: false,
    showDialogU: false,
    EditU: false,
    AddU: false,
    ViewU: false,
  }),

  actions: {
    async submitLogin() {
      try {
        const pb = new api("http://127.0.0.1:3333");
        const authData = await pb
          .collection("users")
          .authWithPassword(this.loginForm.identity, this.loginForm.password);
        this.token = pb.authStore.token;
        this.isAuthenticated = true;
        this.me = authData.record;
        console.log("firstData => ", authData);
        Notify.create({
          icon: "las la-fire-alt",
          position: "top-right",
          message: `Bienvenido ${this.me.username}`,
          color: "success",
        });
        this.loginForm.identity = "";
        this.loginForm.password = "";
        this.router.push("/");
      } catch (error) {
        Notify.create({
          icon: "las la-exclamation-circle",
          position: "top-right",
          message:
            "Usuario o Contraseña incorrectas, por favor, introduzca sus credenciales correctas.",
          color: "negative",
        });
        console.log(error);
      }
    },

    async refreshAuth() {
      //Con redirrecion si no estas logeado
      try {
        const token = localStorage.getItem("api_auth");
        if (!token) {
          console.log(
            "Token de autenticación no encontrado. Redirigiendo a la página de inicio de sesión..."
          );
          this.router.push("/login");
          return;
        }
        const pb = new api("http://127.0.0.1:3333");
        const authData = await pb.collection("users").authRefresh();
        console.log("Auth data:", authData);
        this.token = pb.authStore.token;
        this.isAuthenticated = true;
        this.me = authData.record;
      } catch (error) {
        console.log("Error al renovar la autenticación:", error);
        console.log("Redirigiendo a la página de inicio de sesión...");
        this.router.push("/login");
      }
    },

    async submitlogout() {
      const pb = new api("http://127.0.0.1:3333");
      pb.authStore.clear();
      this.token = "";
      this.isAuthenticated = false;
      this.me = {};
    },

    async submitRegister() {
      try {
        const pb = new api("http://127.0.0.1:3333");
        const formData = new FormData();
        formData.append("nombre_esp", this.registerForm.nombre_esp);
        formData.append("especialidad", this.registerForm.especialidad);
        formData.append("username", this.registerForm.username);
        formData.append("centro", this.registerForm.centro);
        formData.append("password", this.registerForm.password);
        formData.append("passwordConfirm", this.registerForm.passwordConfirm);
        formData.append("rol", this.registerForm.rol);
        formData.append("avatar", this.registerForm.avatar);
        formData.append("activo", this.registerForm.activo);
        const response = await pb.collection("usuarios").create(formData);

        if (response) {
          console.log("Registro exitoso!");
          console.log("Respuesta => ", response);
          Notify.create({
            color: "positive",
            message: `Usuario ${this.registerForm.username} registrado exitosamente`,
            position: "top",
            icon: "check",
          });
          this.loginForm.identity = this.registerForm.username;
          this.loginForm.password = this.registerForm.password;
          this.registerForm.nombre_esp = "";
          this.registerForm.especialidad = "";
          this.registerForm.username = "";
          this.registerForm.centro = "";
          this.registerForm.password = "";
          this.registerForm.passwordConfirm = "";
          this.registerForm.rol = "";
          this.registerForm.avatar = null;
          this.registerForm.activo = false;
          await this.submitLogin();
          this.router.push("/");
          this.loginForm.identity = "";
          this.loginForm.password = "";
          console.log("Redireccionando a la página principal...");
        }
      } catch (error) {
        console.log("MI ERROR Registro: ", error);
        Notify.create({
          color: "negative",
          message: "Error al registrar usuario",
          position: "top",
          icon: "report_problem",
        });
      }
    },

    // -----------------------------
    async getUsuario() {
      try {
        const pb = new api("http://127.0.0.1:3333");
        const records = await pb.collection("usuarios").getFullList({
          sort: "-created",
        });
        console.log("mi record : ", records);
        this.usuarios = records;
      } catch (error) {
        console.log(error);
      }
    },
    async addUsuario() {
      try {
        const pb = new api("http://127.0.0.1:3333");
        const formData = new FormData();
        formData.append("avatar", this.tempUsuario.avatar);
        formData.append("nombre_esp", this.tempUsuario.nombre_esp);
        formData.append("especialidad", this.tempUsuario.especialidad);
        formData.append("username", this.tempUsuario.username);
        formData.append("centro", this.tempUsuario.centro);
        formData.append("password", this.tempUsuario.password);
        formData.append("passwordConfirm", this.tempUsuario.passwordConfirm);
        formData.append("rol", this.tempUsuario.rol);
        formData.append("activo", this.tempUsuario.activo);
        const createdRecord = await pb.collection("usuarios").create(formData);
        if (createdRecord) {
          console.log("Add exitoso!");
          console.log("Respuesta => ", createdRecord);
          Notify.create({
            color: "positive",
            message: "Agregado con exito",
            position: "top",
            icon: "check",
          });
        }
        await this.getUsers();
        this.showDialogU = false;
      } catch (error) {
        console.log("error add file", error);
        Notify.create({
          message: "Error al agregar",
          icon: "times",
          color: "negative",
        });
      }
    },
    async editUsuario(id) {
      try {
        const pb = new api("http://127.0.0.1:3333");
        const formData = new FormData();
        formData.append("avatar", this.tempUsuario.avatar);
        formData.append("nombre_esp", this.tempUsuario.nombre_esp);
        formData.append("especilaidad", this.tempUsuario.especialidad);
        formData.append("username", this.tempUsuario.username);
        formData.append("centro", this.tempUsuario.centro);
        formData.append("rol", this.tempUsuario.rol);
        formData.append("activo", this.tempUsuario.activo);
        if (this.changePass === true) {
          formData.append("oldPassword", this.tempUsuario.oldPassword);
          formData.append("password", this.tempUsuario.password);
          formData.append("passwordConfirm", this.tempUsuario.passwordConfirm);
        }
        const updatedRecord = await pb.collection("usuarios").update(id_esp, formData);
        if (updatedRecord) {
          console.log("Update exitoso!");
          console.log("Respuesta => ", updatedRecord);
          Notify.create({
            color: "positive",
            message: "Actualizado con exito",
            position: "top",
            icon: "check",
          });
        }
        await this.getUsuario();
        this.showDialogU = false;
      } catch (error) {
        Notify.create({
          message: "Error al actualizar",
          icon: "times",
          color: "negative",
        });
      }
    },
    async deleteUsuario(id_esp) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Desactivadoliminar</span>',
          message: "Estas seguro que deseas desactivar el usuario",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const pb = new api("http://127.0.0.1:3333");
          await pb.collection("usuario").put(id_esp);
          Notify.create({
            message: "Desactivado con exito",
            icon: "check",
            color: "positive",
          });
          await this.getUsuario();
        });
      } catch (error) {
        Notify.create({
          message: "Error al descativar",
          icon: "times",
          color: "negative",
        });
      }
    },
  },
});
