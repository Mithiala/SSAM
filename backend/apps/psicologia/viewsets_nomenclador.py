from rest_framework import viewsets

from .modelos_nomenclador import (
    NomAlgVeces,
    NomAtenCalculo,
    NomDepModerada,
    NomDepSevera,
    NomFijacion,
    NomFrecuente,
    NomLenguaje,
    NomMemoria,
    NomNoDepresion,
    NomNormal,
    NomNunca,
    NomOrientemporal,
    NomOrientespacial,
    NomSiempre,
)
from .serializers_nomenclador import (
    NomAlgVecesSerializer,
    NomAtenCalculoSerializer,
    NomDepModeradaSerializer,
    NomDepSeveraSerializer,
    NomFijacionSerializer,
    NomFrecuenteSerializer,
    NomLenguajeSerializer,
    NomMemoriaSerializer,
    NomNoDepresionSerializer,
    NomNormalSerializer,
    NomNuncaSerializer,
    NomOrientemporalSerializer,
    NomOrientespacialSerializer,
    NomSiempreSerializer,
)


class NomOrientemporalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomOrientemporal.objects.all()
    serializer_class = NomOrientemporalSerializer


class NomAlgVecesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomAlgVeces.objects.all()
    serializer_class = NomAlgVecesSerializer


class NomAtenCalculoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomAtenCalculo.objects.all()
    serializer_class = NomAtenCalculoSerializer


class NomDepModeradatemporalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomDepModerada.objects.all()
    serializer_class = NomDepModeradaSerializer


class NomOrientespacialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomOrientespacial.objects.all()
    serializer_class = NomOrientespacialSerializer


class NomNuncaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomNunca.objects.all()
    serializer_class = NomNuncaSerializer


class NomDepSeveraViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomDepSevera.objects.all()
    serializer_class = NomDepSeveraSerializer


class NomFijacionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomFijacion.objects.all()
    serializer_class = NomFijacionSerializer


class NomFrecuenteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomFrecuente.objects.all()
    serializer_class = NomFrecuenteSerializer


class NomLenguajeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomLenguaje.objects.all()
    serializer_class = NomLenguajeSerializer


class NomMemoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomMemoria.objects.all()
    serializer_class = NomMemoriaSerializer


class NomNoDepresionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomNoDepresion.objects.all()
    serializer_class = NomNoDepresionSerializer


class NomNormalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomNormal.objects.all()
    serializer_class = NomNormalSerializer


class NomSiempreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NomSiempre.objects.all()
    serializer_class = NomSiempreSerializer
