from rest_framework.routers import DefaultRouter

from .viewsets import CentroViewSet

router = DefaultRouter()


router.register(r"centro", CentroViewSet, basename="Centros")

urlpatterns = router.urls
