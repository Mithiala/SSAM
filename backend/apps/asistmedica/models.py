from apps.base.models import BaseModel
from django.db import models

from ..farmacia.models import Dispensacion
from ..tsocial.models import Paciente
from .models_nomenclador import (
    NomActividad,
    NomEstadoGeneral,
    NomEstadoMental,
    NomIncontinencia,
    NomMovilidad,
)


class DatoEnfermeria(BaseModel):
    num_cama = models.PositiveSmallIntegerField("# Cama", blank=True, null=True)
    sala = models.CharField("Sala", max_length=10, blank=True, null=True)
    peso = models.DecimalField("Peso", max_digits=4, decimal_places=2)
    talla = models.DecimalField("Talla", max_digits=3, decimal_places=2)
    imc = models.DecimalField("IMC", max_digits=3, decimal_places=2)
    clasif_imc = models.CharField(
        "Clasificación IMC", max_length=20, blank=True, null=True
    )
    app = models.TextField("APP", blank=True, null=True)
    patologia = models.TextField("Patología", blank=True, null=True)
    operaciones = models.TextField("Operaciones", blank=False, null=False)
    fecha_e = models.DateField("Fecha estomatología", blank=False, null=False)
    atencion_estomatologia = models.TextField(
        "Atención estomatología", blank=False, null=False
    )
    fecha_a = models.DateField("Fecha auditivo", blank=False, null=False)
    programa_auditivo = models.TextField("Programa auditivo", blank=False, null=False)
    fecha_o = models.DateField("Fecha oftalmología", blank=False, null=False)
    atencion_oftalmologia = models.TextField(
        "Atención oftalmología", blank=False, null=False
    )
    fecha_ge = models.DateField("Fecha geriatría", blank=False, null=False)
    diagnostico_geriatria = models.TextField(
        "Diagnóstico geriatría", blank=False, null=False
    )
    fecha_on = models.DateField("Fecha oncología", blank=False, null=False)
    diagnostico_oncologia = models.TextField(
        "Diagnóstico oncología", blank=False, null=False
    )
    fecha_an = models.DateField("Fecha angiología", blank=False, null=False)
    diagnostico_angiologia = models.TextField(
        "Diagnóstico angiología", blank=False, null=False
    )
    fecha_car = models.DateField("Fecha cardiología", blank=False, null=False)
    diagnostico_cardiologia = models.TextField(
        "Diagnóstico cardiología", blank=False, null=False
    )
    fecha_cir = models.DateField("Fecha cirugía", blank=False, null=False)
    diagnostico_cirugia = models.TextField(
        "Diagnóstico cirugía", blank=False, null=False
    )
    fecha_der = models.DateField("Fecha dermatología", blank=False, null=False)
    diagnostico_dermatologia = models.TextField(
        "Diagnóstico dermatología", blank=False, null=False
    )
    fecha_fi = models.DateField("Fecha fisiatría", blank=False, null=False)
    diagnostico_fisiatria = models.TextField(
        "Diagnóstico fisiatría", blank=False, null=False
    )
    fecha = models.DateField("Fecha", blank=False, null=False)
    otros_diagnosticos = models.TextField("Otros diagnósticos", blank=False, null=False)
    ulcerapres = models.TextField("Úlcera por presión", blank=False, null=False)
    sindrome_respiratorio = models.TextField(
        "Síndrome respiratorio", blank=False, null=False
    )
    programa_tb = models.TextField("Programa TB", blank=False, null=False)
    morbilidad = models.TextField("Morbilidad", blank=True, null=True)
    transfuciones = models.TextField("Transfuciones", blank=False, null=False)
    habitos_toxicos = models.TextField("Hábitos tóxicos", blank=True, null=True)
    alergia_medicamentos = models.TextField(
        "Alergia a medicamentos", blank=True, null=True
    )
    accidentes = models.TextField("Accidentes", blank=False, null=False)
    clasificacion_validismo = models.TextField(
        "Clasificación validismo", blank=True, null=True
    )

    denf_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Dato Enfermería",
        related_name="denf_paciente",
    )

    class Meta:
        db_table = "datoenfermeria"
        verbose_name = "Dato Enfermería"
        verbose_name_plural = "Datos Enfermerías"

    def __str__(self):
        return (
            f" {self.id} - {self.denf_paciente.nombre} - {self.num_cama} - {self.sala}"
        )


class ControlGucemico(BaseModel):
    fecha_gluc = models.DateField("Fecha glucémico", blank=True, null=True)
    turno = models.CharField("Turno", max_length=50, blank=True, null=True)
    resultado = models.TextField("Resultado", blank=True, null=True)
    observaciones = models.TextField("Observaciones", blank=False, null=False)

    gluc_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Control Gucémico",
        related_name="gluc_paciente",
    )

    class Meta:
        db_table = "controlgucemico"
        verbose_name = "Control Gucémico"
        verbose_name_plural = "Controles Gucémicos"

    def __str__(self):
        return f" {self.id} - {self.gluc_paciente.nombre}"


class MaterialGastable(BaseModel):
    fecha_mat = models.DateField("Fecha material", blank=True, null=True)
    turno = models.CharField("Turno", max_length=50, blank=True, null=True)
    mat_util = models.CharField(
        "Material utilizado", max_length=50, blank=True, null=True
    )
    med_util = models.CharField(
        "Medicamento utilizado", max_length=50, blank=True, null=True
    )
    via_admin = models.CharField(
        "vía administración", max_length=50, blank=True, null=True
    )

    mg_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Material Gastable",
        related_name="mg_paciente",
    )

    class Meta:
        db_table = "materialgastable"
        verbose_name = "Material Gastable"
        verbose_name_plural = "Materiales Gastables"

    def __str__(self):
        return f" {self.id} - {self.mg_paciente.nombre} "


class IndiceValue(BaseModel):
    resultado = models.CharField("Resultado", max_length=15, blank=True, null=True)
    fecha = models.DateField("Fecha evaluación", blank=True, null=True)

    incontinencia = models.ForeignKey(
        NomIncontinencia,
        on_delete=models.CASCADE,
        verbose_name="Incontinencia",
        related_name="incontinencia",
    )

    movilidad = models.ForeignKey(
        NomMovilidad,
        on_delete=models.CASCADE,
        verbose_name="Movilidad",
        related_name="movilidad",
    )

    actividad = models.ForeignKey(
        NomActividad,
        on_delete=models.CASCADE,
        verbose_name="Actividad",
        related_name="actividad",
    )

    estado_mental = models.ForeignKey(
        NomEstadoMental,
        on_delete=models.CASCADE,
        verbose_name="Estado Mental",
        related_name="estado_mental",
    )

    estado_general = models.ForeignKey(
        NomEstadoGeneral,
        on_delete=models.CASCADE,
        verbose_name="Estado General",
        related_name="estado_general",
    )

    ind_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Paciente",
        related_name="ind_paciente",
    )

    class Meta:
        db_table = "indicevalue"
        verbose_name = "Evaluación Índice"
        verbose_name_plural = "Evaluaciones Índices"

    def __str__(self):
        return f" {self.id} - {self.ind_paciente.nombre} "


class LawtonValue(BaseModel):
    usotelef = models.CharField("Uso de teléfono", max_length=15, blank=True, null=True)
    compras = models.CharField("Compras", max_length=15, blank=True, null=True)
    prepalim = models.CharField(
        "Preparar alimentos", max_length=15, blank=True, null=True
    )
    manejocasa = models.CharField(
        "Manejo de casa", max_length=15, blank=True, null=True
    )
    lavar = models.CharField("Lavar", max_length=15, blank=True, null=True)
    transporte = models.CharField("Transporte", max_length=15, blank=True, null=True)
    manejofin = models.CharField(
        "Manejo financiero", max_length=15, blank=True, null=True
    )
    usomed = models.CharField(
        "Uso de medicamentos", max_length=15, blank=True, null=True
    )
    fecha_value = models.DateField("Fecha evaluación", blank=True, null=True)

    law_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Evaluación Lawton",
        related_name="law_paciente",
    )

    class Meta:
        db_table = "lawtonvalue"
        verbose_name = "Evaluación Lawton"
        verbose_name_plural = "Evaluaciones Lawtons"

    def __str__(self):
        return f" {self.id} - {self.law_paciente.nombre} "


class KatsValue(BaseModel):
    banarse = models.CharField("Bañarse", max_length=15, blank=True, null=True)
    vestirse = models.CharField("Vestirse", max_length=15, blank=True, null=True)
    servicio = models.CharField("Ir al servicio", max_length=15, blank=True, null=True)
    levantarse = models.CharField("Levantarse", max_length=15, blank=True, null=True)
    continencia = models.CharField("Continencia", max_length=15, blank=True, null=True)
    comer = models.CharField("Comer", max_length=15, blank=True, null=True)
    fecha_kats = models.DateField("Fecha evaluación", blank=True, null=True)

    kat_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Evaluación Kats",
        related_name="kat_paciente",
    )

    class Meta:
        db_table = "katsvalue"
        verbose_name = "Evaluación Kats"
        verbose_name_plural = "Evaluaciones Kats"

    def __str__(self):
        return f" {self.id} - {self.kat_paciente.nombre} "


class Intercurrencia(BaseModel):
    tratamiento = models.TextField("Tratamiento", blank=True, null=True)
    fecha_inicio = models.DateField("Fecha inicio", blank=True, null=True)
    fecha_termina = models.DateField("Fecha termina", blank=True, null=True)

    inter_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Intercurrencia",
        related_name="inter_paciente",
    )

    class Meta:
        db_table = "intercurrencia"
        verbose_name = "Intercurrencia"
        verbose_name_plural = "Intercurrencias"

    def __str__(self):
        return f" {self.id} - {self.inter_paciente.nombre} "


class Traslado(BaseModel):
    traslado_poli = models.BooleanField("Traslado poli", default=False)
    motivo_traslado_poli = models.TextField(
        "Motivo traslado poli", blank=False, null=False
    )
    fecha_traslado_poli = models.DateField(
        "Fecha traslado poli", blank=False, null=False
    )
    ingreso_hosp = models.BooleanField("Ingreso hosp", default=False)
    motivo_ingreso_hosp = models.TextField(
        "Motivo ingreso hosp", blank=False, null=False
    )
    fecha_ingreso_hosp = models.DateField("Fecha ingreso hosp", blank=False, null=False)
    fecha_egreso = models.DateField("Fecha egreso", blank=False, null=False)
    diagnostico = models.TextField("Diagnóstico", blank=False, null=False)
    ingreso_psiquiatria = models.BooleanField("Ingreso psiquiatria", default=False)
    motivo_ingreso_psiquiatria = models.TextField(
        "Motivo ingreso psiquiatría", blank=False, null=False
    )
    fecha_ingreso_psiquiatria = models.DateField(
        "Fecha ingreso psiquiatría", blank=False, null=False
    )
    fecha_egreso_psiquiatria = models.DateField(
        "Fecha egreso psiquiatría", blank=False, null=False
    )
    diagnostico_psiquiatria = models.TextField(
        "Diagnóstico psiquiatría", blank=False, null=False
    )
    ingreso_subagudo = models.BooleanField("Ingreso subagudo", default=False)
    motivo_ingreso_subagudo = models.TextField(
        "Motivo ingreso subagudo", blank=False, null=False
    )
    fecha_ingreso_subagudo = models.DateField(
        "Fecha ingreso subagudo", blank=False, null=False
    )
    baja = models.BooleanField("Baja", default=False)
    motivo_baja = models.TextField("Motivo baja", blank=False, null=False)
    fecha_baja = models.DateField("Fecha baja", blank=False, null=False)
    fallecido = models.BooleanField("Fallecido", default=False)
    motivo_fallecido = models.TextField("Motivo fallecido", blank=False, null=False)
    fecha_fallecido = models.DateField("Fecha fallecido", blank=False, null=False)

    tras_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Traslado",
        related_name="tras_paciente",
    )

    class Meta:
        db_table = "traslado"
        verbose_name = "Traslado"
        verbose_name_plural = "Traslados"

    def __str__(self):
        return f" {self.id} - {self.tras_paciente.nombre} "


class Mnt(BaseModel):
    tratamiento = models.CharField("Tratamiento", max_length=50, blank=True, null=True)
    diagnostico = models.TextField("Diagnóstico", blank=False, null=False)
    frecuencia = models.CharField("frecuencia", max_length=20, blank=True, null=True)

    mnt_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Mnt",
        related_name="mnt_paciente",
    )

    class Meta:
        db_table = "mnt"
        verbose_name = "Mnt"
        verbose_name_plural = "Mnts"

    def __str__(self):
        return f" {self.id} - {self.mnt_paciente.nombre} "


class Termometria(BaseModel):
    hora_6am = models.CharField("Hora 6am", max_length=20, blank=True, null=True)
    hora_2pm = models.CharField("Hora 2pm", max_length=20, blank=True, null=True)
    hora_10pm = models.CharField("Hora 10pm", max_length=20, blank=True, null=True)
    fecha = models.DateField("Fecha", blank=False, null=False)
    observaciones = models.TextField("Observaciones", blank=False, null=False)

    ter_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Termometría",
        related_name="ter_paciente",
    )

    class Meta:
        db_table = "termometria"
        verbose_name = "Termometría"
        verbose_name_plural = "Termometrías"

    def __str__(self):
        return f" {self.id} - {self.ter_paciente.nombre} "


class Indicacion(BaseModel):
    calorias = models.CharField("Calorías", max_length=50, blank=True, null=True)
    fecha = models.DateField("Fecha", blank=False, null=False)
    momento = models.CharField("Hora", max_length=50, blank=True, null=True)
    sig_vitales = models.CharField(
        "Signos vitales", max_length=50, blank=True, null=True
    )
    ctrl_peso = models.DecimalField(
        "Control peso semanal", max_digits=4, decimal_places=2
    )
    dieta = models.CharField("Dieta", max_length=100, blank=True, null=True)
    evitar_caidas = models.BooleanField("Evitar caídas", default=False)
    glicemia = models.BooleanField("Glicemia", default=False)
    ind_glic = models.TextField("Indicaciones glicemia", blank=False, null=False)
    camb_ropa = models.BooleanField("Cambio de ropa", default=False)
    analgesicos = models.CharField(
        "Analgésicos", max_length=100, blank=False, null=False
    )
    ind_analg = models.TextField("Indicaciones analgésicos", blank=False, null=False)
    antiinflamatiorios = models.CharField(
        "Antiinflamatiorios", max_length=100, blank=False, null=False
    )
    ind_flamat = models.TextField(
        "Indicaciones antiinflamatiorios", blank=False, null=False
    )
    antibiotios = models.CharField(
        "Antibiótios", max_length=100, blank=False, null=False
    )
    ind_antib = models.TextField("Indicaciones antibiótios", blank=False, null=False)
    antidepresivos = models.CharField(
        "Antidepresivos", max_length=100, blank=False, null=False
    )
    ind_antid = models.TextField("Indicaciones antidepresivos", blank=False, null=False)
    antihistaminicos = models.CharField(
        "Antihistaminicos", max_length=100, blank=False, null=False
    )
    ind_antis = models.TextField(
        "Indicaciones antihistaminicos", blank=False, null=False
    )
    anticoagulantes = models.CharField(
        "Anticoagulantes", max_length=100, blank=False, null=False
    )
    ind_antic = models.TextField(
        "Indicaciones Anticoagulantes", blank=False, null=False
    )
    antihipertensivo = models.CharField(
        "Antihipertensivo", max_length=100, blank=False, null=False
    )
    ind_antih = models.TextField(
        "Indicaciones Antihipertensivo", blank=False, null=False
    )
    antidiabeticos = models.CharField(
        "Antidiabéticos", max_length=100, blank=False, null=False
    )
    ind_antidb = models.TextField(
        "Indicaciones antidiabéticos", blank=False, null=False
    )
    antiepilepticos = models.CharField(
        "Antiepilépticos", max_length=100, blank=False, null=False
    )
    ind_antiep = models.TextField(
        "Indicaciones antiepilépticos", blank=False, null=False
    )
    antipsicoticos = models.CharField(
        "Antipsicóticos", max_length=100, blank=False, null=False
    )
    ind_antips = models.TextField(
        "Indicaciones antipsicóticos", blank=False, null=False
    )
    antiansiedad = models.CharField(
        "Antiansiedad", max_length=100, blank=False, null=False
    )
    ind_antian = models.TextField("Indicaciones antiansiedad", blank=False, null=False)
    antiparasitario = models.CharField(
        "Antiparásitario", max_length=100, blank=False, null=False
    )
    ind_antiparas = models.TextField(
        "Indicaciones antiparásitario", blank=False, null=False
    )
    antivirales = models.CharField(
        "Antivirales", max_length=100, blank=False, null=False
    )
    ind_antiv = models.TextField("Indicaciones antivirales", blank=False, null=False)
    antiarritmicos = models.CharField(
        "Antiarrítmicos", max_length=100, blank=False, null=False
    )
    ind_antia = models.TextField("Indicaciones antiarrítmicos", blank=False, null=False)
    broncodilatadores = models.CharField(
        "Broncodilatadores", max_length=100, blank=False, null=False
    )
    ind_bronco = models.TextField(
        "Indicaciones broncodilatadores", blank=False, null=False
    )
    diureticos = models.CharField("Diuréticos", max_length=100, blank=False, null=False)
    ind_diur = models.TextField("Indicaciones diuréticos", blank=False, null=False)
    relajante_muscular = models.CharField(
        "Relajante muscular", max_length=100, blank=False, null=False
    )
    ind_rm = models.TextField(
        "Indicaciones Relajante muscular", blank=False, null=False
    )
    vitaminas = models.CharField("Vitaminas", max_length=100, blank=False, null=False)
    ind_vit = models.TextField("Indicaciones Vitaminas", blank=False, null=False)
    sonda = models.CharField("Sonda", max_length=100, blank=False, null=False)
    ind_sonda = models.TextField("Indicaciones Vitaminas", blank=False, null=False)
    crisis_convul = models.BooleanField("Crisis convulsivas", default=False)
    restriccion = models.BooleanField("Restricción", default=False)
    oxigenot = models.BooleanField("Oxígeno terapia", default=False)
    otras_indic = models.TextField("Otras indicaciones", blank=False, null=False)
    otros_med = models.TextField("Otras medicamentos", blank=False, null=False)
    vasodilatador = models.CharField(
        "Vasodilatador", max_length=100, blank=False, null=False
    )
    ind_vaso = models.TextField("Indicaciones vasodilatador", blank=False, null=False)
    estatinas = models.CharField("Estatinas", max_length=100, blank=False, null=False)
    ind_est = models.TextField("Indicaciones estatinas", blank=False, null=False)
    acido_dicarb = models.CharField(
        "Ácido dicarboxílico", max_length=100, blank=False, null=False
    )
    ind_acido = models.TextField(
        "Indicaciones Ácido dicarboxílico", blank=False, null=False
    )
    antimicrobiano = models.CharField(
        "Antimicrobiano", max_length=100, blank=False, null=False
    )
    ind_antim = models.TextField("Indicaciones antimicrobiano", blank=False, null=False)
    ind_gener = models.TextField("Indicaciones generales", blank=False, null=False)

    indic_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Indicación",
        related_name="indic_paciente",
    )

    indic_termo = models.ForeignKey(
        Termometria,
        on_delete=models.CASCADE,
        verbose_name="Indicación",
        related_name="indic_termo",
    )

    indic_datoenf = models.ForeignKey(
        DatoEnfermeria,
        on_delete=models.CASCADE,
        verbose_name="Indicación",
        related_name="indic_datoenf",
    )

    class Meta:
        db_table = "indicacion"
        verbose_name = "Indicación"
        verbose_name_plural = "Indicaciones"

    def __str__(self):
        return f" {self.id} - {self.indic_paciente.nombre} - {self.indic_termo.hora_6am} - {self.indic_termo.hora_2pm} - {self.indic_termo.hora_10pm} - {self.indic_datoenf.clasif_imc}"


class Vacunacion(BaseModel):
    tipo = models.CharField("Tipo", max_length=50, blank=True, null=True)
    lote = models.CharField("Lote", max_length=50, blank=True, null=True)
    fecha = models.DateField("Fecha", blank=False, null=False)

    vac_paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        verbose_name="Vacunación",
        related_name="vac_paciente",
    )

    class Meta:
        db_table = "vacunacion"
        verbose_name = "Vacunación"
        verbose_name_plural = "Vacunaciones"

    def __str__(self):
        return f" {self.id} - {self.vac_paciente.nombre} "


class Sindrome(BaseModel):
    cant_ira = models.PositiveSmallIntegerField(
        "Cantidad con IRA", blank=True, null=True
    )
    cant_neumonias = models.PositiveSmallIntegerField(
        "Cantidad con neumonías", blank=True, null=True
    )
    cant_covid = models.PositiveSmallIntegerField(
        "Cantidad con COVID", blank=True, null=True
    )
    cant_eda = models.PositiveSmallIntegerField(
        "Cantidad con EDA", blank=True, null=True
    )
    cant_escabiosis = models.PositiveSmallIntegerField(
        "Cantidad con escabiosis", blank=True, null=True
    )
    cant_micosis = models.PositiveSmallIntegerField(
        "Cantidad con micosis", blank=True, null=True
    )
    cant_hta = models.PositiveSmallIntegerField(
        "Cantidad con HTA", blank=True, null=True
    )
    cant_diabetes = models.PositiveSmallIntegerField(
        "Cantidad con diabetes", blank=True, null=True
    )
    otras = models.TextField("Otras", blank=True, null=True)

    class Meta:
        db_table = "sindrome"
        verbose_name = "Síndrome"
        verbose_name_plural = "Sindromes"


class SolicitudPedido(BaseModel):
    producto = models.CharField("Tipo", max_length=50, blank=True, null=True)
    unidad_medida = models.CharField("Lote", max_length=10, blank=True, null=True)
    cantidad = models.PositiveSmallIntegerField("Cantidad", blank=True, null=True)
    fecha_pedido = models.DateField("Fecha", blank=True, null=True)

    sp_disp = models.ForeignKey(
        Dispensacion,
        on_delete=models.CASCADE,
        verbose_name="Solicitud Pedido",
        related_name="sp_disp",
    )

    sp_indic = models.ForeignKey(
        Indicacion,
        on_delete=models.CASCADE,
        verbose_name="Solicitud Pedido",
        related_name="sp_indic",
    )

    class Meta:
        db_table = "solicitudpedido"
        verbose_name = "Solicitud Pedido"
        verbose_name_plural = "Solicitudes Pedidos"

    def __str__(self):
        return f" {self.id} - {self.sp_indic.id} "
