from django.shortcuts import render
from django.http import HttpResponse
from .models import Evento
from django.utils.timezone import now
from .models import Boleto
from .models import Producto
from .models import Localidad
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime
from django.utils.timezone import make_aware

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

            if not localidad_id or not str(localidad_id).isdigit():
                return JsonResponse({"error": "ID de localidad inválido"}, status=400)

            if not Localidad.objects.filter(id=localidad_id).exists():
                return JsonResponse({"error": "La localidad no existe"}, status=404)

            localidad = Localidad.objects.get(id=localidad_id)

            if precio is None or precio <= 0:
                return JsonResponse({"error": "El precio debe ser mayor a 0"}, status=400)

            productos_hoy = Producto.objects.filter(fecha_creacion__date=now().date()).count()
            if productos_hoy >= 10:
                return JsonResponse({"error": "Solo se pueden agregar 10 productos por día"}, status=400)

            producto = Producto.objects.create(name=name, precio=precio, localidad=localidad)

            return JsonResponse({"message": "Producto agregado con éxito", "id": producto.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Datos inválidos"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Metodo no permitido"}, status=405)


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

    return JsonResponse({"error": "Metodo no permitido"}, status=405)

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

    return JsonResponse({"error": "Metodo no permitido"}, status=405)

def productos(request):
    productos = Producto.objects.all()
    localidades = Localidad.objects.all()
    return render(request, 'examen/agregar_producto.html', {'productos': productos, 'localidades': localidades})

@csrf_exempt
def agregar_evento(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            fecha_inicio = data.get("fecha_inicio")
            fecha_fin = data.get("fecha_fin")
            localidad_id = data.get("localidad_id")

            if not name or not fecha_inicio or not fecha_fin or not localidad_id:
                return JsonResponse({"error": "Todos los campos son obligatorios"}, status=400)

            fecha_inicio = datetime.fromisoformat(fecha_inicio)
            fecha_fin = datetime.fromisoformat(fecha_fin)

            fecha_inicio = make_aware(fecha_inicio)
            fecha_fin = make_aware(fecha_fin)

            if fecha_inicio < now():
                return JsonResponse({"error": "La fecha de inicio debe ser mayor o igual a hoy"}, status=400)

            if fecha_fin <= fecha_inicio:
                return JsonResponse({"error": "La fecha de fin debe ser mayor que la fecha de inicio"}, status=400)

            if not Localidad.objects.filter(id=localidad_id).exists():
                return JsonResponse({"error": "La localidad no existe"}, status=404)

            localidad = Localidad.objects.get(id=localidad_id)

            ultimo_evento = Evento.objects.filter(localidad=localidad).order_by('-fecha_fin').first()
            if ultimo_evento and ultimo_evento.fecha_fin >= fecha_inicio:
                return JsonResponse({"error": "No puedes agregar eventos consecutivos en la misma localidad sin intervalo"}, status=400)

            evento = Evento.objects.create(
                name=name,
                fecha_inicio=fecha_inicio,
                fecha_fin=fecha_fin,
                localidad=localidad
            )

            return JsonResponse({"message": "Evento agregado con éxito", "id": evento.id}, status=201)

        except ValueError:
            return JsonResponse({"error": "Formato de fecha inválido. Usa YYYY-MM-DDTHH:MM:SS"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt 
def eliminar_evento(request, evento_id):
    if request.method == "DELETE":
        try:
            evento = Evento.objects.get(id=evento_id)
            evento.delete()
            return JsonResponse({"message": "Evento eliminado con éxito"}, status=200)
        except Evento.DoesNotExist:
            return JsonResponse({"error": "El evento no existe"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Método no permitido"}, status=405)

def eventos_agregar(request):
    eventos = Evento.objects.all()
    localidades = Localidad.objects.all()
    return render(request, 'examen/agregar_evento.html', {'eventos': eventos, 'localidades': localidades})

