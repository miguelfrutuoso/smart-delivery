from rest_framework import viewsets, filters, generics, permissions
from ..serializers import WarehouseSerializer
from delivery.models import Warehouse
from django.shortcuts import get_object_or_404

class GetWarehouses(generics.ListAPIView):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer

class GetWarehouseByID(generics.RetrieveAPIView):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('wh')
        return get_object_or_404(Warehouse, id=item)

class CreateWarehouse(generics.CreateAPIView):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer