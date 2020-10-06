from django.contrib import admin

# Register your models here.
from .models import Category, Service, Modifier, ServMod

admin.site.register(Category)
admin.site.register(Service)
admin.site.register(Modifier)
admin.site.register(ServMod)
