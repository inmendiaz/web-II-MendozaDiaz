from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('eventos', views.Eventos, name='Eventos'),
    path('boletos', views.Boletos, name='Boletos'),
]