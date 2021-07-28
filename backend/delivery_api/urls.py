from django.urls import path
from .views import CreateOrder, GetOrders, GetOrder, UpdateOrder

app_name = 'delivery_api'

urlpatterns = [
    path('order/create/', CreateOrder.as_view(), name='createorder'),
    path('order/user/<int:us>', GetOrders.as_view(), name='getorders'),
    path('order/<int:order>', GetOrder.as_view(), name='getorder'),
    path('order/update/<int:pk>', UpdateOrder.as_view(), name='UpdateOrder')
]
