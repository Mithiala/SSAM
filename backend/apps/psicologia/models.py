from apps.base.models import BaseModel
from django.db import models

from ..tsocial.models import Paciente


class Afectiva(BaseModel):
    depresion = models.BooleanField("Depresión", default=False)
    anciedad = models.BooleanField("Anciedad", default=False)
    intentosuicida = models.BooleanField("Intento suicida", default=False)
    observaciones = models.TextField("Observaciones", blank=False, null=False)

    a_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="a_paciente",
    )

    class Meta:
        db_table = "afectiva"
        verbose_name = "Afectiva"
        verbose_name_plural = "Afectivas"

    def __str__(self):
        return f" {self.id} - {self.a_paciente.nombre} "


class Cognitivo(BaseModel):
    esquizofrenia = models.BooleanField("Esquizofrenia", default=False)
    fumador = models.BooleanField("Fumador", default=False)
    alcoholico = models.BooleanField("Alcohólico", default=False)
    demencia = models.BooleanField("Demencia", default=False)
    parkinson = models.BooleanField("Parkinson", default=False)
    observaciones = models.TextField("Observaciones", blank=False, null=False)

    c_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Cognitivo",
        related_name="c_paciente",
    )

    class Meta:
        db_table = "cognitivo"
        verbose_name = "Cognitivo"
        verbose_name_plural = "Cognitivos"

    def __str__(self):
        return f" {self.id} - {self.c_paciente.nombre} "


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

    d_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Defectología",
        related_name="d_paciente",
    )

    class Meta:
        db_table = "defectologia"
        verbose_name = "Defectología"
        verbose_name_plural = "Defectologías"

    def __str__(self):
        return f" {self.id} - {self.d_paciente.nombre} "
