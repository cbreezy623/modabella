from django.db import models
from django.utils.translation import gettext_lazy as _
from appointments.models import Appointment, SchedulerAppointment
from products.models import Product
from services.models import Service, Modifier
from decimal import *

class PaymentMethod(models.TextChoices):
    CASH = 'cash', _('Cash')
    CARD = 'card', _('Credit/Debit Card')
    CHECK = 'check', _('Check')
    SPLIT = 'split', _('Split')

# Create your models here.
class PSale(models.Model):
    appointment = models.ForeignKey(SchedulerAppointment, on_delete=models.PROTECT)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    unitSalePrice = models.DecimalField(max_digits=10, decimal_places=2)
    payment = models.CharField(
        max_length = 5,
        choices=PaymentMethod.choices,
        default=PaymentMethod.CASH
    )

    TAX = Decimal(0.055)
    PRECISION = 7

    @property
    def unitTax(self):
        return round(self.TAX * Decimal(self.unitSalePrice), self.PRECISION)

    @property
    def subtotal(self):
        subtotal = Decimal(self.quantity) * Decimal(self.unitSalePrice)
        subtotal = round(subtotal, self.PRECISION)
        return '{:.2f}'.format(subtotal)

    @property
    def tax(self):
        tax = Decimal(self.quantity) * self.TAX * Decimal(self.unitSalePrice)
        tax = round(tax, self.PRECISION)
        return tax

    @property
    def total(self):
        subtotal = Decimal(self.quantity) * Decimal(self.unitSalePrice)
        subtotal = round(subtotal, self.PRECISION)
        return round(subtotal + self.quantity * self.unitTax, self.PRECISION)

    @property
    def name(self):
        return self.product.name

    def __str__(self):
        return 'Product Sale: (' + str(self.quantity) + 'x)' + str(self.product) + ' ' + str(self.appointment)

class SSale(models.Model):
    appointment = models.ForeignKey(SchedulerAppointment, on_delete=models.PROTECT)
    service = models.ForeignKey(Service, on_delete=models.PROTECT)
    salePrice = models.DecimalField(max_digits=10, decimal_places=2)
    payment = models.CharField(
        max_length = 5,
        choices=PaymentMethod.choices,
        default=PaymentMethod.CASH
    )

    @property
    def name(self):
        return self.service.name

    def __str__(self):
        return str(self.service) + ' ' + str(self.appointment)

class SMSale(models.Model):
    service_sale = models.ForeignKey(SSale, on_delete=models.CASCADE)
    modifier = models.ForeignKey(Modifier, on_delete=models.PROTECT)
    salePrice = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return 'SMSale: ' + str(self.service_sale) + str(self.modifier)

class Tips(models.Model):
    appointment = models.ForeignKey(SchedulerAppointment, on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment = models.CharField(
        max_length = 5,
        choices=PaymentMethod.choices,
        default=PaymentMethod.CASH
    )

    def __str(self):
        return 'Tip: $' + str(self.amount)
