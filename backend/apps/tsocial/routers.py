from rest_framework.routers import DefaultRouter

from .viewsets import (
    ComposicionFamiliarViewSet,
    EncuestaInicialViewSet,
    PacienteViewSet,
    TrabajoDiarioViewSet,
    ControlPaseViewSet,
    DiscapacidadViewSet,
    AyudaTecnicaViewSet
)

router = DefaultRouter()


router.register(r"pacientes", PacienteViewSet, basename="Pacientes")
router.register(r"encuestainicial", EncuestaInicialViewSet, basename="Encuesta Inicial")
router.register(
    r"cfamiliar", ComposicionFamiliarViewSet, basename="Composición Familiar"
)
router.register(r"tdiario", TrabajoDiarioViewSet, basename="Trabajo Diario")
router.register(r"pases", ControlPaseViewSet, basename="Control Pase")
router.register(r"discapacidades", DiscapacidadViewSet, basename="Discapacidad")
router.register(r"atecnica", AyudaTecnicaViewSet, basename="Ayuda Técnica")

urlpatterns = router.urls
