from rest_framework import serializers
from delivery.models import timeInterval

class timeIntervalSerializer(serializers.ModelSerializer):
    class Meta:
        model = timeInterval
        fields = ['start', 'end']