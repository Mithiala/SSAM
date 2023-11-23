from apps.base.models import BaseModel
from django.db import models

# orientemporal
# orientespacial
# fijacion
# atcalculo
# memoria
# lenguaje
# normal
# depmoderada
# depsevera
# nodepresion
# algveces
# frecuente
# siempre
# nunca


class NomOrientemporal(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomorientemporal"
        verbose_name = "Nomenclador Orientación Temporal"
        verbose_name_plural = "Nomencladores Orientaciones Temporales"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomOrientespacial(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomorientespacial"
        verbose_name = "Nomenclador Orientación Espacial"
        verbose_name_plural = "Nomencladores Orientaciones Espaciales"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomFijacion(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomfijacion"
        verbose_name = "Nomenclador Fijación"
        verbose_name_plural = "Nomencladores Fijaciones"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomAtenCalculo(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomatencalculo"
        verbose_name = "Nomenclador Atención Cálculo"
        verbose_name_plural = "Nomencladores Atenciones Cálculos"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomMemoria(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nommemoria"
        verbose_name = "Nomenclador Memoria"
        verbose_name_plural = "Nomencladores Memorias"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomLenguaje(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomlenguaje"
        verbose_name = "Nomenclador Lenguaje"
        verbose_name_plural = "Nomencladores Lenguajes"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomNormal(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomnormal"
        verbose_name = "Nomenclador Normal"
        verbose_name_plural = "Nomencladores Normales"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomDepModerada(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomdepmoderada"
        verbose_name = "Nomenclador Depresión Moderada"
        verbose_name_plural = "Nomencladores Depsiones Moderadas"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomDepSevera(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomdepsevera"
        verbose_name = "Nomenclador Depresión Severa"
        verbose_name_plural = "Nomencladores Depresiones Severas"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomNoDepresion(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomnodepresion"
        verbose_name = "Nomenclador No Depresión"
        verbose_name_plural = "Nomencladores No Depresiones"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomAlgVeces(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomalgveces"
        verbose_name = "Nomenclador Algunas Veces"
        verbose_name_plural = "Nomencladores Algunas Veces"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomFrecuente(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomfrecuente"
        verbose_name = "Nomenclador Frecuente"
        verbose_name_plural = "Nomencladores Frecuentes"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomSiempre(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomsiempre"
        verbose_name = "Nomenclador Siempre"
        verbose_name_plural = "Nomencladores Siempres"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "


class NomNunca(BaseModel):
    evaluacion = models.CharField("Evaluación", max_length=10, null=False, blank=False)
    puntuacion = models.PositiveSmallIntegerField("Puntuación", null=False, blank=False)

    class Meta:
        db_table = "nomnunca"
        verbose_name = "Nomenclador Nunca"
        verbose_name_plural = "Nomencladores Nuncas"

    def __str__(self):
        return f" {self.evaluacion} - {self.puntuacion} "
