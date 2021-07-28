from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, filters, generics, permissions
from delivery.models import Order
from .serializers import OrderSerializer

class CreateOrder(generics.CreateAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class GetOrders(generics.ListAPIView):

    serializer_class = OrderSerializer

    def get_queryset(self):
        us = self.kwargs.get('us')
        return Order.objects.filter(customer_id=us) #TODO ALTERAR PARA USER LOGGED https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-the-current-user
    
class GetOrder(generics.RetrieveAPIView):

    serializer_class = OrderSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('order')
        return get_object_or_404(Order, id=item)
    
class UpdateOrder(generics.UpdateAPIView):

    serializer_class = OrderSerializer
    queryset = Order.objects.all()