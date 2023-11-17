from rest_framework.routers import DefaultRouter

from .viewsets import (
    AfectivaViewSet,
    CognitivoViewSet,
    DefectologiaViewSet,
)

router = DefaultRouter()
router.register(r"afectivo", AfectivaViewSet, basename="Afectivo")
router.register(r"cognitivo", CognitivoViewSet, basename="Cognitivo")
router.register(
    r"defectoligia", DefectologiaViewSet, basename="Defectología"
)
urlpatterns = router.urls
