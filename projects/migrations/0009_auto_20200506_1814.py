# Generated by Django 3.0.5 on 2020-05-06 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0008_auto_20200506_1741'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='image',
            field=models.FilePathField(path='/Users/SamuelHohenshell/Desktop/rp_portfolio/projects/static/images/'),
        ),
    ]
