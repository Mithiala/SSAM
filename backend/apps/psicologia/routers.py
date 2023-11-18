from rest_framework.routers import DefaultRouter

from .viewsets import (
    DefectologiaViewSet,
    EnarsViewSet,
    ResultadoViewSet,
    SaludMentalViewSet,
    YasevageViewSet,
)

router = DefaultRouter()
router.register(r"escenars", EnarsViewSet, basename="Enars")
router.register(r"escyasevage", YasevageViewSet, basename="Yasevage")
router.register(r"defectoligia", DefectologiaViewSet, basename="Defectología")
router.register(r"resultado", ResultadoViewSet, basename="Resultado")
router.register(r"escsaludmental", SaludMentalViewSet, basename="Salud Mental")

urlpatterns = router.urls
