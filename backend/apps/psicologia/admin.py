from django.contrib import admin

from .modelos_nomenclador import (
    NomAlgVeces,
    NomAtenCalculo,
    NomDepModerada,
    NomDepSevera,
    NomFijacion,
    NomFrecuente,
    NomLenguaje,
    NomMemoria,
    NomNoDepresion,
    NomNormal,
    NomNunca,
    NomOrientemporal,
    NomOrientespacial,
    NomSiempre,
)
from .models import Defectologia, Enars, SaludMental, Yasevage

# Register your models here.
admin.site.register(Defectologia)
admin.site.register(SaludMental)
admin.site.register(Yasevage)
admin.site.register(Enars)
admin.site.register(NomSiempre)
admin.site.register(NomAlgVeces)
admin.site.register(NomAtenCalculo)
admin.site.register(NomDepModerada)
admin.site.register(NomDepSevera)
admin.site.register(NomFijacion)
admin.site.register(NomFrecuente)
admin.site.register(NomMemoria)
admin.site.register(NomLenguaje)
admin.site.register(NomNoDepresion)
admin.site.register(NomNormal)
admin.site.register(NomNunca)
admin.site.register(NomOrientespacial)
admin.site.register(NomOrientemporal)
