import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePacientesStore = defineStore("Pacientes", {
  state: () => ({
    pacientes: [],
    loading: false,

    tempPaciente: {
      id_paciente: 0,
      image: "",
      nombre: "",
      edad: 0,
      sexo: "",
      direccion_part: "",
      ci: 0,
      natural_de: "",
      estado_civil: "",
      ocupacion: "",
      creencias_religiosas: "",
      escolaridad: "",
      hijo_de: "",
      fecha_nacimiento: "",
      telefono: 0,
      num_hc: 0,
      num_hs: 0,
      num_cmf: 0,
      fecha_inscripcion: "",
      antecedentes: "",
      recibevisita: "",
      clasificacion_economica: "",
      num_chequera: 0,
      situacion_vivienda: "",
      convivencia: "",
      tiempo_estadia: "",
      reportado_por: "",
      motivo_reporte: "",
      problema_social: "",
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {},

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempPacientes() {
      this.tempDateGeneral = {
        id: 0,
        image: "",
        nombre: "",
        edad: 0,
        sexo: "",
        direccion_part: "",
        ci: 0,
        natural_de: "",
        estado_civil: "",
        ocupacion: "",
        creencias_religiosas: "",
        escolaridad: "",
        hijo_de: "",
        fecha_nacimiento: "",
        num_hc: 0,
        num_hs: 0,
        num_cmf: 0,
        fecha_inscripcion: "",
        antecedentes: "",
        recibevisita: "",
        clasificacion_economica: "",
        num_chequera: 0,
        convivencia: "",
        tiempo_estadia: "",
        reportado_por: "",
        motivo_reporte: "",
        problema_social: "",
      };
    },

    //TODO: Accion para Obtener todos Registros
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
    async createPacientes() {
      try {
        const url = "/api/v1/pacientes";
        // const token = LocalStorage.getItem("access_token");
        const response = await api.post(url, this.tempPaciente, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        if (response) {
          Notify.createPacientes({
            color: "positive",
            message: `Regitro guardado exitosamente`,
            position: "bottom",
            progress: true,
            icon: "check",
          });
          await this.listPacientes();
          this.showDialogDG = false;
          this.resetTempPacientes();
        }
      } catch (error) {
        console.log("error: ", error);
        Notify.create({
          color: "negative",
          message: errorMessage,
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    //TODO: Accion para obtener un Registro desde un ID
    async retrievePaciente(id_paciente) {
      try {
        this.loading = true;
        const url = `/api/v1/pacientes/${id_paciente}/`;
        const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(
          "🚀 ~ file: Paciente-Store.js:130 ~ retrievePaciente ~ response:",
          response.statusText
        );

        this.pacientes = response.data.results;
        this.pagination.rowsNumber = response.data.count;
        this.pagination.nextPage = response.data.next;
        this.pagination.previousPage = response.data.previous;
        this.loading = false;
      } catch (error) {
        console.log("Code: ", error.code);
        console.log("Mensaje : ", error.response.data.detail);
        console.log(
          "🚀 ~ file: Paciente-Store.js:132 ~ retrievePaciente ~ error:",
          error.response.data
        );
      }
    },

    //TODO: Accion para modificar un Registro desde un ID
    async updatePaciente(id_paciente) {
      try {
        const url = `/api/v1/pacientes/${id_paciente}/`;
        const token = LocalStorage.getItem("access_token");

        const request = {
          id_paciente: this.tempPaciente.id_paciente,
          nombre: this.tempPaciente.nombre,
          edad: this.tempPaciente.edad,
          sexo: this.tempPaciente.sexo,
          direccion_part: this.tempPaciente.direccion_part,
          ci: this.tempPaciente.ci,
          natural_de: this.tempPaciente.natural_de,
          estado_civil: this.tempPaciente.estado_civil,
          ocupacion: this.tempPaciente.ocupacion,
          creencias_religiosas: this.tempPaciente.creencias_religiosas,
          escolaridad: this.tempPaciente.escolaridad,
          hijo_de: this.tempPaciente.hijo_de,
          fecha_nacimiento: this.tempPaciente.fecha_nacimiento,
          telefono: this.tempPaciente.telefono,
          num_hc: this.tempPaciente.num_hc,
          num_hs: this.tempPaciente.num_hs,
          num_cmf: this.tempPaciente.num_cmf,
          fecha_inscripcion: this.tempPaciente.fecha_inscripcion,
          antecedentes: this.tempPaciente.antecedentes,
          recibevisita: this.tempPaciente.recibevisita,
          clasificacion_economica: this.tempPaciente.clasificacion_economica,
          num_chequera: this.tempPaciente.num_chequera,
          convivencia: this.tempPaciente.convivencia,
          tiempo_estadia: this.tempPaciente.tiempo_estadia,
          reportado_por: this.tempPaciente.reportado_por,
          motivo_reporte: this.tempPaciente.motivo_reporte,
          problema_social: this.tempPaciente.problema_social,
        };

        const response = await api.patch(url, request, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          console.log("Status: ", response.statusText);
          console.log(
            "🚀 ~ file: Paciente-Store.js:171 ~ updatePaciente ~ response:",
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
        await this.listPaciente();
        this.showDialogDG = false;
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
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },
  },
});
