from django.urls import path
from .views import CreateOrder, GetOrders

app_name = 'delivery_api'

urlpatterns = [
    path('order/create/', CreateOrder.as_view(), name='createorder'),
    path('order/<int:us>', GetOrders.as_view(), name='getorders')
]
