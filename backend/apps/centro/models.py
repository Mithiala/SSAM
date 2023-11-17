from django.db import models

from apps.base.models import BaseModel


class Centro(BaseModel):
    codigo = models.PositiveSmallIntegerField(
        "codigo", unique=True, blank=True, null=True
    )
    nombre_inst = models.CharField("Nombre", max_length=50, blank=False, null=False)
    lugar = models.CharField("Lugar", max_length=50, blank=False, null=False)

    class Meta:
        db_table = "centro"
        verbose_name = "Centro"
        verbose_name_plural = "Centros"

    def __str__(self):
        return f" {self.nombre_inst}"
