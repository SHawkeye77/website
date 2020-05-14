# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from projects.models import Project

# View for the project_index section. Holds general info on the projects
def project_index(request):
    # Database query to get all objects in the "Project" table
    projects = Project.objects.all()
    # Context dictionary that holds info about our template
    context = {
        'projects': projects
    }
    return render(request, 'project_index.html', context)

# View for project_detail. Will give us more info on individual projects.
def project_detail(request, pk):
    # Querying to find project key associated with given argument of project key
    project = Project.objects.get(pk=pk)
    # Context dictionart that holds info about our template
    context = {
        'project': project
    }
    return render(request, 'project_detail.html', context)


