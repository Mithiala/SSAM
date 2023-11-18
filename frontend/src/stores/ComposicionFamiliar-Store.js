import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useComposicionFamiliarStore = defineStore("ComposicionFamiliar", {
  state: () => ({
    composicionfamiliar: [],
    pacientes: [],
    loading: false,

    tempFamiliar: {
      id: 0,
      nombre: "",
      edad: 0,
      parentesco: "",
      telefono: 0,
      direc_part: "",
      estado_civil:"",
      escolaridad: "",
      ocupacion: "",
      ingreso_economico: "",
      cf_paciente: 0,
    },

    tempPaciente: {
      image: "",
      nombre: "",
      recibevisita: false,
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempFamiliares() {
      console.log("aqui receteo");
      this.tempFamiliar = {
        nombre: "",
        edad: 0,
        parentesco: "",
        telefono: 0,
        direc_part: "",
        estado_civil:"",
        escolaridad: "",
        ocupacion: "",
        ingreso_economico: "",
        cf_paciente: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listFamiliares() {
      this.loading = true;
      try {
        const url = "/tsocial/cfamiliar/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.composicionfamiliar = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: ComposicionFamiliar-Store.js:99 ~ listFamiliares ~ error:",
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
    async createFamiliares() {
      try {
        const url = "/tsocial/cfamiliar/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("nombre", this.tempFamiliar.nombre);
        formData.append("edad", this.tempFamiliar.edad);
        formData.append("telefono", this.tempFamiliar.telefono);
        formData.append("parentesco", this.tempFamiliar.parentesco);
        formData.append("direc_part", this.tempFamiliar.direc_part);
        formData.append("estado_civil", this.tempFamiliar.estado_civil);
        formData.append("escolaridad", this.tempFamiliar.escolaridad);
        formData.append("ocupacion", this.tempFamiliar.ocupacion);
        formData.append("ingreso_economico", this.tempFamiliar.ingreso_economico);
        formData.append("cf_paciente", this.tempFamiliar.cf_paciente.value);
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
          await this.listFamiliares();
          this.showDialogDG = false;
          this.resetTempFamiliares();
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
    async retrieveFamiliares(id) {
      try {
        this.loading = true;
        const url = `/tsocial/cfamiliar/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: ComposicionFamiliar-Store.js:130 ~ retrieveFamiliares ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: ComposicionFamiliar-Store.js:132 ~ retrieveFamiliares ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateFamiliares(id) {
      try {
        const url = `/tsocial/cfamiliar/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          nombre: this.tempFamiliar.nombre,
          edad: this.tempFamiliar.edad,
          parentesco: this.tempFamiliar.parentesco,
          telefono: this.tempFamiliar.telefono,
          direc_part: this.tempFamiliar.direc_part,
          estado_civil: this.tempFamiliar.estado_civil,
          escolaridad: this.tempFamiliar.escolaridad,
          ocupacion: this.tempFamiliar.escolaridad,
          ingreso_economico: this.tempFamiliar.ingreso_economico,
          cf_paciente: this.tempFamiliar.cf_paciente,
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
            "🚀 ~ file: ComposicionFamiliar-Store.js:171 ~ updateFamiliares ~ response:",
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
        await this.listFamiliares();
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

    async destroyFamiliares(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/tsocial/cfamiliar/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: ComposicionFamiliar-Store.js:214 ~ destroyFamiliares ~ response:",
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
          await this.listFamiliares();
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
