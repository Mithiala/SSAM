from apps.base.viewsets import BaseViewSets

from .serializers import CentroSerializer


class CentroViewSet(BaseViewSets):
    serializer_class = CentroSerializer
