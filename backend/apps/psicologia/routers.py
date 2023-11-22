from rest_framework.routers import DefaultRouter

from .viewsets import (
    DefectologiaViewSet,
    EnarsViewSet,
    SaludMentalViewSet,
    YasevageViewSet,
)
from .viewsets_nomenclador import (
    NomAlgVecesViewSet,
    NomAtenCalculoViewSet,
    NomDepModeradatemporalViewSet,
    NomDepSeveraViewSet,
    NomFijacionViewSet,
    NomFrecuenteViewSet,
    NomLenguajeViewSet,
    NomMemoriaViewSet,
    NomNoDepresionViewSet,
    NomNormalViewSet,
    NomNuncaViewSet,
    NomOrientemporalViewSet,
    NomOrientespacialViewSet,
    NomSiempreViewSet,
)

router = DefaultRouter()
router.register(r"escenars", EnarsViewSet, basename="Enars")
router.register(r"escyasevage", YasevageViewSet, basename="Yasevage")
router.register(r"defectoligia", DefectologiaViewSet, basename="Defectología")
router.register(r"escsaludmental", SaludMentalViewSet, basename="Salud Mental")


router.register(r"nomalgveces", NomAlgVecesViewSet, basename="NomAlgVeces")
router.register(r"nomatencalculo", NomAtenCalculoViewSet, basename="NomAtenCalculo")
router.register(
    r"nomdepmoderadatemporal",
    NomDepModeradatemporalViewSet,
    basename="NomDepModeradatemporal",
)
router.register(r"nomdepsevera", NomDepSeveraViewSet, basename="NomDepSevera")
router.register(r"nomfijacion", NomFijacionViewSet, basename="NomFijacion")
router.register(r"nomfrecuente", NomFrecuenteViewSet, basename="NomFrecuente")
router.register(r"nomlenguaje", NomLenguajeViewSet, basename="NomLenguaje")
router.register(r"nommemoria", NomMemoriaViewSet, basename="NomMemoria")
router.register(r"nomnodepresion", NomNoDepresionViewSet, basename="NomNoDepresion")
router.register(r"nomnormal", NomNormalViewSet, basename="NomNormal")
router.register(r"nomnunca", NomNuncaViewSet, basename="NomNunca")
router.register(
    r"nomorientemporal", NomOrientemporalViewSet, basename="NomOrientemporal"
)
router.register(
    r"nomorientespacial", NomOrientespacialViewSet, basename="NomOrientespacial"
)
router.register(r"nomsiempre", NomSiempreViewSet, basename="NomSiempre")

urlpatterns = router.urls
