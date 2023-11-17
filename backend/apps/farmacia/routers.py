from rest_framework.routers import DefaultRouter

from .viewsets import (
    CoberturaViewSet,
    ControlLoteViewSet,
    DispensacionViewSet,
    DonacionViewSet,
)

router = DefaultRouter()
router.register(r"dispensacion", DispensacionViewSet, basename="Dispensación")
router.register(r"donacion", DonacionViewSet, basename="Donación")
router.register(r"cobertura", CoberturaViewSet, basename="Cobertura")
router.register(r"lotes", ControlLoteViewSet, basename="Lotes")
urlpatterns = router.urls
