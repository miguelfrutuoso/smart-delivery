from django.db import models
from django.conf import settings
import datetime
from .warehouse import Warehouse
from django.db.models import Q

class Route(models.Model):
    day = models.DateField()
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE) 
    start_time = models.TimeField()
    driver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name='driver')