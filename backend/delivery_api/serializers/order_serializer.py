from rest_framework import serializers
from delivery.models import Order, orderTimelocation 
from .order_timelocation_serializer import orderTimelocationSerializer
from .time_interval_serializer import timeIntervalSerializer

class OrderSerializer(serializers.ModelSerializer):
    ordertimelocation = orderTimelocationSerializer(many=True)

    class Meta:
        model = Order
        fields = ['customer', 'retailer', 'date_available', 'weight', 'description', 'ordertimelocation']

    def create(self, validated_data):
        timelocations_data = validated_data.pop('ordertimelocation')
        order = Order.objects.create(**validated_data)
        
        for timelocation_data in timelocations_data:
            order_time_location_serializer = orderTimelocationSerializer(data=timelocation_data)
            order_time_location_serializer.is_valid(raise_exception=True)
            order_time_location = order_time_location_serializer.save()
            order_time_location.order = order
            order_time_location.save()

        return order

    def update(self, instance, validated_data):
        
        timelocations_data = validated_data.pop('ordertimelocation')
        ordertimelocation = instance.ordertimelocation

        for timelocation_data in timelocations_data:
            order_time_location_serializer = orderTimelocationSerializer(data=timelocation_data)
            order_time_location_serializer.is_valid(raise_exception=True)
            order_time_location = order_time_location_serializer.save()
            order_time_location.order = instance
            order_time_location.save()

        return instance