# Generated by Django 3.0.5 on 2020-05-06 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='technology',
        ),
        migrations.AlterField(
            model_name='project',
            name='image',
            field=models.FilePathField(path='projects/static/img'),
        ),
    ]
