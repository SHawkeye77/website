# Generated by Django 3.0.5 on 2020-05-06 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0007_auto_20200506_1733'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='image',
            field=models.FilePathField(path='/'),
        ),
    ]
