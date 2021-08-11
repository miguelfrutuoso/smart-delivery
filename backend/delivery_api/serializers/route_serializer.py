from rest_framework import serializers
from delivery.models import Route, Order, orderTimelocation
from .order_serializer import OrderSerializer

class routeSerializer(serializers.ModelSerializer):

    orders = serializers.PrimaryKeyRelatedField(many=True, read_only=False, queryset=Order.objects.all())
    
    class Meta:
        model = Route
        fields = ['day', 'warehouse', 'start_time', 'orders']


    def create(self, validated_data):

        keys_to_extract = ['day', 'warehouse', 'start_time']
        route_subset = {key: validated_data[key] for key in keys_to_extract}

        route = Route.objects.create(**route_subset)

        bulk = []
        for order_data in validated_data['orders']:
            Order.objects.filter(id=order_data.id).update(route=route)

            for orderTL in orderTimelocation.objects.filter(order=order_data)[0:1]:
                orderTL.selected = True
                bulk.append(orderTL)

            orderTimelocation.objects.bulk_update(bulk, ['selected']) 
         
        return route

class routeWithDetailsSerializer(serializers.ModelSerializer):

    orders = OrderSerializer(many=True)
    
    class Meta:
        model = Route
        fields = ['day', 'warehouse', 'start_time', 'orders']

    