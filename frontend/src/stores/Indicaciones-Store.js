import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useIndicacinesStore = defineStore("Indicaciones", {
  state: () => ({
    indicaciones: [],
    pacientes: [],
    loading: false,

    tempIndi: {
      id_ind: 0,
      calorias: "",
      fecha: "",
      momento: "",
      sig_vitales: "",
      ctrl_peso: "",
      dieta: "",
      evitar_caidas: false,
      glicemia: false,
      ind_glic: "",
      camb_ropa: false,
      analgesicos: "",
      ind_analg: "",
      antiinflamatiorios: "",
      ind_flamat: "",
      antibiotios: "",
      ind_antib: "",
      antidepresivos: "",
      ind_antid: "",
      antihistaminicos:"",
      ind_antis: "",
      anticoagulantes: "",
      ind_antic: "",
      antihipertensivo: "",
      ind_antih: "",
      antidiabeticos: "",
      ind_antidb: "",
      antiepilepticos: "",
      ind_antiep: "",
      antipsicoticos: "",
      ind_antips: "",
      antiansiedad: "",
      ind_antian: "",
      antiparasitario: "",
      ind_antiparas: "",
      antivirales: "",
      ind_antiv: "",
      antiarritmicos: "",
      ind_antia: "",
      broncodilatadores: "",
      ind_bronco: "",
      diureticos: "",
      ind_diur: "",
      relajante_muscular: "",
      ind_rm: "",
      vitaminas: "",
      ind_vit: "",
      sonda: false,
      ind_sonda: "",
      crisis_convul: false,
      restriccion: false,
      oxigenot: false,
      otras_indic: "",
      otros_med: "",
      vasodilatador: "",
      ind_vaso: "",
      estatinas: "",
      ind_est: "",
      acido_dicarb: "",
      ind_acido: "",
      antimicrobiano: "",
      ind_antim: "",
      ind_gener: "",
    },

    tempPaciente: {
      image: "",
      nombre: "",
    },

    showDialogIM: false,
    EditIM: false,
    AddIM: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempIndic() {
      console.log("aqui receteo");
      this.tempIndi = {
        calorias: "",
        fecha: "",
        momento: "",
        sig_vitales: "",
        ctrl_peso: "",
        dieta: "",
        evitar_caidas: false,
        glicemia: false,
        ind_glic: "",
        camb_ropa: false,
        analgesicos: "",
        ind_analg: "",
        antiinflamatiorios: "",
        ind_flamat: "",
        antibiotios: "",
        ind_antib: "",
        antidepresivos: "",
        ind_antid: "",
        antihistaminicos:"",
        ind_antis: "",
        anticoagulantes: "",
        ind_antic: "",
        antihipertensivo: "",
        ind_antih: "",
        antidiabeticos: "",
        ind_antidb: "",
        antiepilepticos: "",
        ind_antiep: "",
        antipsicoticos: "",
        ind_antips: "",
        antiansiedad: "",
        ind_antian: "",
        antiparasitario: "",
        ind_antiparas: "",
        antivirales: "",
        ind_antiv: "",
        antiarritmicos: "",
        ind_antia: "",
        broncodilatadores: "",
        ind_bronco: "",
        diureticos: "",
        ind_diur: "",
        relajante_muscular: "",
        ind_rm: "",
        vitaminas: "",
        ind_vit: "",
        sonda: false,
        ind_sonda: "",
        crisis_convul: false,
        restriccion: false,
        oxigenot: false,
        otras_indic: "",
        otros_med: "",
        vasodilatador: "",
        ind_vaso: "",
        estatinas: "",
        ind_est: "",
        acido_dicarb: "",
        ind_acido: "",
        antimicrobiano: "",
        ind_antim: "",
        ind_gener: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listIndic() {
      this.loading = true;
      try {
        const url = "/api/v1/indicaciones";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.indicaciones = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Indicaciones-Store.js:99 ~ listIndic ~ error:",
          error
        );
      }
    },

    async listPacientes() {
      this.loading = true;
      try {
        const url = "/api/v1/pacientes";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.pacientes = response.data;
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Pacientes-Store.js:99 ~ listPaciente ~ error:",
          error
        );
      }
    },

    //TODO: Accion para crear Registros
    async createIndic() {
      try {
        const url = "/api/v1/indicaciones";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempIndi, {
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
          await this.listIndic();
          this.showDialogIM = false;
          this.resetTempIndic();
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
    async retrieveIndic(id_ind) {
      try {
        this.loading = true;
        const url = `/api/v1/indicaciones/${id_ind}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
           // Authorization: `Bearer ${token}`,
          //},
        });
        console.log(
          "🚀 ~ file: Indicaciones-Store.js:130 ~ retrieveIndic ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Indicaciones-Store.js:132 ~ retrieveIndic ~ error:",
          error.response.data
        );
      }
      },

    //TODO: Accion para modificar un Registro desde un ID
    async updateIndic(id_ind) {
      try {
        const url = `/api/v1/indicaciones/${id_ind}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
          id_ind: this.tempIndi.id_ind,
          calorias: this.tempIndi.calorias,
          fecha: this.tempIndi.fecha,
          momento: this.tempIndi.momento,
          sig_vitales: this.tempIndi.sig_vitales,
          ctrl_peso: this.tempIndi.ctrl_peso,
          dieta: this.tempIndi.dieta,
          evitar_caidas: this.tempIndi.evitar_caidas,
          glicemia: this.tempIndi.glicemia,
          ind_glic: this.tempIndi.ind_glic,
          camb_ropa: this.tempIndi.camb_ropa,
          analgesicos: this.tempIndi.analgesicos,
          ind_analg: this.tempIndi.ind_analg,
          antiinflamatiorios: this.tempIndi.antiinflamatiorios,
          ind_flamat: this.tempIndi.ind_flamat,
          antibiotios: this.tempIndi.antibiotios,
          ind_antib: this.tempIndi.ind_antib,
          antidepresivos: this.tempIndi.antidepresivos,
          ind_antid: this.tempIndi.ind_antib,
          antihistaminicos: this.tempIndi.antihistaminicos,
          ind_antis: this.tempIndi.ind_antis,
          anticoagulantes: this.tempIndi.anticoagulantes,
          ind_antic: this.tempIndi.ind_antic,
          antihipertensivo: this.tempIndi.antihipertensivo,
          ind_antih: this.tempIndi.ind_antih,
          antidiabeticos: this.tempIndi.antidiabeticos,
          ind_antidb: this.tempIndi.ind_antidb,
          antiepilepticos: this.tempIndi.antiepilepticos,
          ind_antiep: this.tempIndi.ind_antiep,
          antipsicoticos: this.tempIndi.antipsicoticos,
          ind_antips: this.tempIndi.ind_antips,
          antiansiedad: this.tempIndi.antiansiedad,
          ind_antian: this.tempIndi.ind_antian,
          antiparasitario: this.tempIndi.antiparasitario,
          ind_antiparas: this.tempIndi.ind_antiparas,
          antivirales: this.tempIndi.antivirales,
          ind_antiv: this.tempIndi.ind_antiv,
          antiarritmicos: this.tempIndi.antiarritmicos,
          ind_antia: this.tempIndi.ind_antia,
          broncodilatadores: this.tempIndi.broncodilatadores,
          ind_bronco: this.tempIndi.ind_bronco,
          diureticos: this.tempIndi.diureticos,
          ind_diur: this.tempIndi.ind_diur,
          relajante_muscular: this.tempIndi.relajante_muscular,
          ind_rm: this.tempIndi.ind_rm,
          vitaminas: this.tempIndi.vitaminas,
          ind_vit: this.tempIndi.ind_vit,
          sonda: this.tempIndi.sonda,
          ind_sonda: this.tempIndi.ind_sonda,
          crisis_convul: this.tempIndi.crisis_convul,
          restriccion: this.tempIndi.restriccion,
          oxigenot: this.tempIndi.oxigenot,
          otras_indic: this.tempIndi.otras_indic,
          otros_med: this.tempIndi.otros_med,
          vasodilatador: this.tempIndi.vasodilatador,
          ind_vaso: this.tempIndi.ind_vaso,
          estatinas: this.tempIndi.estatinas,
          ind_est: this.tempIndi.ind_est,
          acido_dicarb: this.tempIndi.acido_dicarb,
          ind_acido: this.tempIndi.ind_acido,
          antimicrobiano: this.tempIndi.antimicrobiano,
          ind_antim: this.tempIndi.ind_antim,
          ind_gener: this.tempIndi.ind_gener,
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
            "🚀 ~ file: Indicaciones-Store.js:171 ~ updateIndic ~ response:",
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
        await this.listIndic();
        this.showDialogIM = false;
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

    async destroyIndic(id_ind) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/api/v1/indicaciones/${id_ind}/`;
          //const token = LocalStorage.getItem("access_token");
          const response = await api.delete(url, {
             //headers: {
             // Authorization: `Bearer ${token}`,
            });

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Indicaciones-Store.js:214 ~ destroyIndic ~ response:",
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
          await this.listIndic();
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
