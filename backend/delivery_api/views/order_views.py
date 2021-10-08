from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, filters, generics, permissions
from delivery.models import Order, orderTimelocation, Warehouse, timeInterval
from users.models import User
from ..serializers import OrderSerializer, orderTimelocationSerializer
from math import pi, sin, cos, sqrt, atan2
from django.utils import timezone
from datetime import datetime, timedelta
from decimal import Decimal
from django.conf import settings
from django.utils.timezone import make_aware
from .warehouse_views import GetWarehouseByID
from django.http import HttpResponse
import io
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.timezone import now
from celery.decorators import task, periodic_task
from celery.utils.log import get_task_logger
from celery.task.schedules import crontab
from collections import OrderedDict

class CreateOrder(generics.CreateAPIView):
    '''
        Create a order
    '''
    #permission_classes = [permissions.IsAuthenticated]
    #authentication_classes = (JWTAuthentication,)

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class RejectOrder(generics.UpdateAPIView):
    """
        Accept an order
    """
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)

    serializer_class = OrderSerializer

    def put(self, request, *args, **kwargs):
        order = self.kwargs.get('id')
        return HttpResponse(Order.objects.filter(id = order).update(state=Order.State.REJECTED))

class GetAllOrders(generics.ListAPIView):
    '''
        Get all orders
    '''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class GetNLastOrders(generics.ListAPIView):
    
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)

    serializer_class = OrderSerializer

    def get_queryset(self):
        n = self.kwargs.get('n')
        return Order.objects.filter(date_available__gte = datetime.today()).order_by('date_available')[:n]

class GetFilteredOrders(generics.ListAPIView):
    '''
        Get orders between two dates
    '''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)

    serializer_class = OrderSerializer

    def get_queryset(self):
        options = ['id', 'date_available', '-date_available']
        date_min = self.kwargs.get('date_min')
        print(date_min)
        date_max = self.kwargs.get('date_max')
        by = self.kwargs.get('by')
        return Order.objects.filter(date_available__gte = date_min, date_available__lte = date_max).order_by(options[by])


class GetOrders(generics.ListAPIView):
    '''
        Get logged user Ready To Custumize orders
    '''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)

    serializer_class = OrderSerializer

    def get_queryset(self):
        us = self.kwargs.get('us')
        return Order.objects.filter(customer_id=us, state=Order.State.READYCTM) #TODO ALTERAR PARA USER LOGGED https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-the-current-user

def GetOrdersByIDs(request):
    '''
        Get orders by id's
    '''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)


    ids = request.GET.getlist('order')
    objects = Order.objects.filter(id__in=ids)
    serializer = OrderSerializer(data=objects, many=True)
    serializer.is_valid()
    json = JSONRenderer().render(serializer.data)
    stream = io.BytesIO(json)
    data = JSONParser().parse(stream)

    return HttpResponse(data)

class GetOrder(generics.RetrieveAPIView):
    '''
        Get order by ID
    '''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)

    serializer_class = OrderSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('order')
        return get_object_or_404(Order, id=item)
    
class UpdateOrder(generics.UpdateAPIView):
    '''
        Update an order
    '''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)

    serializer_class = OrderSerializer
    queryset = Order.objects.all()

class GetOrdersByRangeTime(generics.ListAPIView):
    '''
        Get orders given a datetime interval 
    '''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)

    serializer_class = OrderSerializer
        
    def get_queryset(self):
        
        date = self.kwargs.get('date')
        orders = Order.objects.filter(ordertimelocation__timeinterval__start__gte=make_aware(date), 
            ordertimelocation__timeinterval__end__lte=make_aware(date + timedelta(days=1))).distinct()
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
    
class GetProcessingOrders(generics.ListAPIView):
    """
        Get orders in processing state
    """
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)

    serializer_class = OrderSerializer
    
    def get_queryset(self):
        wh = self.kwargs.get('wh')

        return Order.objects.filter(warehouse=wh, state=Order.State.PROCESSING)

class AcceptOrder(generics.UpdateAPIView):
    """
        Accept an order
    """
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (JWTAuthentication,)

    serializer_class = OrderSerializer

    def put(self, request, *args, **kwargs):
        order = self.kwargs.get('id')
        return HttpResponse(Order.objects.filter(id = order).update(state=Order.State.READYCTM, date_available=datetime.today()))
        
#class PassToRCtoCS(generics.UpdateAPIView):


#@periodic_task(run_every=(crontab(minute='*/15')), name="some_task", ignore_result=True)
def ChangeToRCtoCS():

    #OTL = orderTimelocationSerializer()

    OTL = OrderedDict()

    #User.objects.filter(id=1)

    #orders = Order.objects.filter(date_available=datetime.today() - timedelta(days=2), state=Order.State.READYCTM)
    orders = Order.objects.filter(state=Order.State.READYCTM)
    
    for order in orders:
        user = order.customer
        location = User.objects.filter(id=user.id).values('standart_latitude', 'standart_longitude')[0]
        otl = orderTimelocation.objects.create(order=order, longitude=location['standart_longitude'], latitude=location['standart_latitude'], selected=True)
        today = datetime.today()
        timeInterval.objects.create(order_timelocation=otl, start=make_aware(datetime(today.year, today.month, today.day, 7, 0)), end=make_aware(datetime(today.year, today.month, today.day, 19, 0)))
        Order.objects.filter(id=order.id).update(state=Order.State.CUSTUMIZED)


class TryChange(generics.ListAPIView):

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        ChangeToRCtoCS()
    

def inRange(lon1, lat1, lon2, lat2, range): # Check if 2 locations(longitude, latitude) are less than 'range' meters apart 

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

