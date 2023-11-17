from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from .models import Cobertura, ControlLote, Dispensacion, Donacion


class DispensacionResource(resources.ModelResource):
    class Meta:
        model = Dispensacion


class DispensacionAdmin(ImportExportModelAdmin):
    resource_classes = [DispensacionResource]


# Register your models here.
admin.site.register(Dispensacion, DispensacionAdmin)
admin.site.register(Donacion)
admin.site.register(Cobertura)
admin.site.register(ControlLote)
