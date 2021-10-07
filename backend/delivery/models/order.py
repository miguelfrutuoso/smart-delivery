from django.db import models
from django.conf import settings
from .route import Route
from .warehouse import Warehouse
import datetime
from django.utils.translation import gettext_lazy as _

class Order(models.Model):

    class State(models.TextChoices):
        PROCESSING = 'PR', _('Processing')
        READYCTM = 'RC', _('Ready for Custumize')
        CUSTUMIZED = 'CS', _('Custumized')
        READYDIS = 'RD', _('Ready for Distribution')
        DISTRIBUTION = 'DT', _('Distribution')
        COMPLETE = 'CP', _('Complete')

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='customer')
    retailer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='retailer')
    date_publish = models.DateField(default=datetime.date.today)
    date_available = models.DateField()
    weight = models.DecimalField(decimal_places=2, max_digits=5)
    description = models.CharField(max_length=500, null=True)
    route = models.ForeignKey(Route, related_name='orders', related_query_name="orders", null=True, on_delete=models.CASCADE)
    state = models.CharField(max_length=2, choices=State.choices, default=State.PROCESSING)
    warehouse = models.ForeignKey(Warehouse, related_name='warehouse', null=True, on_delete=models.CASCADE)