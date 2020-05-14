from django.urls import path
from imc import views

urlpatterns = [
    path('', views.imc, name="imc")
]

