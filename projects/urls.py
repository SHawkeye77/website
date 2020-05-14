# Holds/keeps track of url patterns for "projects" app

from django.urls import path
from . import views

""" Syntax is as follows:
path("url_after_base", views.associated_view_method, name="associated_name"),
"""

urlpatterns = [
    path("", views.project_index, name="project_index"),
    path("<int:pk>/", views.project_detail, name="project_detail"),
]

