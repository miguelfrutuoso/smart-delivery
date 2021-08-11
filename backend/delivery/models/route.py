from django.db import models
from django.conf import settings
import datetime
from .warehouse import Warehouse

class Route(models.Model):
    day = models.DateField()
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE) 
    start_time = models.TimeField()