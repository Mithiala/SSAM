import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const usePacientesStore = defineStore("Pacientes", {
  state: () => ({
    pacientes: [],
    loading: false,
    edad: 0,

    tempPaciente: {
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
      fecha_nacimiento: new Date().toISOString().substring(0,10),
      num_hc: 0,
      num_hs: 0,
      num_cmf: 0,
      fecha_inscripcion: new Date().toISOString().substring(0,10),
      antecedentes: "",
      recibevisita: false,
      clasificacion_economica: "",
      num_chequera: 0,
      vivienda: "",
      situacion_vivienda: "",
      convivencia: "",
      tiempo_estadia: "",
      reportado_por: "",
      motivo_reporte: "",
      problema_social: "",
      centro: 0,
    },

    showDialogDG: false,
    EditDG: false,
    AddDG: false,
  }),

  getters: {
  },

  actions: {
    //TODO: Resetear Variable Temporal
    resetTempPacientes() {
      console.log("aqui receteo");
      this.tempPaciente = {
        image: null,
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
        recibevisita: false,
        clasificacion_economica: "",
        num_chequera: 0,
        vivienda: "",
        situacion_vivienda: "",
        convivencia: "",
        tiempo_estadia: "",
        reportado_por: "",
        motivo_reporte: "",
        problema_social: "",
        centro: 0,
        this: this.pacientes,
      }
    },

    validateCarnetIdentidad() {
      const val = this.tempPaciente.ci;
      if (!val || val.length !== 11) {
        return "El carnet de identidad debe tener 11 dígitos.";
      } else {
        const fechaNacimiento = val.substring(0, 6);
        const anio = fechaNacimiento.substring(0, 2);
        const mes = fechaNacimiento.substring(2, 4);
        const dia = fechaNacimiento.substring(4, 6);

        const sexo = parseInt(val.charAt(9), 10);
        const esFemenino = sexo % 2 !== 0;

        // Generar automáticamente la fecha de nacimiento
        const fechaNacimientoGenerada = `19${anio}-${mes}-${dia}`;

        // Actualizar el valor de fecha_nacimiento en el objeto tempPaciente
        this.tempPaciente.fecha_nacimiento = fechaNacimientoGenerada;
        // Determinar el sexo del paciente
        this.tempPaciente.sexo = esFemenino ? "Femenino" : "Masculino";
      }
    },

    //TODO: Accion para Obtener todos Registros
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
    async createPacientes() {
      try {
        const url = "/tsocial/pacientes/";
        // const token = LocalStorage.getItem("access_token");

        const formData = new FormData();
        if (this.tempPaciente.image > 0) {
          formData.append("image", this.tempPaciente.image);
        }
        formData.append("nombre", this.tempPaciente.nombre);
        formData.append("edad", this.tempPaciente.edad);
        formData.append("sexo", this.tempPaciente.sexo);
        formData.append("direccion_part", this.tempPaciente.direccion_part);
        formData.append("ci", this.tempPaciente.ci);
        formData.append("natural_de", this.tempPaciente.natural_de);
        formData.append("estado_civil", this.tempPaciente.estado_civil);
        formData.append("ocupacion", this.tempPaciente.ocupacion);
        formData.append("creencias_religiosas", this.tempPaciente.creencias_religiosas);
        formData.append("escolaridad", this.tempPaciente.escolaridad);
        formData.append("hijo_de", this.tempPaciente.hijo_de);
        formData.append("fecha_nacimiento", this.tempPaciente.fecha_nacimiento);
        formData.append("num_hc", this.tempPaciente.num_hc);
        formData.append("num_hs", this.tempPaciente.num_hs);
        formData.append("num_cmf", this.tempPaciente.num_cmf);
        formData.append("fecha_inscripcion", this.tempPaciente.fecha_inscripcion);
        formData.append("clasificacion_economica", this.tempPaciente.clasificacion_economica);
        formData.append("antecedentes", this.tempPaciente.antecedentes);
        formData.append("recibevisita", this.tempPaciente.recibevisita);
        formData.append("num_chequera", this.tempPaciente.num_chequera);
        formData.append("vivienda", this.tempPaciente.vivienda);
        formData.append("situacion_vivienda", this.tempPaciente.situacion_vivienda);
        formData.append("convivencia", this.tempPaciente.convivencia);
        formData.append("tiempo_estadia", this.tempPaciente.tiempo_estadia);
        formData.append("reportado_por", this.tempPaciente.reportado_por);
        formData.append("problema_social", this.tempPaciente.problema_social);
        formData.append("motivo_reporte", this.tempPaciente.motivo_reporte);
        formData.append("p_centros", this.tempPaciente.centro.value);

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
          await this.listPacientes();
          this.showDialogDG = false;
          this.resetTempPacientes();
        }
      } catch (error) {
        console.log("FullError: ", error);
        console.log("error: ", error.response.data);
        const menssage = error.response.data.error;
        Notify.create({
          color: "negative",
          message: "Error al crear el registro",
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    //TODO: Accion para obtener un Registro desde un ID
    async retrievePacientes(id) {
      try {
        this.loading = true;
        const url = `/tsocial/pacientes/${id}/`;
        //const token = LocalStorage.getItem("access_token");
        const response = await api.get(url, {
          //headers: {
          // Authorization: `Bearer ${token}`,
          //},
        });
        this.pacientes = response.data.results;
        console.log(
          "🚀 ~ file: Pacientes-Store.js:130 ~ retrievePacientes ~ response:",
          response.statusText
        );
        this.loading = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: Pacientes-Store.js:132 ~ retrievePacientes ~ error:",
          error.response.data
        );
      }
    },

    //TODO: Accion para modificar un Registro desde un ID
    async updatePaciente(id) {
      try {
        const url = `/tsocial/pacientes/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const request = {
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
          situacion_vivienda: this.tempPaciente.situacion_vivienda,
          vivienda: this.tempPaciente.vivienda,
          convivencia: this.tempPaciente.convivencia,
          tiempo_estadia: this.tempPaciente.tiempo_estadia,
          reportado_por: this.tempPaciente.reportado_por,
          motivo_reporte: this.tempPaciente.motivo_reporte,
          problema_social: this.tempPaciente.problema_social,
          centro: this.tempPaciente.centro,
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
            "🚀 ~ file: Pacientes-Store.js:171 ~ updatePacientes ~ response:",
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
        await this.listPacientes();
        this.showDialogDG = false;
      } catch (error) {
        console.log("Code: ", error.response);

        let errorMessage = "";

        for (const field in error.response.data) {
          if (Array.isArray(error.response.data[field])) {
            errorMessage += error.response.data[field].join(", ") + " ";
          } else {
            errorMessage += String(error.response.data[field]) + " ";
          }
        }

        Notify.create({
          color: "negative",
          message: "Hubo un error al actualizar",
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    //TODO: Accion para modificar un Registro desde un ID
    async updatePhoto(id) {
      try {
        console.log(" entré ...");
        const url = `/tsocial/pacientes/${id}/`;
        // const token = LocalStorage.getItem("access_token");

        const formData = new FormData();
        formData.append("image", this.tempPaciente.image);

        const response = await api.patch(url, formData);

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
        await this.listPacientes();
      } catch (error) {
        console.log("Code: ", error);

        Notify.create({
          color: "negative",
          message: "Hubo un error al actualizar la imagen",
          position: "bottom",
          progress: true,
          icon: "report_problem",
        });
      }
    },

    async destroyPacientes(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "¿Estás seguro de que deseas eliminar el Registro?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const url = `/tsocial/pacientes/${id}/`;
          const response = await api.delete(url);

          if (response.status === 204) {
            console.log(
              "🚀 ~ file: Pacientes-Store.js:214 ~ destroyPacientes ~ response:",
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
          await this.listPacientes();
        });
      } catch (error) {
        console.log("Code: ", error.code);
        console.log("responseText : ", error.request.responseText);

        let errorMessage = "";

        for (const field in error.response.data.results) {
          if (error.response.data.hasOwnProperty(field)) {
            errorMessage += error.response.data[field].join(", ") + " ";
          }
        }

        Notify.create({
          color: "negative",
          message: "Hubo un error al eliminar",
          position: "top",
          icon: "report_problem",
          position: "bottom",
          progress: true,
        });
      }
    }
  }
})
