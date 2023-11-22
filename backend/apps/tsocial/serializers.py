from rest_framework import serializers

from .models import (
    AyudaTecnica,
    ComposicionFamiliar,
    ControlPase,
    Discapacidad,
    EncuestaInicial,
    Paciente,
    TrabajoDiario,
)


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = "__all__"


class EncuestaInicialSerializer(serializers.ModelSerializer):
    class Meta:
        model = EncuestaInicial
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "fecha": instance.fecha,
            "lectura": instance.lectura,
            "tv": instance.tv,
            "juegomesa": instance.juegomesa,
            "cine": instance.cine,
            "radio": instance.radio,
            "pelota": instance.pelota,
            "otras": instance.otras,
            "lectura": instance.lectura,
            "procedencia_at_asist_social": instance.procedencia_at_asist_social,
            "grado_parentesco": instance.grado_parentesco,
            "direc_person_responsable": instance.direc_person_responsable,
            "persona_cobra_chequera": instance.persona_cobra_chequera,
            "ingresado": instance.ingresado,
            "motivo": instance.motivo,
            "antes_donde_residia": instance.antes_donde_residia,
            "jefenucleo": instance.jefenucleo,
            "impfisico": instance.impfisico,
            "protesis": instance.protesis,
            "calsadoortop": instance.calsadoortop,
            "espejuelos": instance.espejuelos,
            "visitafamiliares": instance.visitafamiliares,
            "visitaamistades": instance.visitaamistades,
            "avisarleingreso": instance.avisarleingreso,
            "antecedentes_patologicos": instance.antecedentes_patologicos,
            "nombre": instance.enc_paciente.nombre
            if instance.enc_paciente is not None
            else "",
            "ci": instance.enc_paciente.ci if instance.enc_paciente is not None else "",
            "num_hs": instance.enc_paciente.num_hs
            if instance.enc_paciente is not None
            else "",
            "fecha_inscripcion": instance.enc_paciente.fecha_inscripcion
            if instance.enc_paciente is not None
            else "",
        }


class ComposicionFamiliarSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComposicionFamiliar
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "nombre_f": instance.nombre_f,
            "edad": instance.edad,
            "telefono": instance.telefono,
            "direc_part": instance.direc_part,
            "parentesco": instance.parentesco,
            "estado_civil": instance.estado_civil,
            "escolaridad": instance.escolaridad,
            "ocupacion": instance.ocupacion,
            "ingreso_economico": instance.ingreso_economico,
            "nombre": instance.cf_paciente.nombre
            if instance.cf_paciente is not None
            else "",
            "recibevisita": instance.cf_paciente.recibevisita
            if instance.cf_paciente is not None
            else "",
        }


class TrabajoDiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrabajoDiario
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "fecha_ent": instance.fecha_ent,
            "lugar_entrevista": instance.lugar_entrevista,
            "tarjeton_medicamento": instance.tarjeton_medicamento,
            "recibidos": instance.recibidos,
            "enviados": instance.enviados,
            "observaciones": instance.observaciones,
            "mot_invest": instance.mot_invest,
            "efectuada": instance.efectuada,
            "conclusiones": instance.conclusiones,
            "nombre": instance.td_paciente.nombre
            if instance.td_paciente is not None
            else "",
            "num_hs": instance.cp_paciente.num_hs
            if instance.cp_paciente is not None
            else "",
            "nombre_f": instance.td_familiar.nombre_f
            if instance.td_familiar is not None
            else "",
        }


class ControlPaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlPase
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "fecha_salida": instance.fecha_salida,
            "direc_part": instance.direc_part,
            "fecha_regreso": instance.fecha_regreso,
            "nombre": instance.cp_paciente.nombre
            if instance.cp_paciente is not None
            else "",
            "edad": instance.cp_paciente.edad
            if instance.cp_paciente is not None
            else "",
            "num_hs": instance.cp_paciente.num_hs
            if instance.cp_paciente is not None
            else "",
            "nombre_f": instance.cp_familiar.nombre_f
            if instance.cp_familiar is not None
            else "",
        }


class DiscapacidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discapacidad
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "motora": instance.motora,
            "auditiva": instance.auditiva,
            "visual": instance.visual,
            "intelectual": instance.intelectual,
            "sensorial": instance.sensorial,
            "mixta": instance.mixta,
            "psicopatia": instance.psicopatia,
            "inconturinaria": instance.inconturinaria,
            "incontfecal": instance.incontfecal,
            "incontmixta": instance.incontmixta,
            "nombre": instance.disc_paciente.nombre
            if instance.disc_paciente is not None
            else "",
        }


class AyudaTecnicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AyudaTecnica
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "protesisdental": instance.protesisdental,
            "protesisauditiva": instance.protesisauditiva,
            "anteojos": instance.anteojos,
            "protesisortopedica": instance.protesisortopedica,
            "sillaruedas": instance.sillaruedas,
            "baston": instance.baston,
            "andador": instance.andador,
            "colchon": instance.colchon,
            "camaplana": instance.camaplana,
            "camafowler": instance.camafowler,
            "nombre": instance.at_paciente.nombre
            if instance.at_paciente is not None
            else "",
        }
