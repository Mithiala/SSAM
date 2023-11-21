from apps.base.models import BaseModel
from django.db import models


class Dispensacion(BaseModel):
    lote = models.CharField("Lote", max_length=50, blank=True, null=True)
    prod_med = models.CharField("Producto", max_length=50, blank=True, null=True)
    uni_med = models.CharField("U/M", max_length=10, blank=True, null=True)
    cant_med = models.PositiveSmallIntegerField(
        "Cantidad de medicamentos", blank=True, null=True
    )
    fecha_entrada = models.DateField("Fecha entrada", blank=True, null=True)
    fecha_salida = models.DateField("Fecha salida", blank=True, null=True)
    fecha_vence = models.DateField("Fecha vence", blank=True, null=True)
    clasificacion = models.CharField("Clasificación", blank=True, null=True)

    class Meta:
        db_table = "dispensacion"
        verbose_name = "Dispensación"
        verbose_name_plural = "Dispensaciones"


class ControlLote(BaseModel):
    lotes = models.CharField("Lote", max_length=50, blank=True, null=True)
    producto_lotes = models.CharField("Producto", max_length=50, blank=True, null=True)
    unidad_med = models.CharField("U/M", max_length=10, blank=True, null=True)
    cant = models.PositiveSmallIntegerField(
        "Cantidad de medicamentos", blank=True, null=True
    )
    fecha_produccion = models.DateField("Fecha de produccion", blank=True, null=True)
    fecha_vence = models.DateField("Fecha vence", blank=True, null=True)

    cl_disp = models.ForeignKey(
        Dispensacion,
        on_delete=models.CASCADE,
        verbose_name="Dispensación",
        related_name="cl_disp",
    )

    class Meta:
        db_table = "controllote"
        verbose_name = "Control Lote"
        verbose_name_plural = "Controles Lotes"

    def __str__(self):
        return f" {self.id} - {self.cl_disp.id}"


class Cobertura(BaseModel):
    lote_cob = models.CharField("Lote", max_length=50, blank=True, null=True)
    tipo_med = models.CharField("Tipo", max_length=50, blank=True, null=True)
    cantidad_cob = models.PositiveSmallIntegerField("Cantidad", blank=True, null=True)
    fecha_proxima_vencer = models.DateField(
        "Fecha próxima a vencer", blank=True, null=True
    )
    falta = models.BooleanField("Falta", default=False)
    ocioso = models.BooleanField("Ocioso", default=False)

    cob_disp = models.ForeignKey(
        Dispensacion,
        on_delete=models.CASCADE,
        verbose_name="Dispensación",
        related_name="cob_disp",
    )

    class Meta:
        db_table = "cobertura"
        verbose_name = "Cobertura"
        verbose_name_plural = "Coberturas"

    def __str__(self):
        return f" {self.id} - {self.cob_disp.fecha_entrada} "


class Donacion(BaseModel):
    lote_don = models.CharField("Lote", max_length=50, blank=True, null=True)
    prod_don = models.CharField("Producto", max_length=50, blank=True, null=True)
    und_med = models.CharField("U/M", max_length=50, blank=True, null=True)
    cant_don = models.PositiveSmallIntegerField("Cantidad", blank=True, null=True)
    fecha_venced = models.DateField("Fecha vence", blank=True, null=True)

    don_disp = models.ForeignKey(
        Dispensacion,
        on_delete=models.CASCADE,
        verbose_name="Donación",
        related_name="don_disp",
    )

    class Meta:
        db_table = "donacion"
        verbose_name = "Donación"
        verbose_name_plural = "Donaciones"

    def __str__(self):
        return f" {self.id} - {self.don_disp.fecha_entrada} "
