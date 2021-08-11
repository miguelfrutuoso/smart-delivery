from rest_framework import serializers
from delivery.models import Warehouse

class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ['id', 'name', 'longitude', 'latitude']