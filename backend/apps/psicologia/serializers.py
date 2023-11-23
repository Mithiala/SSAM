from rest_framework import serializers

from .models import Defectologia, Enars, SaludMental, Yasevage


class YasevageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Yasevage
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "resultado": instance.resultado,
            "fecha": instance.fecha,
            "nombre": instance.y_paciente.nombre
            if instance.y_paciente is not None
            else "",
        }


class EnarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enars
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "resultado": instance.resultado,
            "fecha": instance.fecha,
            "orientemporal": instance.orientemporal,
            "orientespacial": instance.orientespacial,
            "fijacion": instance.fijacion,
            "atencalculo": instance.atencalculo,
            "memoria": instance.memoria,
            "lenguaje": instance.lenguaje,
            "normal": instance.normal,
            "nombre": instance.en_paciente.nombre
            if instance.en_paciente is not None
            else "",
        }


class DefectologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defectologia
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "auditivo": instance.auditivo,
            "visual": instance.visual,
            "ecv": instance.ecv,
            "fisicomotora": instance.fisicomotora,
            "retrazomental": instance.retrazomental,
            "trastornolenguaje": instance.trastornolenguaje,
            "trastornopensamiento": instance.trastornopensamiento,
            "anciedad": instance.anciedad,
            "esquizofrenia": instance.esquizofrenia,
            "fuma": instance.fuma,
            "alcoholico": instance.alcoholico,
            "parkinson": instance.parkinson,
            "nombre": instance.d_paciente.nombre
            if instance.d_paciente is not None
            else "",
            "edad": instance.d_paciente.edad if instance.d_paciente is not None else "",
            "sexo": instance.d_paciente.sexo if instance.d_paciente is not None else "",
        }


class SaludMentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaludMental
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "resultado": instance.resultado,
            "fecha": instance.fecha,
            "nombre": instance.sm_paciente.nombre
            if instance.sm_paciente is not None
            else "",
        }
