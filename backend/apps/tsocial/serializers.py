from rest_framework import serializers

from .models import (
    ComposicionFamiliar,
    EncuestaInicial,
    Paciente,
    TrabajoDiario,
    ControlPase,
    Discapacidad,
    AyudaTecnica
)


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = "__all__"


class EncuestaInicialSerializer(serializers.ModelSerializer):
    class Meta:
        model = EncuestaInicial
        fields = "__all__"


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
