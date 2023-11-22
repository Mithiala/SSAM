from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from .models import Notice
from .serializers import NoticeSerializer


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["recibe", "envia"]
