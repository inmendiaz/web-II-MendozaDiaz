from django.contrib import admin

# Register your models here.
from .models import Localidad

admin.site.register(Localidad)

from .models import Producto

admin.site.register(Producto)

from .models import Evento

admin.site.register(Evento)

from .models import Boleto

admin.site.register(Boleto)