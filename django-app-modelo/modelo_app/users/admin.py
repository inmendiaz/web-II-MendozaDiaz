from django.contrib import admin

# Register your models here.
from .models import Users

admin.site.register(Users)

from .models import Users_adress

admin.site.register(Users_adress)