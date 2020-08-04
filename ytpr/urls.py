from django.urls import path
from ytpr import views

urlpatterns = [
    path('', views.ytpr, name="ytpr")
]

