# Generated by Django 3.0.5 on 2020-05-06 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_auto_20200506_0548'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='image',
            field=models.ImageField(upload_to='img/'),
        ),
    ]
