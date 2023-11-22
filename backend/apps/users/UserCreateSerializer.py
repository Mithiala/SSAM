from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from .models import User


class CustomUserCreateSerializer(serializers.ModelSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            "id",
            "avatar",
            "username",
            "password",
            "especialidad",
            "centro_pertenece",
            "groups",
            "is_staff",
            "is_active",
        )
