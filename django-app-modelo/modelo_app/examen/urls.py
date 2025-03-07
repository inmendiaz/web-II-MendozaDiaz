from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('eventos', views.Eventos, name='Eventos'),
    path('boletos', views.Boletos, name='Boletos'),
    path('boletos/<int:evento_id>', views.VerBoletos, name='VerBoletos'),
    path("agregar_producto/", views.agregar_producto, name="agregar_producto"),
    path("eliminar_producto/<int:producto_id>/", views.eliminar_producto, name="eliminar_producto"),
    path("ver_producto/<int:producto_id>/", views.ver_producto, name="ver_producto"),
    path("productos/", views.productos, name="productos"),
    path("agregar_evento/", views.agregar_evento, name="agregar_evento"),
    path("eventos/agregar", views.eventos_agregar, name="eventos_agregar"),
    path("eliminar_evento/<int:evento_id>/", views.eliminar_evento, name="eliminar_evento"),
]

