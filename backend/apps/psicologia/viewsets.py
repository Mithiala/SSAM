from apps.base.viewsets import BaseViewSets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from .models import Defectologia
from .serializers import (
    DefectologiaSerializer,
    EnarsSerializer,
    SaludMentalSerializer,
    YasevageSerializer,
)


class EnarsViewSet(BaseViewSets):
    serializer_class = EnarsSerializer


class SaludMentalViewSet(BaseViewSets):
    serializer_class = SaludMentalSerializer


class YasevageViewSet(BaseViewSets):
    serializer_class = YasevageSerializer


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
