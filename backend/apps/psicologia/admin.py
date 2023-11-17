from django.contrib import admin

from .models import Afectiva, Cognitivo, Defectologia

# Register your models here.
admin.site.register(Defectologia)
admin.site.register(Afectiva)
admin.site.register(Cognitivo)
