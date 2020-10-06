from django.db import models
from django.urls import reverse
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Customer(models.Model):
    first_name = models.CharField(default='', max_length=120)
    last_name = models.CharField(default='', max_length=120)
    phone = PhoneNumberField(default='', blank=True)
    email = models.EmailField(default='', blank=True)
    notes = models.TextField(default='', blank=True)

    def __str__(self):
        return 'Customer: ' + str(self.first_name) + ' ' + str(self.last_name)

    def get_absolute_url(self):
        return reverse("customers:customer-detail", kwargs={"id": self.id})
