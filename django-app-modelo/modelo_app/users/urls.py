from django.urls import path

from . import views

urlpatterns = [
    path("home", views.indexUsers, name="indexUsers"),
    path("create", views.createUserView, name="createUserView"),
    path("createUser", views.createUser, name="createUser"),
    path("details-user-id/<int:id>", views.userDetail, name="userDetail"),
    path("list", views.user_list, name="user_list"),
    path("createUser-by-fetch", views.createUserByFetch, name="createUser-by-fetch"),
    path('users/<int:id>/', views.editar_usuario, name='editar_usuario'),
]
