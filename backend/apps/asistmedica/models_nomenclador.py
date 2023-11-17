from apps.base.models import BaseModel
from django.db import models

# estado_general
# estado_mental
# actividad
# movilidad
# incontinencia


class NomEstadoGeneral(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomestadogeneral"
        verbose_name = "Nomenclador Estado General"
        verbose_name_plural = "Nomencladores Estados Generales"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomEstadoMental(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomestadoMental"
        verbose_name = "Nomenclador Estado Mental"
        verbose_name_plural = "Nomencladores Estados Mental"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomActividad(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomactividad"
        verbose_name = "Nomenclador Actividad"
        verbose_name_plural = "Nomencladores Actividades"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomMovilidad(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nommovilidad"
        verbose_name = "Nomenclador Movilidad"
        verbose_name_plural = "Nomencladores Movilidad"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomIncontinencia(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomincontinencia"
        verbose_name = "Nomenclador Incontinencia"
        verbose_name_plural = "Nomencladores Incontinencia"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "
