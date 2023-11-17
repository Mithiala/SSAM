from rest_framework import serializers

from .models import (
    Afectiva,
    Cognitivo,
    Defectologia,
)


class AfectivaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Afectiva
        fields = "__all__"


class CognitivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cognitivo
        fields = "__all__"


class DefectologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defectologia
        fields = "__all__"
