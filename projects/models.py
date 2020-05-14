# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="images/")
