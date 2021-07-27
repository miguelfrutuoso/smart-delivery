from django.db import models
from django.conf import settings
import datetime

class Order(models.Model):

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='customer')
    retailer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='retailer')
    date_publish = models.DateField(default=datetime.date.today)
    date_available = models.DateField()
    weight = models.DecimalField(decimal_places=2, max_digits=5)
    description = models.CharField(max_length=500, null=True)
    