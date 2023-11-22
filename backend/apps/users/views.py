from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import ChangeUserPasswordSerializer


class ChangeUserPasswordView(CreateAPIView):
    serializer_class = ChangeUserPasswordSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_id = serializer.validated_data["user_id"]
        new_password = serializer.validated_data["new_password"]

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"message": "El usuario no existe."}, status=400)

        # Cambiar la contraseña del usuario
        user.set_password(new_password)
        user.save()

        return Response(
            {
                "message": f"La contraseña del usuario {user.username} ha sido cambiada con éxito."
            }
        )
