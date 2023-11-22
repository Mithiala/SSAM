import os

from django.conf import settings
from djoser.serializers import UserSerializer
from rest_framework import serializers

from ..centro.models import Centro
from .models import User


class CustomUserSerializer(serializers.ModelSerializer):
    centro_pertenece = serializers.PrimaryKeyRelatedField(
        queryset=Centro.objects.all(),
        required=False,
        allow_null=True,
    )

    class Meta(UserSerializer.Meta):
        model = User
        fields = (
            "id",
            "avatar",
            "nombre",
            "username",
            "password",
            "especialidad",
            "centro_pertenece",
            "grupo",
            "last_login",
            "is_staff",
            "is_active",
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.centro_pertenece:
            data["centro_pertenece"] = instance.centro_pertenece.nombre_inst
        else:
            data["centro_pertenece"] = None
        return data

    def update(self, instance, validated_data):
        new_avatar = validated_data.get("avatar", None)
        if new_avatar:
            # Obtener la ruta de la imagen existente
            existing_avatar_path = instance.avatar.path

            # Verificar si la imagen existente se encuentra en una subcarpeta de "users"
            if existing_avatar_path.startswith(
                os.path.join(settings.MEDIA_ROOT, "users")
            ):
                # Eliminar el avatar existente si está en una subcarpeta
                instance.avatar.delete()

            # Asignar la nueva imagen
            instance.avatar = new_avatar
        centro_pertenece = validated_data.get("centro_pertenece", None)
        if centro_pertenece is not None:
            instance.centro_pertenece = centro_pertenece
        instance.grupo = validated_data.get("grupo", instance.grupo)

        return super().update(instance, validated_data)


class CustomUserDeleteSerializer(serializers.Serializer):
    pass


class ChangeUserPasswordSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=True)
    new_password = serializers.CharField(required=True)
