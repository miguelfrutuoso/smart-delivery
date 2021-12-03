from rest_framework import serializers
from delivery.models import Route, Order, orderTimelocation, timeInterval
from .time_interval_serializer import timeIntervalSerializer
from .order_serializer import OrderSerializer
import numpy as np
from itertools import product
from ..ortools import vrptw, vrptw_optimized

class routeSerializer(serializers.ModelSerializer):

    orders = serializers.PrimaryKeyRelatedField(many=True, read_only=False, queryset=Order.objects.all())
    
    class Meta:
        model = Route
        fields = ['id', 'day', 'warehouse', 'start_time', 'orders',]


    def create(self, validated_data):

        keys_to_extract = ['day', 'warehouse', 'start_time']
        route_subset = {key: validated_data[key] for key in keys_to_extract}

        route = Route.objects.create(**route_subset)

        orders = []

        warehouse = {}
        warehouse['latitude'] = getattr(route_subset['warehouse'], 'latitude')
        warehouse['longitude'] = getattr(route_subset['warehouse'], 'longitude')
            
        idx = 0

        for order_data in validated_data['orders']: #build orders with otl's array
            order = list(orderTimelocation.objects.filter(order=order_data).prefetch_related('time_interval').values('id', 'latitude', 'longitude', 'order_id', 'timeinterval'))
            for otl in order:
                interval = list(timeInterval.objects.filter(id=otl['timeinterval']).values('start', 'end'))
                interval = (interval[0]['start'], interval[0]['end'])
                otl['timeinterval'] = convert_datetime_to_hm(interval)      

            orders.append(order)

        opt_route = vrptw_optimized(orders, 420, warehouse)

        combinations = []

        for combination in product(*orders): #Build all cominations possible
            combinations.append(combination)

        print(len(combinations))

        #opt_route = vrptw(combinations, 420, warehouse)

        print(opt_route['route'])

        for idx, order in enumerate(opt_route['route']):
            if (idx != 0):
                Order.objects.filter(id=order['order_id']).update(route=route, state=Order.State.READYDIS)
                orderTimelocation.objects.filter(id=order['id']).update(selected=True, nth_order=idx)
        
        return route
      

class routeWithDetailsSerializer(serializers.ModelSerializer):

    orders = OrderSerializer(many=True)
    
    class Meta:
        model = Route
        fields = ['day', 'warehouse', 'start_time', 'orders']

def convert_datetime_to_hm(interval):
    return(interval[0].hour * 60 + interval[0].minute, interval[1].hour * 60 + interval[1].minute)
    