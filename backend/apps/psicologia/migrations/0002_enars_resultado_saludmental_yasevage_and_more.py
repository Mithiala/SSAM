# Generated by Django 4.2.7 on 2023-11-18 22:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tsocial', '0003_alter_ayudatecnica_at_paciente_and_more'),
        ('psicologia', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Enars',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('algveces', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Algunas Veces')),
                ('frecuente', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Frecuentemente')),
                ('siempre', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Siempre')),
                ('nunca', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Nunca')),
                ('en_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='en_paciente', to='tsocial.paciente', verbose_name='Paciente')),
            ],
            options={
                'verbose_name': 'Enars',
                'verbose_name_plural': 'Enars',
                'db_table': 'enar',
            },
        ),
        migrations.CreateModel(
            name='Resultado',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('depresion', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Depresion')),
                ('intentosuicida', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Intento Suicida')),
                ('demencia', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Demencia')),
                ('normales', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Normales')),
                ('resul_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resul_paciente', to='tsocial.paciente', verbose_name='Paciente')),
            ],
            options={
                'verbose_name': 'Resultado',
                'verbose_name_plural': 'Resultados',
                'db_table': 'resultado',
            },
        ),
        migrations.CreateModel(
            name='SaludMental',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('orientemporal', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Orientación Temporal')),
                ('orientespacial', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Orientación Espacial')),
                ('fijacion', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Fijación')),
                ('atcalculo', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Atención y Cálculo')),
                ('memoria', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Memoria')),
                ('lenguaje', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Lenguaje')),
                ('normal', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Normal')),
                ('sm_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sm_paciente', to='tsocial.paciente', verbose_name='Paciente')),
            ],
            options={
                'verbose_name': 'Salud Mental',
                'verbose_name_plural': 'Salud Mentales',
                'db_table': 'saludmental',
            },
        ),
        migrations.CreateModel(
            name='Yasevage',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('depmoderada', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Depresión Moderada')),
                ('depsevera', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Depresión Severa')),
                ('normal', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Normal')),
                ('y_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='y_paciente', to='tsocial.paciente', verbose_name='Paciente')),
            ],
            options={
                'verbose_name': 'Yasevage',
                'verbose_name_plural': 'Yasevages',
                'db_table': 'yasevage',
            },
        ),
        migrations.RemoveField(
            model_name='cognitivo',
            name='c_paciente',
        ),
        migrations.AddField(
            model_name='defectologia',
            name='alcoholico',
            field=models.BooleanField(default=False, verbose_name='Alcohólico'),
        ),
        migrations.AddField(
            model_name='defectologia',
            name='anciedad',
            field=models.BooleanField(default=False, verbose_name='Anciedad'),
        ),
        migrations.AddField(
            model_name='defectologia',
            name='esquizofrenia',
            field=models.BooleanField(default=False, verbose_name='Esquizofrenia'),
        ),
        migrations.AddField(
            model_name='defectologia',
            name='fuma',
            field=models.BooleanField(default=False, verbose_name='Fumador'),
        ),
        migrations.AddField(
            model_name='defectologia',
            name='parkinson',
            field=models.BooleanField(default=False, verbose_name='Parkinson'),
        ),
        migrations.DeleteModel(
            name='Afectiva',
        ),
        migrations.DeleteModel(
            name='Cognitivo',
        ),
    ]