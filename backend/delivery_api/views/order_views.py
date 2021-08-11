from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, filters, generics, permissions
from delivery.models import Order, orderTimelocation, Warehouse
from ..serializers import OrderSerializer, orderTimelocationSerializer
from math import pi, sin, cos, sqrt, atan2
from django.utils import timezone
import datetime
from decimal import Decimal
from django.conf import settings
from django.utils.timezone import make_aware
from .warehouse_views import GetWarehouseByID
from django.http import HttpResponse
import io
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

class CreateOrder(generics.CreateAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class GetOrders(generics.ListAPIView):

    serializer_class = OrderSerializer

    def get_queryset(self):
        us = self.kwargs.get('us')
        return Order.objects.filter(customer_id=us) #TODO ALTERAR PARA USER LOGGED https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-the-current-user

def GetOrdersByIDs(request):
    
    print("ola")
    ids = request.GET.getlist('order')
    

    objects = Order.objects.filter(id__in=ids)
    
    print(objects)
    
    serializer = OrderSerializer(data=objects, many=True)
    serializer.is_valid()
    json = JSONRenderer().render(serializer.data)
    stream = io.BytesIO(json)
    data = JSONParser().parse(stream)
    print(data)

    return HttpResponse(data)

#class GetOrdersByIDs(generics.ListAPIView):

    #serializer_class = OrderSerializer

    #request.GET.getlist('myvar')

    # def get_queryset(self):
    #     print(self)
    #     ids = self.kwargs.get('ids')
    #     return Order.objects.filter(id__in=ids)

class GetOrder(generics.RetrieveAPIView):

    serializer_class = OrderSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('order')
        return get_object_or_404(Order, id=item)
    
class UpdateOrder(generics.UpdateAPIView):

    serializer_class = OrderSerializer
    queryset = Order.objects.all()

class GetOrdersByRangeTime(generics.ListAPIView):

    serializer_class = OrderSerializer
        
    def get_queryset(self):
        
        date = self.kwargs.get('date')
        orders = Order.objects.filter(ordertimelocation__timeinterval__start__gte=make_aware(date), 
            ordertimelocation__timeinterval__end__lte=make_aware(date + datetime.timedelta(days=1))).distinct()
        warehouse = self.kwargs.get('warehouse')
        range = self.kwargs.get('range')
        warehouse = Warehouse.objects.get(id = warehouse)
         
        if orders:
            for order in orders:
                ordertimelocations = order.ordertimelocation.filter()
                if ordertimelocations:
                    orderInRange = False
                    for ordertimelocation in ordertimelocations:
                        if inRange(ordertimelocation.longitude, 
                            ordertimelocation.latitude,
                            warehouse.longitude,
                            warehouse.latitude,
                            range):
                            orderInRange = True
                            
                    if not orderInRange:
                        orders = orders.exclude(id=order.id)
                         
        return orders
    
    
def inRange(lon1, lat1, lon2, lat2, range): #Check if 2 locations(longitude, latitude) are less than 'range' meters apart 

        R = 6371e3; #meters
        φ1 = lat1 * Decimal(pi/180);
        φ2 = lat2 * Decimal(pi/180);
        Δφ = (lat2-lat1) * Decimal(pi/180);
        Δλ = (lon2-lon1) * Decimal(pi/180);

        a = sin(Δφ/2) * sin(Δφ/2) + cos(φ1) * cos(φ2) * sin(Δλ/2) * sin(Δλ/2);
        c = 2 * atan2(sqrt(a), sqrt(1-a));
        d = R * c;
        
        if (d < range):
            return True;
        else: 
            return False;

