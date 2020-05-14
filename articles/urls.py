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
]

