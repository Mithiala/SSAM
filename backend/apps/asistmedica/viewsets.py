from apps.base.viewsets import BaseViewSets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from .models import DatoEnfermeria, SolicitudPedido, Termometria, Traslado, Vacunacion
from .serializers import (
    ControlGucemicoSerializer,
    DatoEnfermeriaSerializer,
    IndicacionSerializer,
    IndiceValueSerializer,
    IntercurrenciaSerializer,
    KatsValueSerializer,
    LawtonValueSerializer,
    MaterialGastableSerializer,
    MntSerializer,
    SindromeSerializer,
    SolicitudPedidoSerializer,
    TermometriaSerializer,
    TrasladoSerializer,
    VacunacionSerializer,
)


class ControlGucemicoViewSet(BaseViewSets):
    serializer_class = ControlGucemicoSerializer


class DatoEnfermeriaViewSet(viewsets.ModelViewSet):
    queryset = DatoEnfermeria.objects.all()
    serializer_class = DatoEnfermeriaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["clasif_imc"]


class MaterialGastableViewSet(BaseViewSets):
    serializer_class = MaterialGastableSerializer


class IndiceValueViewSet(BaseViewSets):
    serializer_class = IndiceValueSerializer


class LawtonValueViewSet(BaseViewSets):
    serializer_class = LawtonValueSerializer


class KatsValueViewSet(BaseViewSets):
    serializer_class = KatsValueSerializer


class IntercurrenciaViewSet(BaseViewSets):
    serializer_class = IntercurrenciaSerializer


class TrasladoViewSet(viewsets.ModelViewSet):
    queryset = Traslado.objects.all()
    serializer_class = TrasladoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "traslado_poli",
        "ingreso_hosp",
        "ingreso_psiquiatria",
        "ingreso_subagudo",
        "baja",
        "fallecido",
    ]


class IndicacionViewSet(BaseViewSets):
    serializer_class = IndicacionSerializer


class MntViewSet(BaseViewSets):
    serializer_class = MntSerializer


class TermometriaViewSet(viewsets.ModelViewSet):
    queryset = Termometria.objects.all()
    serializer_class = TermometriaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["hora_6am", "hora_2pm", "hora_10pm"]


class VacunacionViewSet(viewsets.ModelViewSet):
    queryset = Vacunacion.objects.all()
    serializer_class = VacunacionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["tipo"]


class SindromeViewSet(BaseViewSets):
    serializer_class = SindromeSerializer


class SolicitudPedidoViewSet(viewsets.ModelViewSet):
    queryset = SolicitudPedido.objects.all()
    serializer_class = SolicitudPedidoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["producto"]
