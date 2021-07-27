from django.db import models
from .order import Order

class orderTimelocation(models.Model):
    longitude = models.DecimalField(decimal_places=16, max_digits=20)
    latitude = models.DecimalField(decimal_places=16, max_digits=20)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='ordertimelocation', null=True)

    