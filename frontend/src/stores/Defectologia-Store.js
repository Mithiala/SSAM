import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useDefectologiaStore = defineStore("Defectologia", {
  state: () => ({
    defectologia: [],
    loading: false,

    tempDefect: {
      id: null,
      auditivo: false,
      visual: false,
      ecv: false,
      fisicomotora: false,
      retrazomental: "",
      trastornolenguaje: "",
      trastornopensamiento: "",
      d_paciente: null,
      anciedad: false,
      esquizofrenia: false,
      fuma: false,
      alcoholico: false,
      parkinson: false,
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempDef() {
      console.log("aqui receteo");
      this.tempDefect = {
        auditivo: false,
        visual: false,
        ecv: false,
        fisicomotora: false,
        retrazomental: "",
        trastornolenguaje: "",
        trastornopensamiento: "",
        d_paciente: null,
        anciedad: false,
        esquizofrenia: false,
        fuma: false,
        alcoholico: false,
        parkinson: false,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listDef() {
      this.loading = true;
      try {
        const url = "/psicologia/defectoligia/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.defectologia = response.data.results;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Defectologia-Store.js:99 ~ listDef ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createDef() {
      try {
        const url = "/psicologia/defectoligia/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("auditivo", this.tempDefect.auditivo);
        formData.append("visual", this.tempDefect.visual);
        formData.append("ecv", this.tempDefect.ecv);
        formData.append("fisicomotora", this.tempDefect.fisicomotora);
        formData.append("retrazomental", this.tempDefect.retrazomental);
        formData.append("trastornolenguaje", this.tempDefect.trastornolenguaje);
        formData.append("trastornopensamiento", this.tempDefect.trastornopensamiento);
        formData.append("anciedad", this.tempDefect.anciedad);
        formData.append("esquizofrenia", this.tempDefect.esquizofrenia);
        formData.append("fuma", this.tempDefect.fuma);
        formData.append("alcoholico", this.tempDefect.alcoholico);
        formData.append("parkinson", this.tempDefect.parkinson);
        formData.append("d_paciente", this.tempDefect.d_paciente.value);
        const response = await api.post(url, this.tempDefect, {
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
          await this.listDef();
          this.showDialogDG = false;
          this.resetTempAfectiva();
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
    async retrieveDef(id) {
      try {
        this.loading = true;
        const url = `/psicologia/defectoligia/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Defectologia-Store.js:130 ~ retrieveDef ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Defectologia-Store.js:132 ~ retrieveDef ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateDef(id) {
      try {
        const url = `/psicologia/defectoligia/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          auditivo: this.tempDefect.auditivo,
          visual: this.tempDefect.visual,
          ecv: this.tempDefect.ecv,
          fisicomotora: this.tempDefect.fisicomotora,
          retrazomental: this.tempDefect.retrazomental,
          trastornolenguaje: this.tempDefect.trastornolenguaje,
          trastornopensamiento: this.tempDefect.trastornopensamiento,
          d_paciente: this.tempDefect.d_paciente,
          anciedad: this.tempDefect.anciedad,
          esquizofrenia: this.tempDefect.esquizofrenia,
          fuma: this.tempDefect.fuma,
          alcoholico: this.tempDefect.alcoholico,
          parkinson: this.tempDefect.parkinson,
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
            "🚀 ~ file: Defectologia-Store.js:171 ~ updateDef ~ response:",
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
        await this.listCog();
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

    async destroyDef(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/psicologia/defectoligia/${id}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Defectologia-Store.js:214 ~ destroyDef ~ response:",
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
          await this.listDef();
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
