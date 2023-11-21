from rest_framework import serializers

from ..tsocial.models import Paciente
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
    Paciente,
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

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "state": instance.state,
            "receiver": instance.receiver.nombre
            if instance.receiver is not None
            else "",
            "receiver": instance.receiver.ci if instance.receiver is not None else "",
            "receiver": instance.receiver.hs if instance.receiver is not None else "",
            "receiver": instance.receiver.fecha_inscripcion
            if instance.receiver is not None
            else "",
            "content": instance.content,
            "timestamp": instance.timestamp,
            "lecturatime": instance.lecturatime,
        }

    def get_Paciente_nombre(self, instance):
        return instance.receiver.nombre if instance.receiver is not None else ""

    def get_Paciente_edad(self, instance):
        return instance.receiver.edad if instance.receiver is not None else ""

    def get_Paciente_sexo(self, instance):
        return instance.receiver.sexo if instance.receiver is not None else ""


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
