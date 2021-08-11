from django.db import models

class Warehouse(models.Model):
    name = models.CharField(max_length=100, null=True)
    longitude = models.DecimalField(decimal_places=16, max_digits=20)
    latitude = models.DecimalField(decimal_places=16, max_digits=20)