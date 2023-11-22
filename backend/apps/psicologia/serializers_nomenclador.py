from rest_framework import serializers

from .modelos_nomenclador import (
    NomAlgVeces,
    NomAtenCalculo,
    NomDepModerada,
    NomDepSevera,
    NomFijacion,
    NomFrecuente,
    NomLenguaje,
    NomMemoria,
    NomNoDepresion,
    NomNormal,
    NomNunca,
    NomOrientemporal,
    NomOrientespacial,
    NomSiempre,
)


class NomOrientemporalSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomOrientemporal
        fields = "__all__"


class NomOrientespacialSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomOrientespacial
        fields = "__all__"


class NomAlgVecesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomAlgVeces
        fields = "__all__"


class NomAtenCalculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomAtenCalculo
        fields = "__all__"


class NomDepModeradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomDepModerada
        fields = "__all__"


class NomDepSeveraSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomDepSevera
        fields = "__all__"


class NomFijacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomFijacion
        fields = "__all__"


class NomFrecuenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomFrecuente
        fields = "__all__"


class NomLenguajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomLenguaje
        fields = "__all__"


class NomMemoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomMemoria
        fields = "__all__"


class NomNoDepresionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomNoDepresion
        fields = "__all__"


class NomNormalSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomNormal
        fields = "__all__"


class NomNuncaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomNunca
        fields = "__all__"


class NomSiempreSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomSiempre
        fields = "__all__"
