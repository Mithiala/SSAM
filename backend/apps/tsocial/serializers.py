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


class TrabajoDiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrabajoDiario
        fields = "__all__"


class ControlPaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlPase
        fields = "__all__"


class DiscapacidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discapacidad
        fields = "__all__"


class AyudaTecnicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AyudaTecnica
        fields = "__all__"
