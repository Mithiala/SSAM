from rest_framework.routers import DefaultRouter

from .viewsets import (
    ControlGucemicoViewSet,
    DatoEnfermeriaViewSet,
    IndicacionViewSet,
    IndiceValueViewSet,
    IntercurrenciaViewSet,
    KatsValueViewSet,
    LawtonValueViewSet,
    MaterialGastableViewSet,
    MntViewSet,
    SindromeViewSet,
    SolicitudPedidoViewSet,
    TermometriaViewSet,
    TrasladoViewSet,
    VacunacionViewSet,
)
from .viewsets_nomenclador import (
    NomActividadViewSet,
    NomEstadoGeneralViewSet,
    NomEstadoMentalViewSet,
    NomIncontinenciaViewSet,
    NomMovilidadViewSet,
)

router = DefaultRouter()
router.register(r"enfermeria", DatoEnfermeriaViewSet, basename="Datos Enfermería")
router.register(r"ctrlglucemico", ControlGucemicoViewSet, basename="Control Glucémico")
router.register(r"matgastable", MaterialGastableViewSet, basename="Material Gastable")
router.register(r"indice", IndiceValueViewSet, basename="Evaluación Índice")
router.register(r"lawton", LawtonValueViewSet, basename="Evaluación Lawton")
router.register(r"kats", KatsValueViewSet, basename="Evaluación Kats")
router.register(r"intercurrencia", IntercurrenciaViewSet, basename="Intercurrencia")
router.register(r"traslado", TrasladoViewSet, basename="Traslado")
router.register(r"indicacion", IndicacionViewSet, basename="Indicación")
router.register(r"mnt", MntViewSet, basename="MNT")
router.register(r"termometria", TermometriaViewSet, basename="Termometría")
router.register(r"vacunacion", VacunacionViewSet, basename="Vacunación")
router.register(r"sindromes", SindromeViewSet, basename="Sindrome")
router.register(r"pedido", SolicitudPedidoViewSet, basename="Solicitud de medicamentos")


router.register(r"nomactividad", NomActividadViewSet, basename="NomActividadViewSet")
router.register(r"nommovilidad", NomMovilidadViewSet, basename="NomMovilidadViewSet")
router.register(
    r"nomestadomental", NomEstadoMentalViewSet, basename="NomEstadoMentalViewSet"
)
router.register(
    r"nomestadogeneral",
    NomEstadoGeneralViewSet,
    basename="NomEstadoGeneralViewSet",
)
router.register(
    r"nomincontinencia",
    NomIncontinenciaViewSet,
    basename="NomIncontinenciaViewSet",
)


urlpatterns = router.urls
