# Generated by Django 4.2.7 on 2023-11-20 00:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('asistmedica', '0006_alter_indicevalue_estado_general_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='datoenfermeria',
            name='imc',
        ),
    ]
