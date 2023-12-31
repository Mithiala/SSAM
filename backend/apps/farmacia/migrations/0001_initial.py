# Generated by Django 4.2.7 on 2023-11-21 22:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dispensacion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('lote', models.CharField(blank=True, max_length=50, null=True, verbose_name='Lote')),
                ('prod_med', models.CharField(blank=True, max_length=50, null=True, verbose_name='Producto')),
                ('uni_med', models.CharField(blank=True, max_length=10, null=True, verbose_name='U/M')),
                ('cant_med', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad de medicamentos')),
                ('fecha_entrada', models.DateField(blank=True, null=True, verbose_name='Fecha entrada')),
                ('fecha_salida', models.DateField(blank=True, null=True, verbose_name='Fecha salida')),
                ('fecha_vence', models.DateField(blank=True, null=True, verbose_name='Fecha vence')),
                ('clasificacion', models.CharField(blank=True, null=True, verbose_name='Clasificación')),
            ],
            options={
                'verbose_name': 'Dispensación',
                'verbose_name_plural': 'Dispensaciones',
                'db_table': 'dispensacion',
            },
        ),
        migrations.CreateModel(
            name='Donacion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('lote_don', models.CharField(blank=True, max_length=50, null=True, verbose_name='Lote')),
                ('prod_don', models.CharField(blank=True, max_length=50, null=True, verbose_name='Producto')),
                ('und_med', models.CharField(blank=True, max_length=50, null=True, verbose_name='U/M')),
                ('cant_don', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad')),
                ('fecha_venced', models.DateField(blank=True, null=True, verbose_name='Fecha vence')),
                ('don_disp', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='don_disp', to='farmacia.dispensacion', verbose_name='Donación')),
            ],
            options={
                'verbose_name': 'Donación',
                'verbose_name_plural': 'Donaciones',
                'db_table': 'donacion',
            },
        ),
        migrations.CreateModel(
            name='ControlLote',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('lotes', models.CharField(blank=True, max_length=50, null=True, verbose_name='Lote')),
                ('producto_lotes', models.CharField(blank=True, max_length=50, null=True, verbose_name='Producto')),
                ('unidad_med', models.CharField(blank=True, max_length=10, null=True, verbose_name='U/M')),
                ('cant', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad de medicamentos')),
                ('fecha_produccion', models.DateField(blank=True, null=True, verbose_name='Fecha de produccion')),
                ('fecha_vence', models.DateField(blank=True, null=True, verbose_name='Fecha vence')),
                ('cl_disp', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cl_disp', to='farmacia.dispensacion', verbose_name='Dispensación')),
            ],
            options={
                'verbose_name': 'Control Lote',
                'verbose_name_plural': 'Controles Lotes',
                'db_table': 'controllote',
            },
        ),
        migrations.CreateModel(
            name='Cobertura',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('lote_cob', models.CharField(blank=True, max_length=50, null=True, verbose_name='Lote')),
                ('tipo_med', models.CharField(blank=True, max_length=50, null=True, verbose_name='Tipo')),
                ('cantidad_cob', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad')),
                ('fecha_proxima_vencer', models.DateField(blank=True, null=True, verbose_name='Fecha próxima a vencer')),
                ('falta', models.BooleanField(default=False, verbose_name='Falta')),
                ('ocioso', models.BooleanField(default=False, verbose_name='Ocioso')),
                ('cob_disp', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cob_disp', to='farmacia.dispensacion', verbose_name='Dispensación')),
            ],
            options={
                'verbose_name': 'Cobertura',
                'verbose_name_plural': 'Coberturas',
                'db_table': 'cobertura',
            },
        ),
    ]
