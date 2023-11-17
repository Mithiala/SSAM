# Generated by Django 4.2.7 on 2023-11-17 21:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tsocial', '0002_encuestainicial_persona_cobra_chequera'),
        ('asistmedica', '0005_alter_nommovilidad_evaluacion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='indicevalue',
            name='estado_general',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='estado_general', to='asistmedica.nomestadogeneral', verbose_name='Estado General'),
        ),
        migrations.AlterField(
            model_name='indicevalue',
            name='estado_mental',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='estado_mental', to='asistmedica.nomestadomental', verbose_name='Estado Mental'),
        ),
        migrations.AlterField(
            model_name='indicevalue',
            name='ind_paciente',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ind_paciente', to='tsocial.paciente', verbose_name='Paciente'),
        ),
    ]