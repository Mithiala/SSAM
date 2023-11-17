from rest_framework import serializers

from .models import (
    ControlGucemico,
    DatoEnfermeria,
    Indicacion,
    IndiceValue,
    Intercurrencia,
    KatsValue,
    LawtonValue,
    MaterialGastable,
    Mnt,
    Sindrome,
    SolicitudPedido,
    Termometria,
    Traslado,
    Vacunacion,
)


class ControlGucemicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlGucemico
        fields = "__all__"


class DatoEnfermeriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatoEnfermeria
        fields = "__all__"


class MaterialGastableSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialGastable
        fields = "__all__"


class IndiceValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndiceValue
        fields = "__all__"


class LawtonValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = LawtonValue
        fields = "__all__"


class KatsValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = KatsValue
        fields = "__all__"


class IntercurrenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intercurrencia
        fields = "__all__"


class TrasladoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Traslado
        fields = "__all__"


class TrasladoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicacion
        fields = "__all__"


class IndicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicacion
        fields = "__all__"


class MntSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mnt
        fields = "__all__"


class TermometriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Termometria
        fields = "__all__"


class VacunacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacunacion
        fields = "__all__"


class SindromeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sindrome
        fields = "__all__"


class SolicitudPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitudPedido
        fields = "__all__"
