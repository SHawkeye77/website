"""personal_portfolio URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from personal_portfolio import views, settings

urlpatterns = [
    # Landing page
    path('', views.landing_page, name='landing_page'),
    # All the premade admin urls: 
    path("admin/", admin.site.urls),
    # All the urls I created in the projects app
    path("projects/", include("projects.urls")),
    # All the urls I created in the blog app
    path("blog/", include("blog.urls")),
    # All the urls for my influential media collection (IMC)
    path("imc/", include("imc.urls")),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
