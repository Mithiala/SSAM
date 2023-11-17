from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from apps.base.viewsets import BaseViewSets

from .models import Afectiva, Cognitivo, Defectologia
from .serializers import (
    AfectivaSerializer,
    CognitivoSerializer,
    DefectologiaSerializer,
)

class AfectivaViewSet(viewsets.ModelViewSet):
    queryset = Afectiva.objects.all()
    serializer_class = AfectivaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["depresion", "anciedad", "intentosuicida"]

class CognitivoViewSet(viewsets.ModelViewSet):
    queryset = Cognitivo.objects.all()
    serializer_class = CognitivoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["esquizofrenia", "fumador", "alcoholico", "demencia", "parkinson"]

class DefectologiaViewSet(viewsets.ModelViewSet):
    queryset = Defectologia.objects.all()
    serializer_class = DefectologiaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["auditivo", "visual", "ecv", "fisicomotora"]
