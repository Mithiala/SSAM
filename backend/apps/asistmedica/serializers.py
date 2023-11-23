from rest_framework import serializers

from .models import (
    ControlGucemico,
    DatoEnfermeria,
    Indicacion,
    IndiceValue,
    Intercurrencia,
    KatsValue,
    LawtonValue,
    MaterialGastable,
    Mnt,
    Sindrome,
    SolicitudPedido,
    Termometria,
    Traslado,
    Vacunacion,
)


class ControlGucemicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlGucemico
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "fecha_gluc": instance.fecha_gluc,
            "turno": instance.turno,
            "resultado": instance.resultado,
            "observaciones": instance.observaciones,
            # -------------
            "nombre": instance.gluc_paciente.nombre
            if instance.gluc_paciente is not None
            else "",
            "edad": instance.gluc_paciente.edad
            if instance.gluc_paciente is not None
            else "",
        }


class DatoEnfermeriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatoEnfermeria
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "num_cama": instance.num_cama,
            "sala": instance.sala,
            "peso": instance.peso,
            "talla": instance.talla,
            "clasif_imc": instance.clasif_imc,
            "app": instance.app,
            "patologia": instance.patologia,
            "operaciones": instance.operaciones,
            "fecha_e": instance.fecha_e,
            "atencion_estomatologia": instance.atencion_estomatologia,
            "fecha_a": instance.fecha_a,
            "programa_auditivo": instance.programa_auditivo,
            "fecha_o": instance.fecha_o,
            "atencion_oftalmologia": instance.atencion_oftalmologia,
            "resumen": instance.resumen,
            "ulcerapres": instance.ulcerapres,
            "sindrome_respiratorio": instance.sindrome_respiratorio,
            "programa_tb": instance.programa_tb,
            "morbilidad": instance.morbilidad,
            "transfuciones": instance.transfuciones,
            "habitos_toxicos": instance.habitos_toxicos,
            "alergia_medicamentos": instance.alergia_medicamentos,
            "accidentes": instance.accidentes,
            "clasificacion_validismo": instance.clasificacion_validismo,
            # -------------
            "nombre": instance.denf_paciente.nombre
            if instance.denf_paciente is not None
            else "",
            "edad": instance.denf_paciente.edad
            if instance.denf_paciente is not None
            else "",
            "sexo": instance.denf_paciente.sexo
            if instance.denf_paciente is not None
            else "",
        }


class MaterialGastableSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialGastable
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "fecha_mat": instance.fecha_mat,
            "turno": instance.turno,
            "mat_util": instance.mat_util,
            "med_util": instance.med_util,
            "via_admin": instance.via_admin,
            # -------------
            "nombre": instance.mg_paciente.nombre
            if instance.mg_paciente is not None
            else "",
            "edad": instance.mg_paciente.edad
            if instance.mg_paciente is not None
            else "",
        }


class IndiceValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndiceValue
        fields = "__all__"


class LawtonValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = LawtonValue
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "usotelef": instance.usotelef,
            "compras": instance.compras,
            "prepalim": instance.prepalim,
            "manejocasa": instance.manejocasa,
            "lavar": instance.lavar,
            "transporte": instance.transporte,
            "manejofin": instance.manejofin,
            "usomed": instance.usomed,
            "fecha_value": instance.fecha_value,
            # -------------
            "nombre": instance.law_paciente.nombre
            if instance.law_paciente is not None
            else "",
        }


class KatsValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = KatsValue
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "banarse": instance.banarse,
            "vestirse": instance.vestirse,
            "servicio": instance.servicio,
            "levantarse": instance.levantarse,
            "continencia": instance.continencia,
            "comer": instance.comer,
            "fecha_kats": instance.fecha_kats,
            # -------------
            "nombre": instance.kat_paciente.nombre
            if instance.kat_paciente is not None
            else "",
        }


class IntercurrenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intercurrencia
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "tratamiento": instance.tratamiento,
            "fecha_inicio": instance.fecha_inicio,
            "fecha_termina": instance.fecha_termina,
            # -------------
            "nombre": instance.inter_paciente.nombre
            if instance.inter_paciente is not None
            else "",
            "edad": instance.inter_paciente.edad
            if instance.inter_paciente is not None
            else "",
        }


class TrasladoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Traslado
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "traslado_poli": instance.traslado_poli,
            "motivo_traslado_poli": instance.motivo_traslado_poli,
            "fecha_traslado_poli": instance.fecha_traslado_poli,
            "ingreso_hosp": instance.ingreso_hosp,
            "motivo_ingreso_hosp": instance.motivo_ingreso_hosp,
            "fecha_ingreso_hosp": instance.fecha_ingreso_hosp,
            "fecha_egreso": instance.fecha_egreso,
            "diagnostico": instance.diagnostico,
            "ingreso_psiquiatria": instance.ingreso_psiquiatria,
            "motivo_ingreso_psiquiatria": instance.motivo_ingreso_psiquiatria,
            "fecha_ingreso_psiquiatria": instance.fecha_ingreso_psiquiatria,
            "fecha_egreso_psiquiatria": instance.fecha_egreso_psiquiatria,
            "diagnostico_psiquiatria": instance.diagnostico_psiquiatria,
            "ingreso_subagudo": instance.ingreso_subagudo,
            "motivo_ingreso_subagudo": instance.motivo_ingreso_subagudo,
            "fecha_ingreso_subagudo": instance.fecha_ingreso_subagudo,
            "baja": instance.baja,
            "motivo_baja": instance.motivo_baja,
            "fecha_baja": instance.fecha_baja,
            "fallecido": instance.fallecido,
            "motivo_fallecido": instance.motivo_fallecido,
            "fecha_fallecido": instance.fecha_fallecido,
            # -------------
            "nombre": instance.tras_paciente.nombre
            if instance.tras_paciente is not None
            else "",
        }


class IndicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicacion
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "calorias": instance.calorias,
            "fecha": instance.fecha,
            "momento": instance.momento,
            "sig_vitales": instance.sig_vitales,
            "ctrl_peso": instance.ctrl_peso,
            "dieta": instance.dieta,
            "evitar_caidas": instance.evitar_caidas,
            "glicemia": instance.glicemia,
            "ind_glic": instance.ind_glic,
            "camb_ropa": instance.camb_ropa,
            "analgesicos": instance.analgesicos,
            "ind_analg": instance.ind_analg,
            "antiinflamatiorios": instance.antiinflamatiorios,
            "ind_flamat": instance.ind_flamat,
            "antibiotios": instance.antibiotios,
            "ind_antib": instance.ind_antib,
            "antidepresivos": instance.antidepresivos,
            "ind_antid": instance.ind_antid,
            "antihistaminicos": instance.antihistaminicos,
            "ind_antis": instance.ind_antis,
            "anticoagulantes": instance.anticoagulantes,
            "ind_antic": instance.ind_antic,
            "antihipertensivo": instance.antihipertensivo,
            "ind_antih": instance.ind_antih,
            "antidiabeticos": instance.antidiabeticos,
            "ind_antidb": instance.ind_antidb,
            "antiepilepticos": instance.antiepilepticos,
            "ind_antiep": instance.ind_antiep,
            "antipsicoticos": instance.antipsicoticos,
            "ind_antips": instance.ind_antips,
            "antiansiedad": instance.antiansiedad,
            "ind_antian": instance.ind_antian,
            "antiparasitario": instance.antiparasitario,
            "ind_antiparas": instance.ind_antiparas,
            "antivirales": instance.antivirales,
            "ind_antiv": instance.ind_antiv,
            "antiarritmicos": instance.antiarritmicos,
            "ind_antia": instance.ind_antia,
            "broncodilatadores": instance.broncodilatadores,
            "ind_bronco": instance.ind_bronco,
            "diureticos": instance.diureticos,
            "ind_diur": instance.ind_diur,
            "relajante_muscular": instance.relajante_muscular,
            "ind_rm": instance.ind_rm,
            "vitaminas": instance.vitaminas,
            "ind_vit": instance.ind_vit,
            "sonda": instance.sonda,
            "ind_sonda": instance.ind_sonda,
            "crisis_convul": instance.crisis_convul,
            "restriccion": instance.restriccion,
            "oxigenot": instance.oxigenot,
            "otras_indic": instance.otras_indic,
            "otros_med": instance.otros_med,
            "vasodilatador": instance.vasodilatador,
            "ind_vaso": instance.ind_vaso,
            "estatinas": instance.estatinas,
            "ind_est": instance.ind_est,
            "acido_dicarb": instance.acido_dicarb,
            "ind_acido": instance.ind_acido,
            "antimicrobiano": instance.antimicrobiano,
            "ind_antim": instance.ind_antim,
            "ind_gener": instance.ind_gener,
            # -------------
            "nombre": instance.indic_paciente.nombre
            if instance.indic_paciente is not None
            else "",
            "ci": instance.indic_paciente.ci
            if instance.indic_paciente is not None
            else "",
            "edad": instance.indic_paciente.edad
            if instance.indic_paciente is not None
            else "",
            # --------------
            "hora_6am": instance.indic_termo.hora_6am
            if instance.indic_termo is not None
            else "",
            "hora_2pm": instance.indic_termo.hora_2pm
            if instance.indic_termo is not None
            else "",
            "hora_10pm": instance.indic_termo.hora_10pm
            if instance.indic_termo is not None
            else "",
            # --------------
            "num_cama": instance.indic_datoenf.num_cama
            if instance.indic_datoenf is not None
            else "",
            "clasif_imc": instance.indic_datoenf.clasif_imc
            if instance.indic_datoenf is not None
            else "",
        }


class MntSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mnt
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "tratamiento": instance.tratamiento,
            "diagnostico": instance.diagnostico,
            "frecuencia": instance.frecuencia,
            "fecha_mnt": instance.fecha_mnt,
            # -------------
            "nombre": instance.mnt_paciente.nombre
            if instance.mnt_paciente is not None
            else "",
            "edad": instance.mnt_paciente.edad
            if instance.mnt_paciente is not None
            else "",
        }


class TermometriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Termometria
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "hora_6am": instance.hora_6am,
            "hora_2pm": instance.hora_2pm,
            "hora_10pm": instance.hora_10pm,
            "fecha": instance.fecha,
            "observaciones": instance.observaciones,
            # -------------
            "nombre": instance.ter_paciente.nombre
            if instance.ter_paciente is not None
            else "",
        }


class VacunacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacunacion
        fields = "__all__"

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "tipo": instance.tipo,
            "lote": instance.lote,
            "fecha": instance.fecha,
            # -------------
            "nombre": instance.vac_paciente.nombre
            if instance.vac_paciente is not None
            else "",
            "edad": instance.vac_paciente.edad
            if instance.vac_paciente is not None
            else "",
        }


class SindromeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sindrome
        fields = "__all__"


class SolicitudPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitudPedido
        fields = "__all__"
