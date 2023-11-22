from rest_framework import serializers
from .models_nomenclador import (
    NomActividad,
    NomEstadoGeneral,
    NomEstadoMental,
    NomIncontinencia,
    NomMovilidad,
)


class NomEstadoGeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomEstadoGeneral
        fields = "__all__"


class NomEstadoMentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomEstadoMental
        fields = "__all__"


class NomActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomActividad
        fields = "__all__"


class NomMovilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomMovilidad
        fields = "__all__"


class NomIncontinenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomIncontinencia
        fields = "__all__"
