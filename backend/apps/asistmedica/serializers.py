from rest_framework import serializers

from ..tsocial.models import Paciente
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
    Paciente,
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


class IndiceValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndiceValue
        fields = "__all__"


class LawtonValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = LawtonValue
        fields = "__all__"


class KatsValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = KatsValue
        fields = "__all__"


class IntercurrenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intercurrencia
        fields = "__all__"


class TrasladoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Traslado
        fields = "__all__"


class TrasladoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicacion
        fields = "__all__"


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


class TermometriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Termometria
        fields = "__all__"


class VacunacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacunacion
        fields = "__all__"


class SindromeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sindrome
        fields = "__all__"


class SolicitudPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitudPedido
        fields = "__all__"
