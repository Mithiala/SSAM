# Generated by Django 4.2.7 on 2023-11-23 06:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('psicologia', '0002_alter_nomdepsevera_options_defectologia_resultado'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='defectologia',
            name='resultado',
        ),
    ]