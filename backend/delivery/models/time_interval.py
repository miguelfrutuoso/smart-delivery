from django.db import models
from .order_timelocation import orderTimelocation

class timeInterval(models.Model):
    start = models.DateTimeField()
    end = models.DateTimeField()
    order_timelocation = models.ForeignKey(orderTimelocation, related_name='time_interval', on_delete=models.CASCADE)