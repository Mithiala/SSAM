import datetime

from apps.base.models import BaseModel
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

from ..centro.models import Centro


class Paciente(BaseModel):
    image = models.ImageField("Imagen", blank=True, null=True)
    nombre = models.CharField("Nombre", max_length=50, blank=False, null=False)
    edad = models.PositiveSmallIntegerField("Edad", blank=False, null=False)
    sexo = models.CharField("Sexo", max_length=10, blank=False, null=False)
    direccion_part = models.TextField("Dirección", blank=True, null=True)
    ci = models.PositiveBigIntegerField("Carnet ID", blank=False, null=False)
    natural_de = models.CharField("Natural de:", max_length=50, blank=False, null=False)
    estado_civil = models.CharField(
        "Estado Civil", max_length=50, blank=False, null=False
    )
    ocupacion = models.CharField("Ocupación", max_length=50, blank=False, null=False)
    creencias_religiosas = models.CharField(
        "Creencias Religiosas", max_length=50, blank=False, null=False
    )
    escolaridad = models.CharField(
        "Escolaridad", max_length=50, blank=False, null=False
    )
    hijo_de = models.CharField("Hijo de:", max_length=50, blank=False, null=False)
    fecha_nacimiento = models.DateField("Fecha Nacimiento", blank=True, null=True)
    num_hc = models.PositiveIntegerField("# Historia Clínica", blank=True, null=True)
    num_hs = models.PositiveIntegerField("# Historia Social", blank=True, null=True)
    num_cmf = models.PositiveSmallIntegerField("# CMF", blank=True, null=True)
    fecha_inscripcion = models.DateField("Fecha Inscripcion", blank=True, null=True)
    antecedentes = models.TextField("Antecedentes", blank=True, null=True)
    recibevisita = models.BooleanField("Recibe Visita", default=False)
    clasificacion_economica = models.CharField(
        "Clasificación Económica", max_length=50, blank=False, null=False
    )
    num_chequera = models.PositiveBigIntegerField("# Chequera", blank=False, null=False)
    vivienda = models.CharField("Vivienda", max_length=50, blank=False, null=False)
    situacion_vivienda = models.CharField(
        "Situacion Vivienda", max_length=50, blank=False, null=False
    )
    convivencia = models.CharField(
        "Convivencia", max_length=50, blank=False, null=False
    )
    tiempo_estadia = models.CharField(
        "Tiempo Estadia", max_length=50, blank=False, null=False
    )
    reportado_por = models.CharField(
        "Reportado por:", max_length=50, blank=False, null=False
    )
    motivo_reporte = models.CharField(
        "Motivo Reporte:", max_length=50, blank=False, null=False
    )
    problema_social = models.CharField(
        "Problema Social", max_length=50, blank=False, null=False
    )

    p_centros = models.ForeignKey(
        Centro,
        on_delete=models.CASCADE,
        verbose_name="Centros",
        related_name="pacientecentro",
    )

    def calcular_edad(self):
        if self.fecha_nacimiento:
            fecha_actual = datetime.date.today()
            edad = fecha_actual.year - self.fecha_nacimiento.year

            # Ajustar la edad si el mes actual es anterior al mes de nacimiento
            if fecha_actual.month < self.fecha_nacimiento.month:
                edad -= 1
            # Ajustar la edad si el mes actual es igual al mes de nacimiento, pero el día actual es anterior al día de nacimiento
            elif (
                fecha_actual.month == self.fecha_nacimiento.month
                and fecha_actual.day < self.fecha_nacimiento.day
            ):
                edad -= 1

            return edad
        else:
            return None

    @staticmethod
    @receiver(pre_save, sender="tsocial.Paciente")
    def actualizar_edad(sender, instance, **kwargs):
        instance.edad = instance.calcular_edad()

    class Meta:
        db_table = "pacientes"
        verbose_name = "Paciente"
        verbose_name_plural = "Pacientes"

    def __str__(self):
        return f" {self.p_centros.nombre_inst} - {self.nombre}"


class EncuestaInicial(BaseModel):
    fecha = models.DateField("Fecha", blank=True, null=True)
    lectura = models.BooleanField("Lectura", default=False)
    tv = models.BooleanField("tv", default=False)
    juegomesa = models.BooleanField("juegomesa", default=False)
    cine = models.BooleanField("cine", default=False)
    radio = models.BooleanField("radio", default=False)
    pelota = models.BooleanField("pelota", default=False)
    otras = models.BooleanField("otras", default=False)
    lectura = models.BooleanField("Lectura", default=False)
    procedencia_at_asist_social = models.CharField(
        "procedencia_at_asist_social", max_length=50, blank=False, null=False
    )
    grado_parentesco = models.CharField(
        "grado_parentesco", max_length=50, blank=False, null=False
    )
    direc_person_responsable = models.CharField(
        "direc_person_responsable", max_length=50, blank=False, null=False
    )
    persona_cobra_chequera = models.CharField(
        "persona_cobra_chequera", max_length=50, blank=True, null=True
    )
    ingresado = models.BooleanField("ingresado", default=False)
    motivo = models.TextField("Motivo", blank=False, null=False)
    antes_donde_residia = models.CharField(
        "antes_donde_residia", max_length=50, blank=False, null=False
    )
    jefenucleo = models.BooleanField("jefenucleo", default=False)
    impfisico = models.BooleanField("impfisico", default=False)
    protesis = models.BooleanField("protesis", default=False)
    calsadoortop = models.BooleanField("calsadoortop", default=False)
    espejuelos = models.BooleanField("espejuelos", default=False)
    visitafamiliares = models.BooleanField("visitafamiliares", default=False)
    visitaamistades = models.BooleanField("visitaamistades", default=False)
    avisarleingreso = models.BooleanField("avisarleingreso", default=False)
    antecedentes_patologicos = models.TextField(
        "antecedentes_patologicos", blank=False, null=False
    )

    enc_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="encuesta_paciente",
    )

    class Meta:
        db_table = "encuestainicial"
        verbose_name = "Encuesta Inicial"
        verbose_name_plural = "Encuestas Iniciales"

    def __str__(self):
        return f" {self.id} - {self.enc_paciente.nombre}"


class ComposicionFamiliar(BaseModel):
    nombre = models.CharField("Nombre", max_length=50, blank=False, null=False)
    edad = models.PositiveSmallIntegerField("edad", blank=False, null=False)
    telefono = models.PositiveIntegerField("telefono", blank=False, null=False)
    direc_part = models.CharField("direc_part", max_length=50, blank=False, null=False)
    parentesco = models.CharField("parentesco", max_length=50, blank=False, null=False)
    estado_civil = models.CharField(
        "estado_civil", max_length=50, blank=False, null=False
    )
    escolaridad = models.CharField(
        "escolaridad", max_length=50, blank=False, null=False
    )
    ocupacion = models.CharField("ocupacion", max_length=50, blank=False, null=False)
    ingreso_economico = models.CharField(
        "ingreso_economico", max_length=50, blank=False, null=False
    )

    cf_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="cf_paciente",
    )

    class Meta:
        db_table = "composicionfamiliar"
        verbose_name = "Composición Familiar"
        verbose_name_plural = "Composiciones Familiares"

    def __str__(self):
        return f" {self.id} - {self.cf_paciente.nombre}"


class TrabajoDiario(BaseModel):
    fecha_ent = models.DateField("Fecha entrevista", blank=True, null=True)
    lugar_entrevista = models.CharField(
        "Lugar de entrevista", max_length=50, blank=False, null=False
    )
    tarjeton_medicamento = models.CharField(
        "Tarjetón de medicamento", blank=False, null=False
    )
    recibidos = models.BooleanField("Recibidos", default=False)
    enviados = models.BooleanField("Enviados", default=False)
    observaciones = models.TextField("Observaciones", blank=False, null=False)
    mot_invest = models.TextField("Motivo de la investigación", blank=False, null=False)
    efectuada = models.BooleanField("Efectuada", default=False)
    conclusiones = models.TextField("Conclusiones", blank=False, null=False)

    td_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="td_paciente",
    )

    td_familiar = models.ForeignKey(
        ComposicionFamiliar,
        on_delete=models.CASCADE,
        verbose_name="Familiar",
        related_name="td_familiar",
    )

    class Meta:
        db_table = "trabajodiario"
        verbose_name = "Trabajo Diario"
        verbose_name_plural = "Trabajos Diarios"

    def __str__(self):
        return f" {self.id} - {self.td_paciente.nombre} - {self.td_familiar.nombre}"


class ControlPase(BaseModel):
    fecha_salida = models.DateField("Fecha salida", blank=True, null=True)
    direc_part = models.CharField("Dirección", blank=False, null=False)
    fecha_regreso = models.DateField("Fecha regreso", blank=True, null=True)

    cp_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Control Pase",
        related_name="cp_paciente",
    )

    cp_familiar = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="cp_familiar",
    )

    class Meta:
        db_table = "controlpase"
        verbose_name = "Control Pase"
        verbose_name_plural = "Controles Pases"

    def __str__(self):
        return f" {self.id} - {self.cp_paciente.nombre} - {self.cp_familiar.nombre}"


class Discapacidad(BaseModel):
    motora = models.BooleanField("Motora", default=False)
    auditiva = models.BooleanField("Auditiva", default=False)
    visual = models.BooleanField("Visual", default=False)
    intelectual = models.BooleanField("Intelectual", default=False)
    sensorial = models.BooleanField("Sensorial", default=False)
    mixta = models.BooleanField("Mixta", default=False)
    psicopatia = models.BooleanField("Psicopatia", default=False)
    inconturinaria = models.BooleanField("Incontinencia urinaria", default=False)
    incontfecal = models.BooleanField("Incontinencia fecal", default=False)
    incontmixta = models.BooleanField("Incontinencia mixta", default=False)

    disc_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="disc_paciente",
    )

    class Meta:
        db_table = "discapacidad"
        verbose_name = "Discapacidad"
        verbose_name_plural = "Discapacidades"

    def __str__(self):
        return f" {self.id} - {self.disc_paciente.nombre} "


class AyudaTecnica(BaseModel):
    protesisdental = models.BooleanField("Prótesis dental", default=False)
    protesisauditiva = models.BooleanField("Prótesis auditiva", default=False)
    anteojos = models.BooleanField("Anteojos", default=False)
    protesisortopedica = models.BooleanField("Prótesis Ortopédica", default=False)
    sillaruedas = models.BooleanField("Silla de ruedas", default=False)
    baston = models.BooleanField("Bastón", default=False)
    andador = models.BooleanField("Andador", default=False)
    colchon = models.BooleanField("Colchón", default=False)
    camaplana = models.BooleanField("Cama plana", default=False)
    camafowler = models.BooleanField("Cama fowler", default=False)

    at_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="at_paciente",
    )

    class Meta:
        db_table = "ayudatecnica"
        verbose_name = "Ayuda Técnica"
        verbose_name_plural = "Ayudas Técnicas"

    def __str__(self):
        return f" {self.id} - {self.at_paciente.nombre} "
