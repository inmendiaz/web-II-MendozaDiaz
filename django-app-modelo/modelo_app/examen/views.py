from django.shortcuts import render
from django.http import HttpResponse
from .models import Evento
from django.utils.timezone import now
from .models import Boleto
from .models import Producto
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


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

def VerBoletos(request, evento_id):
    boletos = Boleto.objects.filter(evento_id=evento_id)
    eventos = Evento.objects.get(id=evento_id)
    data = {
        "Boletos" : boletos,
        "Eventos": eventos
    }
    return render(request, 'examen/boletos.html', data)

@csrf_exempt
def agregar_producto(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            precio = data.get("precio")
            localidad_id = data.get("localidad_id")

            # Validar que el precio sea mayor a 0
            if precio is None or precio <= 0:
                return JsonResponse({"error": "El precio debe ser mayor a 0"}, status=400)

            # Validar que solo se puedan agregar 10 productos por día
            productos_hoy = Producto.objects.filter(fecha_creacion__date=now().date()).count()
            if productos_hoy >= 10:
                return JsonResponse({"error": "Solo se pueden agregar 10 productos por día"}, status=400)

            localidad = localidad.objects.get(id=localidad_id)
            producto = Producto.objects.create(name=name, precio=precio, localidad=localidad)

            return JsonResponse({"message": "Producto agregado con éxito", "id": producto.id}, status=201)
        except localidad.DoesNotExist:
            return JsonResponse({"error": "La localidad no existe"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Datos inválidos"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)


@csrf_exempt
def eliminar_producto(request, producto_id):
    if request.method == "DELETE":
        try:
            producto = Producto.objects.get(id=producto_id)
            producto.delete()
            return JsonResponse({"message": "Producto eliminado con éxito"}, status=200)
        except Producto.DoesNotExist:
            return JsonResponse({"error": "El producto no existe"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)

def ver_producto(request, producto_id):
    if request.method == "GET":
        try:
            producto = Producto.objects.get(id=producto_id)
            data = {
                "id": producto.id,
                "name": producto.name,
                "precio": producto.precio,
                "localidad": producto.localidad.name,
                "fecha_creacion": producto.fecha_creacion.strftime("%Y-%m-%d %H:%M:%S"),
            }
            return JsonResponse(data, status=200)
        except Producto.DoesNotExist:
            return JsonResponse({"error": "El producto no existe"}, status=404)

    return JsonResponse({"error": "Método no permitido"}, status=405)

def productos(request):
    productos = Producto.objects.all()
    return render(request, 'examen/agregar_producto.html', {'productos': productos})
