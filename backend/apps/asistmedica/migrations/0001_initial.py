# Generated by Django 4.2.7 on 2023-11-21 22:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('farmacia', '__first__'),
        ('tsocial', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DatoEnfermeria',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('num_cama', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='# Cama')),
                ('sala', models.CharField(blank=True, max_length=10, null=True, verbose_name='Sala')),
                ('peso', models.DecimalField(decimal_places=2, max_digits=4, verbose_name='Peso')),
                ('talla', models.DecimalField(decimal_places=2, max_digits=3, verbose_name='Talla')),
                ('clasif_imc', models.CharField(blank=True, max_length=20, null=True, verbose_name='Clasificación IMC')),
                ('app', models.TextField(blank=True, null=True, verbose_name='APP')),
                ('patologia', models.TextField(blank=True, null=True, verbose_name='Patología')),
                ('operaciones', models.TextField(verbose_name='Operaciones')),
                ('fecha_e', models.DateField(verbose_name='Fecha estomatología')),
                ('atencion_estomatologia', models.TextField(verbose_name='Atención estomatología')),
                ('fecha_a', models.DateField(verbose_name='Fecha auditivo')),
                ('programa_auditivo', models.TextField(verbose_name='Programa auditivo')),
                ('fecha_o', models.DateField(verbose_name='Fecha oftalmología')),
                ('atencion_oftalmologia', models.TextField(verbose_name='Atención oftalmología')),
                ('resumen', models.TextField(blank=True, null=True, verbose_name='Resumen de consultas externas')),
                ('ulcerapres', models.TextField(verbose_name='Úlcera por presión')),
                ('sindrome_respiratorio', models.TextField(verbose_name='Síndrome respiratorio')),
                ('programa_tb', models.TextField(verbose_name='Programa TB')),
                ('morbilidad', models.TextField(blank=True, null=True, verbose_name='Morbilidad')),
                ('transfuciones', models.TextField(verbose_name='Transfuciones')),
                ('habitos_toxicos', models.TextField(blank=True, null=True, verbose_name='Hábitos tóxicos')),
                ('alergia_medicamentos', models.TextField(blank=True, null=True, verbose_name='Alergia a medicamentos')),
                ('accidentes', models.TextField(verbose_name='Accidentes')),
                ('clasificacion_validismo', models.TextField(blank=True, null=True, verbose_name='Clasificación validismo')),
                ('denf_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='denf_paciente', to='tsocial.paciente', verbose_name='Dato Enfermería')),
            ],
            options={
                'verbose_name': 'Dato Enfermería',
                'verbose_name_plural': 'Datos Enfermerías',
                'db_table': 'datoenfermeria',
            },
        ),
        migrations.CreateModel(
            name='NomActividad',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('evaluacion', models.CharField(max_length=10, verbose_name='Evaluación')),
                ('puntuacion', models.PositiveSmallIntegerField(verbose_name='Puntuación')),
            ],
            options={
                'verbose_name': 'Nomenclador Actividad',
                'verbose_name_plural': 'Nomencladores Actividades',
                'db_table': 'nomactividad',
            },
        ),
        migrations.CreateModel(
            name='NomEstadoGeneral',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('evaluacion', models.CharField(max_length=10, verbose_name='Evaluación')),
                ('puntuacion', models.PositiveSmallIntegerField(verbose_name='Puntuación')),
            ],
            options={
                'verbose_name': 'Nomenclador Estado General',
                'verbose_name_plural': 'Nomencladores Estados Generales',
                'db_table': 'nomestadogeneral',
            },
        ),
        migrations.CreateModel(
            name='NomEstadoMental',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('evaluacion', models.CharField(max_length=10, verbose_name='Evaluación')),
                ('puntuacion', models.PositiveSmallIntegerField(verbose_name='Puntuación')),
            ],
            options={
                'verbose_name': 'Nomenclador Estado Mental',
                'verbose_name_plural': 'Nomencladores Estados Mental',
                'db_table': 'nomestadoMental',
            },
        ),
        migrations.CreateModel(
            name='NomIncontinencia',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('evaluacion', models.CharField(max_length=20, verbose_name='Evaluación')),
                ('puntuacion', models.PositiveSmallIntegerField(verbose_name='Puntuación')),
            ],
            options={
                'verbose_name': 'Nomenclador Incontinencia',
                'verbose_name_plural': 'Nomencladores Incontinencia',
                'db_table': 'nomincontinencia',
            },
        ),
        migrations.CreateModel(
            name='NomMovilidad',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('evaluacion', models.CharField(max_length=15, verbose_name='Evaluación')),
                ('puntuacion', models.PositiveSmallIntegerField(verbose_name='Puntuación')),
            ],
            options={
                'verbose_name': 'Nomenclador Movilidad',
                'verbose_name_plural': 'Nomencladores Movilidad',
                'db_table': 'nommovilidad',
            },
        ),
        migrations.CreateModel(
            name='Sindrome',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('cant_ira', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad con IRA')),
                ('cant_neumonias', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad con neumonías')),
                ('cant_covid', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad con COVID')),
                ('cant_eda', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad con EDA')),
                ('cant_escabiosis', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad con escabiosis')),
                ('cant_micosis', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad con micosis')),
                ('cant_hta', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad con HTA')),
                ('cant_diabetes', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad con diabetes')),
                ('otras', models.TextField(blank=True, null=True, verbose_name='Otras')),
            ],
            options={
                'verbose_name': 'Síndrome',
                'verbose_name_plural': 'Sindromes',
                'db_table': 'sindrome',
            },
        ),
        migrations.CreateModel(
            name='Vacunacion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('tipo', models.CharField(blank=True, max_length=50, null=True, verbose_name='Tipo')),
                ('lote', models.CharField(blank=True, max_length=50, null=True, verbose_name='Lote')),
                ('fecha', models.DateField(verbose_name='Fecha')),
                ('vac_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vac_paciente', to='tsocial.paciente', verbose_name='Vacunación')),
            ],
            options={
                'verbose_name': 'Vacunación',
                'verbose_name_plural': 'Vacunaciones',
                'db_table': 'vacunacion',
            },
        ),
        migrations.CreateModel(
            name='Traslado',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('traslado_poli', models.BooleanField(default=False, verbose_name='Traslado poli')),
                ('motivo_traslado_poli', models.TextField(verbose_name='Motivo traslado poli')),
                ('fecha_traslado_poli', models.DateField(verbose_name='Fecha traslado poli')),
                ('ingreso_hosp', models.BooleanField(default=False, verbose_name='Ingreso hosp')),
                ('motivo_ingreso_hosp', models.TextField(verbose_name='Motivo ingreso hosp')),
                ('fecha_ingreso_hosp', models.DateField(verbose_name='Fecha ingreso hosp')),
                ('fecha_egreso', models.DateField(verbose_name='Fecha egreso')),
                ('diagnostico', models.TextField(verbose_name='Diagnóstico')),
                ('ingreso_psiquiatria', models.BooleanField(default=False, verbose_name='Ingreso psiquiatria')),
                ('motivo_ingreso_psiquiatria', models.TextField(verbose_name='Motivo ingreso psiquiatría')),
                ('fecha_ingreso_psiquiatria', models.DateField(verbose_name='Fecha ingreso psiquiatría')),
                ('fecha_egreso_psiquiatria', models.DateField(verbose_name='Fecha egreso psiquiatría')),
                ('diagnostico_psiquiatria', models.TextField(verbose_name='Diagnóstico psiquiatría')),
                ('ingreso_subagudo', models.BooleanField(default=False, verbose_name='Ingreso subagudo')),
                ('motivo_ingreso_subagudo', models.TextField(verbose_name='Motivo ingreso subagudo')),
                ('fecha_ingreso_subagudo', models.DateField(verbose_name='Fecha ingreso subagudo')),
                ('baja', models.BooleanField(default=False, verbose_name='Baja')),
                ('motivo_baja', models.TextField(verbose_name='Motivo baja')),
                ('fecha_baja', models.DateField(verbose_name='Fecha baja')),
                ('fallecido', models.BooleanField(default=False, verbose_name='Fallecido')),
                ('motivo_fallecido', models.TextField(verbose_name='Motivo fallecido')),
                ('fecha_fallecido', models.DateField(verbose_name='Fecha fallecido')),
                ('tras_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tras_paciente', to='tsocial.paciente', verbose_name='Traslado')),
            ],
            options={
                'verbose_name': 'Traslado',
                'verbose_name_plural': 'Traslados',
                'db_table': 'traslado',
            },
        ),
        migrations.CreateModel(
            name='Termometria',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('hora_6am', models.CharField(blank=True, max_length=20, null=True, verbose_name='Hora 6am')),
                ('hora_2pm', models.CharField(blank=True, max_length=20, null=True, verbose_name='Hora 2pm')),
                ('hora_10pm', models.CharField(blank=True, max_length=20, null=True, verbose_name='Hora 10pm')),
                ('fecha', models.DateField(verbose_name='Fecha')),
                ('observaciones', models.TextField(verbose_name='Observaciones')),
                ('ter_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ter_paciente', to='tsocial.paciente', verbose_name='Termometría')),
            ],
            options={
                'verbose_name': 'Termometría',
                'verbose_name_plural': 'Termometrías',
                'db_table': 'termometria',
            },
        ),
        migrations.CreateModel(
            name='SolicitudPedido',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('producto', models.CharField(blank=True, max_length=50, null=True, verbose_name='Tipo')),
                ('unidad_medida', models.CharField(blank=True, max_length=10, null=True, verbose_name='Lote')),
                ('cantidad', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad')),
                ('fecha_pedido', models.DateField(blank=True, null=True, verbose_name='Fecha')),
                ('sp_disp', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sp_disp', to='farmacia.dispensacion', verbose_name='Dispensación')),
            ],
            options={
                'verbose_name': 'Solicitud Pedido',
                'verbose_name_plural': 'Solicitudes Pedidos',
                'db_table': 'solicitudpedido',
            },
        ),
        migrations.CreateModel(
            name='Mnt',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('tratamiento', models.CharField(blank=True, max_length=50, null=True, verbose_name='Tratamiento')),
                ('diagnostico', models.TextField(verbose_name='Diagnóstico')),
                ('frecuencia', models.CharField(blank=True, max_length=20, null=True, verbose_name='frecuencia')),
                ('fecha_mnt', models.DateField(blank=True, null=True, verbose_name='Fecha')),
                ('mnt_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mnt_paciente', to='tsocial.paciente', verbose_name='Mnt')),
            ],
            options={
                'verbose_name': 'Mnt',
                'verbose_name_plural': 'Mnts',
                'db_table': 'mnt',
            },
        ),
        migrations.CreateModel(
            name='MaterialGastable',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('fecha_mat', models.DateField(blank=True, null=True, verbose_name='Fecha material')),
                ('turno', models.CharField(blank=True, max_length=50, null=True, verbose_name='Turno')),
                ('mat_util', models.CharField(blank=True, max_length=50, null=True, verbose_name='Material utilizado')),
                ('med_util', models.CharField(blank=True, max_length=50, null=True, verbose_name='Medicamento utilizado')),
                ('via_admin', models.CharField(blank=True, max_length=50, null=True, verbose_name='vía administración')),
                ('mg_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mg_paciente', to='tsocial.paciente', verbose_name='Material Gastable')),
            ],
            options={
                'verbose_name': 'Material Gastable',
                'verbose_name_plural': 'Materiales Gastables',
                'db_table': 'materialgastable',
            },
        ),
        migrations.CreateModel(
            name='LawtonValue',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('usotelef', models.CharField(blank=True, max_length=15, null=True, verbose_name='Uso de teléfono')),
                ('compras', models.CharField(blank=True, max_length=15, null=True, verbose_name='Compras')),
                ('prepalim', models.CharField(blank=True, max_length=15, null=True, verbose_name='Preparar alimentos')),
                ('manejocasa', models.CharField(blank=True, max_length=15, null=True, verbose_name='Manejo de casa')),
                ('lavar', models.CharField(blank=True, max_length=15, null=True, verbose_name='Lavar')),
                ('transporte', models.CharField(blank=True, max_length=15, null=True, verbose_name='Transporte')),
                ('manejofin', models.CharField(blank=True, max_length=15, null=True, verbose_name='Manejo financiero')),
                ('usomed', models.CharField(blank=True, max_length=15, null=True, verbose_name='Uso de medicamentos')),
                ('fecha_value', models.DateField(blank=True, null=True, verbose_name='Fecha evaluación')),
                ('law_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='law_paciente', to='tsocial.paciente', verbose_name='Paciente')),
            ],
            options={
                'verbose_name': 'Evaluación Lawton',
                'verbose_name_plural': 'Evaluaciones Lawtons',
                'db_table': 'lawtonvalue',
            },
        ),
        migrations.CreateModel(
            name='KatsValue',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('banarse', models.CharField(blank=True, max_length=15, null=True, verbose_name='Bañarse')),
                ('vestirse', models.CharField(blank=True, max_length=15, null=True, verbose_name='Vestirse')),
                ('servicio', models.CharField(blank=True, max_length=15, null=True, verbose_name='Ir al servicio')),
                ('levantarse', models.CharField(blank=True, max_length=15, null=True, verbose_name='Levantarse')),
                ('continencia', models.CharField(blank=True, max_length=15, null=True, verbose_name='Continencia')),
                ('comer', models.CharField(blank=True, max_length=15, null=True, verbose_name='Comer')),
                ('fecha_kats', models.DateField(blank=True, null=True, verbose_name='Fecha evaluación')),
                ('kat_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='kat_paciente', to='tsocial.paciente', verbose_name='Paciente')),
            ],
            options={
                'verbose_name': 'Evaluación Kats',
                'verbose_name_plural': 'Evaluaciones Kats',
                'db_table': 'katsvalue',
            },
        ),
        migrations.CreateModel(
            name='Intercurrencia',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('tratamiento', models.TextField(blank=True, null=True, verbose_name='Tratamiento')),
                ('fecha_inicio', models.DateField(blank=True, null=True, verbose_name='Fecha inicio')),
                ('fecha_termina', models.DateField(blank=True, null=True, verbose_name='Fecha termina')),
                ('inter_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inter_paciente', to='tsocial.paciente', verbose_name='Intercurrencia')),
            ],
            options={
                'verbose_name': 'Intercurrencia',
                'verbose_name_plural': 'Intercurrencias',
                'db_table': 'intercurrencia',
            },
        ),
        migrations.CreateModel(
            name='IndiceValue',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('resultado', models.CharField(blank=True, max_length=15, null=True, verbose_name='Resultado')),
                ('fecha', models.DateField(blank=True, null=True, verbose_name='Fecha evaluación')),
                ('actividad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='actividad', to='asistmedica.nomactividad', verbose_name='Actividad')),
                ('estado_general', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='estado_general', to='asistmedica.nomestadogeneral', verbose_name='Estado General')),
                ('estado_mental', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='estado_mental', to='asistmedica.nomestadomental', verbose_name='Estado Mental')),
                ('incontinencia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='incontinencia', to='asistmedica.nomincontinencia', verbose_name='Incontinencia')),
                ('ind_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ind_paciente', to='tsocial.paciente', verbose_name='Paciente')),
                ('movilidad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movilidad', to='asistmedica.nommovilidad', verbose_name='Movilidad')),
            ],
            options={
                'verbose_name': 'Evaluación Índice',
                'verbose_name_plural': 'Evaluaciones Índices',
                'db_table': 'indicevalue',
            },
        ),
        migrations.CreateModel(
            name='Indicacion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('calorias', models.CharField(blank=True, max_length=50, null=True, verbose_name='Calorías')),
                ('fecha', models.DateField(verbose_name='Fecha')),
                ('momento', models.CharField(blank=True, max_length=50, null=True, verbose_name='Hora')),
                ('sig_vitales', models.CharField(blank=True, max_length=50, null=True, verbose_name='Signos vitales')),
                ('ctrl_peso', models.DecimalField(decimal_places=2, max_digits=4, verbose_name='Control peso semanal')),
                ('dieta', models.CharField(blank=True, max_length=100, null=True, verbose_name='Dieta')),
                ('evitar_caidas', models.BooleanField(default=False, verbose_name='Evitar caídas')),
                ('glicemia', models.BooleanField(default=False, verbose_name='Glicemia')),
                ('ind_glic', models.TextField(verbose_name='Indicaciones glicemia')),
                ('camb_ropa', models.BooleanField(default=False, verbose_name='Cambio de ropa')),
                ('analgesicos', models.CharField(max_length=100, verbose_name='Analgésicos')),
                ('ind_analg', models.TextField(verbose_name='Indicaciones analgésicos')),
                ('antiinflamatiorios', models.CharField(max_length=100, verbose_name='Antiinflamatiorios')),
                ('ind_flamat', models.TextField(verbose_name='Indicaciones antiinflamatiorios')),
                ('antibiotios', models.CharField(max_length=100, verbose_name='Antibiótios')),
                ('ind_antib', models.TextField(verbose_name='Indicaciones antibiótios')),
                ('antidepresivos', models.CharField(max_length=100, verbose_name='Antidepresivos')),
                ('ind_antid', models.TextField(verbose_name='Indicaciones antidepresivos')),
                ('antihistaminicos', models.CharField(max_length=100, verbose_name='Antihistaminicos')),
                ('ind_antis', models.TextField(verbose_name='Indicaciones antihistaminicos')),
                ('anticoagulantes', models.CharField(max_length=100, verbose_name='Anticoagulantes')),
                ('ind_antic', models.TextField(verbose_name='Indicaciones Anticoagulantes')),
                ('antihipertensivo', models.CharField(max_length=100, verbose_name='Antihipertensivo')),
                ('ind_antih', models.TextField(verbose_name='Indicaciones Antihipertensivo')),
                ('antidiabeticos', models.CharField(max_length=100, verbose_name='Antidiabéticos')),
                ('ind_antidb', models.TextField(verbose_name='Indicaciones antidiabéticos')),
                ('antiepilepticos', models.CharField(max_length=100, verbose_name='Antiepilépticos')),
                ('ind_antiep', models.TextField(verbose_name='Indicaciones antiepilépticos')),
                ('antipsicoticos', models.CharField(max_length=100, verbose_name='Antipsicóticos')),
                ('ind_antips', models.TextField(verbose_name='Indicaciones antipsicóticos')),
                ('antiansiedad', models.CharField(max_length=100, verbose_name='Antiansiedad')),
                ('ind_antian', models.TextField(verbose_name='Indicaciones antiansiedad')),
                ('antiparasitario', models.CharField(max_length=100, verbose_name='Antiparásitario')),
                ('ind_antiparas', models.TextField(verbose_name='Indicaciones antiparásitario')),
                ('antivirales', models.CharField(max_length=100, verbose_name='Antivirales')),
                ('ind_antiv', models.TextField(verbose_name='Indicaciones antivirales')),
                ('antiarritmicos', models.CharField(max_length=100, verbose_name='Antiarrítmicos')),
                ('ind_antia', models.TextField(verbose_name='Indicaciones antiarrítmicos')),
                ('broncodilatadores', models.CharField(max_length=100, verbose_name='Broncodilatadores')),
                ('ind_bronco', models.TextField(verbose_name='Indicaciones broncodilatadores')),
                ('diureticos', models.CharField(max_length=100, verbose_name='Diuréticos')),
                ('ind_diur', models.TextField(verbose_name='Indicaciones diuréticos')),
                ('relajante_muscular', models.CharField(max_length=100, verbose_name='Relajante muscular')),
                ('ind_rm', models.TextField(verbose_name='Indicaciones Relajante muscular')),
                ('vitaminas', models.CharField(max_length=100, verbose_name='Vitaminas')),
                ('ind_vit', models.TextField(verbose_name='Indicaciones Vitaminas')),
                ('sonda', models.CharField(max_length=100, verbose_name='Sonda')),
                ('ind_sonda', models.TextField(verbose_name='Indicaciones Vitaminas')),
                ('crisis_convul', models.BooleanField(default=False, verbose_name='Crisis convulsivas')),
                ('restriccion', models.BooleanField(default=False, verbose_name='Restricción')),
                ('oxigenot', models.BooleanField(default=False, verbose_name='Oxígeno terapia')),
                ('otras_indic', models.TextField(verbose_name='Otras indicaciones')),
                ('otros_med', models.TextField(verbose_name='Otras medicamentos')),
                ('vasodilatador', models.CharField(max_length=100, verbose_name='Vasodilatador')),
                ('ind_vaso', models.TextField(verbose_name='Indicaciones vasodilatador')),
                ('estatinas', models.CharField(max_length=100, verbose_name='Estatinas')),
                ('ind_est', models.TextField(verbose_name='Indicaciones estatinas')),
                ('acido_dicarb', models.CharField(max_length=100, verbose_name='Ácido dicarboxílico')),
                ('ind_acido', models.TextField(verbose_name='Indicaciones Ácido dicarboxílico')),
                ('antimicrobiano', models.CharField(max_length=100, verbose_name='Antimicrobiano')),
                ('ind_antim', models.TextField(verbose_name='Indicaciones antimicrobiano')),
                ('ind_gener', models.TextField(verbose_name='Indicaciones generales')),
                ('indic_datoenf', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='indic_datoenf', to='asistmedica.datoenfermeria', verbose_name='IMC')),
                ('indic_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='indic_paciente', to='tsocial.paciente', verbose_name='Paciente')),
                ('indic_termo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='indic_termo', to='asistmedica.termometria', verbose_name='Temperatura')),
            ],
            options={
                'verbose_name': 'Indicación',
                'verbose_name_plural': 'Indicaciones',
                'db_table': 'indicacion',
            },
        ),
        migrations.CreateModel(
            name='ControlGucemico',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('fecha_gluc', models.DateField(blank=True, null=True, verbose_name='Fecha glucémico')),
                ('turno', models.CharField(blank=True, max_length=50, null=True, verbose_name='Turno')),
                ('resultado', models.TextField(blank=True, null=True, verbose_name='Resultado')),
                ('observaciones', models.TextField(verbose_name='Observaciones')),
                ('gluc_paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gluc_paciente', to='tsocial.paciente', verbose_name='Control Gucémico')),
            ],
            options={
                'verbose_name': 'Control Gucémico',
                'verbose_name_plural': 'Controles Gucémicos',
                'db_table': 'controlgucemico',
            },
        ),
    ]
