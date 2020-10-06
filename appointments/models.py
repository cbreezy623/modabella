from django.db import models
from customers.models import Customer

# Create your models here.
class Appointment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    time = models.DateTimeField()

    def __str__(self):
        return 'Appointment: ' + str(self.customer) + ' ' + str(self.time)

# Based on the react scheduler AppointmentModel interface
class SchedulerAppointment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField(null=True)
    title = models.TextField(default='', blank=True)
    allDay = models.BooleanField(null=True)
    rRule = models.TextField(default='', blank=True)
    exDate = models.TextField(default='', blank=True)
    notes = models.TextField(default='', blank=True)

    def __str__(self):
        return 'Appointment: ' + str(self.customer) + ' ' + str(self.startDate)

class AppointmentTotals(models.Model):
    appointment = models.OneToOneField(
        SchedulerAppointment,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    cash = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    card = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    check = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    tax = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    p_sub = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    s_sub = models.DecimalField(default=0, max_digits=10, decimal_places=2)
