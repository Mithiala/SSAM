from django.contrib import admin

from .models import (
    ControlGucemico,
    DatoEnfermeria,
    Indicacion,
    IndiceValue,
    Intercurrencia,
    KatsValue,
    LawtonValue,
    MaterialGastable,
    Mnt,
    Sindrome,
    SolicitudPedido,
    Termometria,
    Traslado,
    Vacunacion,
)

# Register your models here.
admin.site.register(DatoEnfermeria)
admin.site.register(ControlGucemico)
admin.site.register(MaterialGastable)
admin.site.register(IndiceValue)
admin.site.register(LawtonValue)
admin.site.register(KatsValue)
admin.site.register(Intercurrencia)
admin.site.register(Traslado)
admin.site.register(Indicacion)
admin.site.register(Mnt)
admin.site.register(Termometria)
admin.site.register(Vacunacion)
admin.site.register(Sindrome)
admin.site.register(SolicitudPedido)
