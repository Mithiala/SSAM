from django.contrib import admin

from .models import Defectologia, Enars, Resultado, SaludMental, Yasevage

# Register your models here.
admin.site.register(Defectologia)
admin.site.register(SaludMental)
admin.site.register(Yasevage)
admin.site.register(Enars)
admin.site.register(Resultado)
