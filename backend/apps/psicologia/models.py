from apps.base.models import BaseModel
from django.db import models

from ..tsocial.models import Paciente


class SaludMental(BaseModel):
    orientemporal = models.PositiveSmallIntegerField(
        "Orientación Temporal", blank=True, null=True
    )
    orientespacial = models.PositiveSmallIntegerField(
        "Orientación Espacial", blank=True, null=True
    )
    fijacion = models.PositiveSmallIntegerField("Fijación", blank=True, null=True)
    atcalculo = models.PositiveSmallIntegerField(
        "Atención y Cálculo", blank=True, null=True
    )
    memoria = models.PositiveSmallIntegerField("Memoria", blank=True, null=True)
    lenguaje = models.PositiveSmallIntegerField("Lenguaje", blank=True, null=True)
    normal = models.PositiveSmallIntegerField("Normal", blank=True, null=True)

    sm_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="sm_paciente",
    )

    class Meta:
        db_table = "saludmental"
        verbose_name = "Salud Mental"
        verbose_name_plural = "Salud Mentales"

    def __str__(self):
        return f" {self.id} - {self.sm_paciente.nombre} "


class Yasevage(BaseModel):
    depmoderada = models.PositiveSmallIntegerField(
        "Depresión Moderada", blank=True, null=True
    )
    depsevera = models.PositiveSmallIntegerField(
        "Depresión Severa", blank=True, null=True
    )
    normal = models.PositiveSmallIntegerField("Normal", blank=True, null=True)

    y_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="y_paciente",
    )

    class Meta:
        db_table = "yasevage"
        verbose_name = "Yasevage"
        verbose_name_plural = "Yasevages"

    def __str__(self):
        return f" {self.id} - {self.y_paciente.nombre} "


class Enars(BaseModel):
    algveces = models.PositiveSmallIntegerField("Algunas Veces", blank=True, null=True)
    frecuente = models.PositiveSmallIntegerField(
        "Frecuentemente", blank=True, null=True
    )
    siempre = models.PositiveSmallIntegerField("Siempre", blank=True, null=True)
    nunca = models.PositiveSmallIntegerField("Nunca", blank=True, null=True)

    en_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="en_paciente",
    )

    class Meta:
        db_table = "enar"
        verbose_name = "Enars"
        verbose_name_plural = "Enars"

    def __str__(self):
        return f" {self.id} - {self.en_paciente.nombre} "


class Resultado(BaseModel):
    depresion = models.PositiveSmallIntegerField("Depresion", blank=True, null=True)
    intentosuicida = models.PositiveSmallIntegerField(
        "Intento Suicida", blank=True, null=True
    )
    demencia = models.PositiveSmallIntegerField("Demencia", blank=True, null=True)
    normales = models.PositiveSmallIntegerField("Normales", blank=True, null=True)

    resul_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="resul_paciente",
    )

    class Meta:
        db_table = "resultado"
        verbose_name = "Resultado"
        verbose_name_plural = "Resultados"

    def __str__(self):
        return f" {self.id} - {self.resul_paciente.nombre} "


class Defectologia(BaseModel):
    auditivo = models.BooleanField("Auditivo", default=False)
    visual = models.BooleanField("Visual", default=False)
    ecv = models.BooleanField("ECV", default=False)
    fisicomotora = models.BooleanField("Físico motora", default=False)
    retrazomental = models.CharField(
        "Retrazo mental", max_length=15, blank=False, null=False
    )
    trastornolenguaje = models.CharField(
        "Trastorno del lenguaje", max_length=15, blank=False, null=False
    )
    trastornopensamiento = models.CharField(
        "Trastorno del pensamiento", max_length=15, blank=False, null=False
    )
    anciedad = models.BooleanField("Anciedad", default=False)
    esquizofrenia = models.BooleanField("Esquizofrenia", default=False)
    fuma = models.BooleanField("Fumador", default=False)
    alcoholico = models.BooleanField("Alcohólico", default=False)
    parkinson = models.BooleanField("Parkinson", default=False)

    d_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="d_paciente",
    )

    class Meta:
        db_table = "defectologia"
        verbose_name = "Defectología"
        verbose_name_plural = "Defectologías"

    def __str__(self):
        return f" {self.id} - {self.d_paciente.nombre} "
