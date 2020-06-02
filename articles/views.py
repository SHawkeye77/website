from django.shortcuts import render

def articles(request):
    return render(request, "articles.html", {})

def favorite_unix_commands(request):
    return render(request, "favorite_unix_commands.html", {})

def favorite_physics_equations(request):
    return render(request, "favorite_physics_equations.html", {})

def favorite_star_wars_songs(request):
    return render(request, "favorite_star_wars_songs.html", {})

def nintendo_franchises_ranked_by_soundtrack(request):
    return render(request, "nintendo_franchises_ranked_by_soundtrack.html", {})

def an_analysis_of_human_decision_making(request):
    return render(request, "an_analysis_of_human_decision_making.html", {})

def aurebesh_translator(request):
    return render(request, "aurebesh_translator.html", {})
