from django.shortcuts import render
from django.template import Template
import requests

def ytpr(request):
    return render(request, "ytpr.html", {})
