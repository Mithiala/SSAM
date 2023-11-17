from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from apps.base.viewsets import BaseViewSets

from .models import EncuestaInicial, Paciente, Discapacidad, AyudaTecnica
from .serializers import (
    ComposicionFamiliarSerializer,
    EncuestaInicialSerializer,
    PacienteSerializer,
    TrabajoDiarioSerializer,
    ControlPaseSerializer,
    DiscapacidadSerializer,
    AyudaTecnicaSerializer
)


class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["p_centros", "state", "edad", "sexo"]


class EncuestaInicialViewSet(viewsets.ModelViewSet):
    queryset = EncuestaInicial.objects.all()
    serializer_class = EncuestaInicialSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["impfisico", "protesis", "calsadoortop", "espejuelos"]


class ComposicionFamiliarViewSet(BaseViewSets):
    serializer_class = ComposicionFamiliarSerializer


class TrabajoDiarioViewSet(BaseViewSets):
    serializer_class = TrabajoDiarioSerializer


class ControlPaseViewSet(BaseViewSets):
    serializer_class = ControlPaseSerializer


class DiscapacidadViewSet(viewsets.ModelViewSet):
    queryset = Discapacidad.objects.all()
    serializer_class = DiscapacidadSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "motora",
        "auditiva",
        "visual",
        "intelectual",
        "sensorial",
        "mixta",
        "psicopatia",
        "inconturinaria",
        "incontfecal",
        "incontmixta",
    ]
class AyudaTecnicaViewSet(viewsets.ModelViewSet):
    queryset = AyudaTecnica.objects.all()
    serializer_class = AyudaTecnicaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "protesisdental",
        "protesisauditiva",
        "anteojos",
        "protesisortopedica",
        "sillaruedas",
        "baston",
        "andador", 
        "colchon",
        "camaplana",
        "camafowler",
        ]
