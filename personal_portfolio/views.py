# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

def landing_page(request):
    return render(request, 'landing_page.html', {})
