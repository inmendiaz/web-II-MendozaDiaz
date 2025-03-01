from django.shortcuts import render
from django.http import HttpResponse
from .models import Evento
from django.utils.timezone import now
from .models import Boleto

# Create your views here.

def index(request):
    eventos = Evento.objects.all()
    return render(request, 'examen/index.html', {'eventos': eventos})

def Eventos(request):
    eventos = Evento.objects.all()
    return render(request, 'examen/eventos.html', {'eventos': eventos})

def Boletos(request):
    boletos = Boleto.objects.all()
    eventos = Evento.objects.all()
    data = {
        "Boletos" : boletos,
        "Eventos": eventos
    }
    return render(request, 'examen/boletos.html', data)
