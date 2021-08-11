from rest_framework import serializers
from delivery.models import orderTimelocation
from .time_interval_serializer import timeIntervalSerializer
from delivery.models import timeInterval

class orderTimelocationSerializer(serializers.ModelSerializer):
    time_interval = timeIntervalSerializer(many= True)

    class Meta:
        model = orderTimelocation
        fields = ('longitude', 'latitude', 'time_interval', 'selected')


    def create(self, validated_data):
        time_intervals_data = validated_data.pop('time_interval')
        ordertimelocation = orderTimelocation.objects.create(**validated_data)
        
        for time_interval_data in time_intervals_data:
           timeInterval.objects.create(order_timelocation=ordertimelocation, **time_interval_data)
        return ordertimelocation


    # def create(self, validated_data):
    #     time_intervals_data = validated_data.pop('time_interval')
    #     ordertimelocation = orderTimelocation.objects.create(**validated_data)

    #     for time_interval_data in time_intervals_data:
    #         timeinterval_serializer = timeIntervalSerializer(data=time_interval_data)
    #         timeinterval_serializer.is_valid(raise_exception=True)
    #         timeinterval = timeinterval_serializer.save()
    #         timeinterval.ordertimelocation = ordertimelocation
    #         timeinterval.save()

    #     return ordertimelocation