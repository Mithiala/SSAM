from rest_framework import serializers

from .models import Cobertura, ControlLote, Dispensacion, Donacion


class DonacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donacion
        fields = "__all__"


class ControlLoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlLote
        fields = "__all__"


class DispensacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dispensacion
        fields = "__all__"


class CoberturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cobertura
        fields = "__all__"
