# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

def hello_world(request):
    return render(request, 'hello_world.html', {})
