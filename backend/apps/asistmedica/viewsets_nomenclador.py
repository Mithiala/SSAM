from apps.base.viewsets import BaseViewSets
from django_filters.rest_framework import DjangoFilterBackend
from .models_nomenclador import (
    NomActividad,
    NomEstadoGeneral,
    NomEstadoMental,
    NomIncontinencia,
    NomMovilidad,
)
from rest_framework import viewsets

from .serializers_nomenclador import (
    NomActividadSerializer,
    NomEstadoGeneralSerializer,
    NomEstadoMentalSerializer,
    NomIncontinenciaSerializer,
    NomMovilidadSerializer,
)


class NomActividadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomActividad.objects.all()
    serializer_class = NomActividadSerializer


class NomEstadoGeneralViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomEstadoGeneral.objects.all()
    serializer_class = NomEstadoGeneralSerializer


class NomEstadoMentalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomEstadoMental.objects.all()
    serializer_class = NomEstadoMentalSerializer


class NomIncontinenciaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomIncontinencia.objects.all()
    serializer_class = NomIncontinenciaSerializer


class NomMovilidadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomMovilidad.objects.all()
    serializer_class = NomMovilidadSerializer
