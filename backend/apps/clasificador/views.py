import os

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..records.api.serializers.registry_serializers import RegistryPredictionSerializer
from ..records.models import Condition, ElectricMeter, Registry


class TrainModelView(APIView):
    def post(self, request, format=None):
        # Devolver el diccionario como respuesta
        return Response(
            metrics_dict,
            status=status.HTTP_200_OK,
        )


class PredictView(APIView):
    def get(self, request):
        from keras.models import load_model

        return Response(
            "Predicciones guardadas en la base de datos", status=status.HTTP_200_OK
        )
