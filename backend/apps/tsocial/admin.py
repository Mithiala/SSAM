from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from .models import (
    ComposicionFamiliar,
    ControlPase,
    Discapacidad,
    EncuestaInicial,
    Paciente,
    TrabajoDiario,
    AyudaTecnica,
)

class PacienteResource(resources.ModelResource):
    class Meta:
        model = Paciente

class PacienteAdmin(ImportExportModelAdmin):
    resource_classes = [PacienteResource]

# Register your models here.
admin.site.register(Paciente, PacienteAdmin)
admin.site.register(EncuestaInicial)
admin.site.register(ComposicionFamiliar)
admin.site.register(TrabajoDiario)
admin.site.register(ControlPase)
admin.site.register(Discapacidad)
admin.site.register(AyudaTecnica)
