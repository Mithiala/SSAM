from rest_framework import serializers

from .models import Defectologia, Enars, Resultado, SaludMental, Yasevage


class YasevageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Yasevage
        fields = "__all__"


class EnarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enars
        fields = "__all__"


class DefectologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defectologia
        fields = "__all__"


class SaludMentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaludMental
        fields = "__all__"


class ResultadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resultado
        fields = "__all__"
