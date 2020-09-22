from django.urls import path
from articles import views

urlpatterns = [
    path('', views.articles,
         name='articles'),
    path('favorite_unix_commands', views.favorite_unix_commands,
         name='favorite_unix_commands'),
    path('favorite_physics_equations', views.favorite_physics_equations,
         name="favorite_physics_equations"),
    path('favorite_star_wars_songs', views.favorite_star_wars_songs,
         name="favorite_star_wars_songs"),
    path("nintendo_franchises_ranked_by_soundtrack", views.nintendo_franchises_ranked_by_soundtrack,
         name="nintendo_franchises_ranked_by_soundtrack"),
    path("an_analysis_of_human_decision_making", views.an_analysis_of_human_decision_making,
         name="an_analysis_of_human_decision_making"),
    path("aurebesh_translator", views.aurebesh_translator,
         name="aurebesh_translator"),
    path("rokos_baselisk", views.rokos_baselisk,
         name="rokos_baselisk"),
    path("dangers_of_phishing", views.dangers_of_phishing,
         name="dangers_of_phishing"),
]

""" Note: The following were in the urlpatterns list but they had to be removed because of Heroku policy.
    
    path("wells_fargo_login", views.wells_fargo_login,
        name="wells_fargo_login"),
    path("phishing_warning", views.phishing_warning,
        name="phishing_warning"),
"""