from django.shortcuts import render, get_object_or_404
from .models import Users
from django.http import HttpResponse
from django.http import JsonResponse
from django.utils.timezone import now
from django.shortcuts import redirect
import json

# Create your views here.

def indexUsers(request):
    users = Users.objects.all()
    data = {
        "Titulo" : "Lista de clientes",
        "Usuario" : users
    }
    return render(request, 'users/index.html', data)

def createUserView(request):
    return render(request, "users/create.html")

def createUserByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    return JsonResponse({
        "NOMBRE_RECIBIDO": body.get("name")
    })

def user_list(request):
    return render(request, "users/user_list.html")

def editar_usuario(request, id):
    usuario = get_object_or_404(Users, id=id)

    if request.method == 'POST':
        usuario.name = request.POST['name']
        usuario.email = request.POST['email']
        usuario.age = request.POST['age']
        usuario.rfc = request.POST['rfc']
        usuario.photo = request.POST['photo']
        usuario.save()
        return redirect('indexUsers')

    return render(request, 'users/edit_user.html', {'usuario': usuario})

def createUser(request):
    data = {}
    try:
        if request.method == "POST":
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age")
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")
            

            user = Users(name=name, email=email, age=age, rfc=rfc, photo=photo,created_date=now(),updated_date=now())
            user.save()
            data["user"] = user
            data["message"] = "User created"
            data["status"] = "success"
    except Exception as e:
        data["message"] = str(e)
        data["status"] = "error"


    return render (request, "users/create.html", data)

def userDetail(request, id):
    user = get_object_or_404(Users, id=id)
    #user = Users.objects.get(id=id)
    data = {
        "users" : user
    }
    return render(request, "users/detail.html", data)
