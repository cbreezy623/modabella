from django.db import models

# Create your models here.
class Brand(models.Model):
    name = models.CharField(unique=True, default='', max_length=120)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(default='', max_length=120)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'brand'], name='unique product'),
        ]

    def __str__(self):
        return self.name
