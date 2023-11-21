import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useIndicacinesStore = defineStore("Indicaciones", {
  state: () => ({
    indicaciones: [],
    pacientes: [],
    loading: false,

    tempIndi: {
      id: 0,
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
      indic_paciente: 0,
      indic_termo: 0,
      indic_datoenf: 0,
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
        indic_paciente: 0,
        indic_termo: 0,
        indic_datoenf: 0,
      };
    },

    //TODO: Accion para Obtener todos Registros
    async listIndic() {
      this.loading = true;
      try {
        const url = "/asistmedica/indicacion/";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        this.indicaciones = response.data.results;
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
        const url = "/asistmedica/indice/";
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
    async createIndic() {
      try {
        const url = "/asistmedica/indicacion/";
        // const token = LocalStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("calorias", this.tempIndi.calorias);
        formData.append("fecha", this.tempIndi.fecha);
        formData.append("momento", this.tempIndi.momento);
        formData.append("sig_vitales", this.tempIndi.sig_vitales);
        formData.append("ctrl_peso", this.tempIndi.ctrl_peso);
        formData.append("dieta", this.tempIndi.dieta);
        formData.append("evitar_caidas", this.tempIndi.evitar_caidas);
        formData.append("glicemia", this.tempIndi.glicemia);
        formData.append("ind_glic", this.tempIndi.ind_glic);
        formData.append("camb_ropa", this.tempIndi.camb_ropa);
        formData.append("analgesicos", this.tempIndi.analgesicos);
        formData.append("ind_analg", this.tempIndi.ind_analg);
        formData.append("antiinflamatiorios", this.tempIndi.antiinflamatiorios);
        formData.append("ind_flamat", this.tempIndi.ind_flamat);
        formData.append("antibiotios", this.tempIndi.antibiotios);
        formData.append("ind_antib", this.tempIndi.ind_antib);
        formData.append("antidepresivos", this.tempIndi.antidepresivos);
        formData.append("ind_antid", this.tempIndi.ind_antid);
        formData.append("antihistaminicos", this.tempIndi.antihistaminicos);
        formData.append("ind_antis", this.tempIndi.ind_antis);
        formData.append("anticoagulantes", this.tempIndi.anticoagulantes);
        formData.append("ind_antic", this.tempIndi.ind_antic);
        formData.append("antihipertensivo", this.tempIndi.antihipertensivo);
        formData.append("ind_antih", this.tempIndi.ind_antih);
        formData.append("antidiabeticos", this.tempIndi.antidiabeticos);
        formData.append("ind_antidb", this.tempIndi.ind_antidb);
        formData.append("antiepilepticos", this.tempIndi.antiepilepticos);
        formData.append("ind_antiep", this.tempIndi.ind_antiep);
        formData.append("antipsicoticos", this.tempIndi.antipsicoticos);
        formData.append("ind_antips", this.tempIndi.ind_antips);
        formData.append("antiansiedad", this.tempIndi.antiansiedad);
        formData.append("ind_antian", this.tempIndi.ind_antian);
        formData.append("antiparasitario", this.tempIndi.antiparasitario);
        formData.append("ind_antiparas", this.tempIndi.ind_antiparas);
        formData.append("antivirales", this.tempIndi.antivirales);
        formData.append("ind_antiv", this.tempIndi.ind_antiv);
        formData.append("antiarritmicos", this.tempIndi.antiarritmicos);
        formData.append("ind_antia", this.tempIndi.ind_antia);
        formData.append("broncodilatadores", this.tempIndi.broncodilatadores);
        formData.append("ind_bronco", this.tempIndi.ind_bronco);
        formData.append("diureticos", this.tempIndi.diureticos);
        formData.append("ind_diur", this.tempIndi.ind_diur);
        formData.append("relajante_muscular", this.tempIndi.relajante_muscular);
        formData.append("ind_rm", this.tempIndi.ind_rm);
        formData.append("vitaminas", this.tempIndi.vitaminas);
        formData.append("ind_vit", this.tempIndi.ind_vit);
        formData.append("sonda", this.tempIndi.sonda);
        formData.append("ind_sonda", this.tempIndi.ind_sonda);
        formData.append("crisis_convul", this.tempIndi.crisis_convul);
        formData.append("restriccion", this.tempIndi.restriccion);
        formData.append("oxigenot", this.tempIndi.oxigenot);
        formData.append("otras_indic", this.tempIndi.otras_indic);
        formData.append("otros_med", this.tempIndi.otros_med);
        formData.append("vasodilatador", this.tempIndi.vasodilatador);
        formData.append("ind_vaso", this.tempIndi.ind_vaso);
        formData.append("estatinas", this.tempIndi.estatinas);
        formData.append("ind_est", this.tempIndi.ind_est);
        formData.append("acido_dicarb", this.tempIndi.acido_dicarb);
        formData.append("ind_acido", this.tempIndi.ind_acido);
        formData.append("antimicrobiano", this.tempIndi.antimicrobiano);
        formData.append("ind_antim", this.tempIndi.ind_antim);
        formData.append("ind_gener", this.tempIndi.ind_gener);
        formData.append("indic_paciente", this.tempIndi.indic_paciente.value);
        formData.append("indic_termo", this.tempIndi.indic_termo.value);
        formData.append("indic_datoenf", this.tempIndi.indic_datoenf.value);
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
    async retrieveIndic(id) {
      try {
        this.loading = true;
        const url = `/asistmedica/indicacion/${id}/`;
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
    async updateIndic(id) {
      try {
        const url = `/asistmedica/indicacion/${id}/`;
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
          indic_datoenf: this.tempIndi.indic_datoenf,
          indic_paciente: this.tempIndi.indic_paciente,
          indic_termo: this.tempIndi.indic_termo,
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

    async destroyIndic(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/asistmedica/indicacion/${id}/`;
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
