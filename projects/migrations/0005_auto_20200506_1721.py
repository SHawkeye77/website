# Generated by Django 3.0.5 on 2020-05-06 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_auto_20200506_1705'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='image',
            field=models.FilePathField(path='projects/static/projects/static/img'),
        ),
    ]
