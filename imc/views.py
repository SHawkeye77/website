from django.shortcuts import render
from django.template import Template
import requests

def imc(request):
    return render(request, "imc.html", {})
