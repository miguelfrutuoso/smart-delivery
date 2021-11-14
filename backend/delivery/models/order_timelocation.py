from django.db import models
from .order import Order
from django.db.models import Q

class orderTimelocation(models.Model):
    longitude = models.DecimalField(decimal_places=16, max_digits=20)
    latitude = models.DecimalField(decimal_places=16, max_digits=20)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='ordertimelocation', related_query_name="ordertimelocation", null=True)
    selected = models.BooleanField(null=True)
    nth_order = models.IntegerField(null=True)
    
    class Meta:
        constraints = [
            models.CheckConstraint(check=(Q(selected__isnull = True) & Q(nth_order__isnull = True)) | (Q(selected__isnull = False) & Q(nth_order__isnull = False)), name='select_nth_order')
        ]