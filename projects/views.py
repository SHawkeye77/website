# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# View for the project_index section. Holds general info on the projects
def project_index(request):
    return render(request, 'project_index.html', {})

# View game_1 page
def game_1(request):
    return render(request, "game_1.html", {})

# View alien_invasion page
def alien_invasion(request):
    return render(request, "alien_invasion.html", {})

# View website page
def website(request):
    return render(request, "website.html", {})

# View stj page
def stj(request):
    return render(request, "stj.html", {})

# View ttt page
def ttt(request):
    return render(request, "ttt.html", {})

# View encrypt_word page
def encrypt_word(request):
    return render(request, "encrypt_word.html", {})


