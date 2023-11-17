from apps.base.viewsets import BaseViewSets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from .models import Cobertura, ControlLote, Dispensacion, Donacion
from .serializers import (
    CoberturaSerializer,
    ControlLoteSerializer,
    DispensacionSerializer,
    DonacionSerializer,
)


class DispensacionViewSet(viewsets.ModelViewSet):
    queryset = Dispensacion.objects.all()
    serializer_class = DispensacionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["lote", "prod_med"]


class CoberturaViewSet(viewsets.ModelViewSet):
    queryset = Cobertura.objects.all()
    serializer_class = CoberturaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "lote_cob",
        "tipo_med",
    ]


class ControlLoteViewSet(viewsets.ModelViewSet):
    queryset = ControlLote.objects.all()
    serializer_class = ControlLoteSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["lotes", "producto_lotes"]


class DonacionViewSet(viewsets.ModelViewSet):
    queryset = Donacion.objects.all()
    serializer_class = DonacionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["lote_don", "prod_don"]
