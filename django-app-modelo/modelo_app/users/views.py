from django.shortcuts import render
from .models import Users
from django.http import HttpResponse

# Create your views here.

def indexUsers(request):
    users = Users.objects.all()
    data = {
        "Titulo" : "Lista de clientes",
        "Usuario" : users
    }
    return render(request, 'users/index.html', data)