# Holds/keeps track of url patterns for "projects" app

from django.urls import path
from . import views

""" Syntax is as follows:
path("url_after_base", views.associated_view_method, name="associated_name"),
"""

urlpatterns = [
    path("", views.project_index, name="project_index"),
    path("game_1/", views.game_1, name="game_1"),
    path("alien_invasion/", views.alien_invasion, name="alien_invasion"),
    path("website/", views.website, name="website"),
    path("stj/", views.stj, name="stj"),
    path("ttt/", views.ttt, name="ttt"),
    path("encrypt_word/", views.encrypt_word, name="encrypt_word"),
    path("cgol/", views.cgol, name="cgol"),
    path("chatbot/", views.chatbot, name="chatbot"),
    path("swrpg_dice/", views.swrpg_dice, name="swrpg+dice"),
    path("voice_emulator/", views.voice_emulator, name="voice_emulator"),
    path("hoenn_tour/", views.hoenn_tour, name="hoenn_tour"),
]

