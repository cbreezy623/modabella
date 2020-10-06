from django.contrib import admin
from .models import Appointment, SchedulerAppointment

# Register your models here.
admin.site.register(Appointment)
admin.site.register(SchedulerAppointment)
