from django.shortcuts import render
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
    

    