from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(unique=True, default='', max_length=120)

    def __str__(self):
        return self.name

class Service(models.Model):
    name = models.CharField(unique=True, default='', max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)

    def __str__(self):
        return self.name

class Modifier(models.Model):
    name = models.CharField(unique=True, default='', max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class ServMod(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    modifier = models.ForeignKey(Modifier, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['service', 'modifier'], name='unique-modifier'),
        ]

    def __str__(self):
        return self.name
