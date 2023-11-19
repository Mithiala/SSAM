from apps.base.viewsets import BaseViewSets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from .models import Defectologia, Resultado
from .serializers import (
    DefectologiaSerializer,
    EnarsSerializer,
    ResultadoSerializer,
    SaludMentalSerializer,
    YasevageSerializer,
)


class EnarsViewSet(BaseViewSets):
    serializer_class = EnarsSerializer


class SaludMentalViewSet(BaseViewSets):
    serializer_class = SaludMentalSerializer


class YasevageViewSet(BaseViewSets):
    serializer_class = YasevageSerializer


class ResultadoViewSet(viewsets.ModelViewSet):
    queryset = Resultado.objects.all()
    serializer_class = ResultadoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "depresion",
        "intentosuicida",
        "demencia",
        "normales",
    ]


class DefectologiaViewSet(viewsets.ModelViewSet):
    queryset = Defectologia.objects.all()
    serializer_class = DefectologiaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "auditivo",
        "visual",
        "ecv",
        "fisicomotora",
        "fuma",
        "alcoholico",
    ]
