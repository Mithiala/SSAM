from apps.base.models import BaseModel
from django.db import models

from ..tsocial.models import Paciente
from .modelos_nomenclador import (
    NomAlgVeces,
    NomAtenCalculo,
    NomDepModerada,
    NomDepSevera,
    NomFijacion,
    NomFrecuente,
    NomLenguaje,
    NomMemoria,
    NomNoDepresion,
    NomNormal,
    NomNunca,
    NomOrientemporal,
    NomOrientespacial,
    NomSiempre,
)


class SaludMental(BaseModel):
    resultado = models.CharField("Resultado", max_length=15, blank=True, null=True)
    fecha = models.DateField("Fecha evaluación", blank=True, null=True)

    orientemporal = models.ForeignKey(
        NomOrientemporal,
        on_delete=models.CASCADE,
        verbose_name="Orientación Temporal",
        related_name="orientemporal",
    )

    orientespacial = models.ForeignKey(
        NomOrientespacial,
        on_delete=models.CASCADE,
        verbose_name="Orientación Espacial",
        related_name="orientespacial",
    )

    fijacion = models.ForeignKey(
        NomFijacion,
        on_delete=models.CASCADE,
        verbose_name="Fijacion",
        related_name="fijacion",
    )

    atencalculo = models.ForeignKey(
        NomAtenCalculo,
        on_delete=models.CASCADE,
        verbose_name="Atención Cálculo",
        related_name="atencalculo",
    )

    memoria = models.ForeignKey(
        NomMemoria,
        on_delete=models.CASCADE,
        verbose_name="Memoria",
        related_name="memoria",
    )

    lenguaje = models.ForeignKey(
        NomLenguaje,
        on_delete=models.CASCADE,
        verbose_name="Lenguaje",
        related_name="lenguaje",
    )

    normal = models.ForeignKey(
        NomNormal,
        on_delete=models.CASCADE,
        verbose_name="Normal",
        related_name="normal",
    )

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

        # Calcula la suma total de los puntajes
        # def save(self, **kwargs):
        #    self.resultado = (
        #        self.calcular_resultado()
        #    )  # Llama al método calcular_resultado() usando self

        # super().save(**kwargs)

    # def calcular_resultado(self):
    # """Calcula el resultado general de la salud mental."""
    # puntuacion_orientemporal = self.orientemporal.puntuacion
    # puntuacion_orientespacial = self.orientespacial.puntuacion
    # puntuacion_fijacion = self.fijacion.puntuacion
    # puntuacion_atencalculo = self.atencalculo.puntuacion
    # puntuacion_memoria = self.memoria.puntuacion
    # puntuacion_lenguaje = self.lenguaje.puntuacion
    # puntuacion_normal = self.normal.puntuacion

    # Calculamos el resultado general
    # suma_total = (
    #   puntuacion_orientemporal
    #   + puntuacion_orientespacial
    #   + puntuacion_fijacion
    #   + puntuacion_atencalculo
    #   + puntuacion_memoria
    #   + puntuacion_lenguaje
    #   + puntuacion_normal
    # )

    # Comprueba si la suma total indica un déficit cognitivo
    # if suma_total >= 6:
    #    sugerencia = "Sugiere déficit cognitivo"
    # else:
    #    sugerencia = "No sugiere déficit cognitivo"

    def __str__(self):
        return f" {self.id} - {self.sm_paciente.nombre} "


class Yasevage(BaseModel):
    resultado = models.CharField("Resultado", max_length=15, blank=True, null=True)
    fecha = models.DateField("Fecha evaluación", blank=True, null=True)

    depmoderada = models.ForeignKey(
        NomDepModerada,
        on_delete=models.CASCADE,
        verbose_name="Depresión Moderada",
        related_name="depmoderada",
    )

    depsevera = models.ForeignKey(
        NomDepSevera,
        on_delete=models.CASCADE,
        verbose_name="Depresión Severa",
        related_name="depsevera",
    )

    nodepresion = models.ForeignKey(
        NomNoDepresion,
        on_delete=models.CASCADE,
        verbose_name="No Depresión",
        related_name="nodepresion",
    )

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
    resultado = models.CharField("Resultado", max_length=15, blank=True, null=True)
    fecha = models.DateField("Fecha evaluación", blank=True, null=True)

    algveces = models.ForeignKey(
        NomAlgVeces,
        on_delete=models.CASCADE,
        verbose_name="Algunas Veces",
        related_name="algveces",
    )

    frecuente = models.ForeignKey(
        NomFrecuente,
        on_delete=models.CASCADE,
        verbose_name="Frecuentemente",
        related_name="frecuente",
    )

    siempre = models.ForeignKey(
        NomSiempre,
        on_delete=models.CASCADE,
        verbose_name="Siempre",
        related_name="siempre",
    )

    nunca = models.ForeignKey(
        NomNunca,
        on_delete=models.CASCADE,
        verbose_name="Nunca",
        related_name="nunca",
    )

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
