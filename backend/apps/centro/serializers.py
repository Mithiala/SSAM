from rest_framework import serializers

from .models import Centro


class CentroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Centro
        exclude = ("created_date", "modified_date", "deleted_date")
