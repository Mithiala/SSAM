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
    # paciente = PacienteSerializer()

    class Meta:
        model = EncuestaInicial
        fields = "__all__"

    # def to_representation(self, instance):
    #     return {
    #         "id": instance.id,
    #         "state": instance.state,
    #         "receiver": instance.receiver.nombre
    #         if instance.receiver is not None
    #         else "",
    #         "receiver": instance.receiver.ci if instance.receiver is not None else "",
    #         "receiver": instance.receiver.hs if instance.receiver is not None else "",
    #         "receiver": instance.receiver.fecha_inscripcion
    #         if instance.receiver is not None
    #         else "",
    #         "content": instance.content,
    #         "timestamp": instance.timestamp,
    #         "lecturatime": instance.lecturatime,
    #     }


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
