from rest_framework import serializers

from .models import Defectologia, Enars, SaludMental, Yasevage


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
