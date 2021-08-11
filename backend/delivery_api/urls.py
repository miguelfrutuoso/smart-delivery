from django.urls import path, include, register_converter, re_path
from .views.order_views import CreateOrder, GetOrders, GetOrder, UpdateOrder, GetOrdersByRangeTime, GetOrdersByIDs
from .views.warehouse_views import GetWarehouses, CreateWarehouse, GetWarehouseByID
from .views.route_views import GetRoutes, CreateRoute, CreateManualRoute, GetRoute, GetRouteWithDetails
from datetime import datetime

app_name = 'delivery_api'

class DateConverter:
    regex = '\d{4}-\d{2}-\d{2}'

    def to_python(self, value):
        return datetime.strptime(value, '%Y-%m-%d')

    def to_url(self, value):
        return value

register_converter(DateConverter, 'yyyy')

order_patterns = ([
    path('create/', CreateOrder.as_view(), name='createorder'),
    path('user/<int:us>', GetOrders.as_view(), name='getorders'),
    path('<int:order>', GetOrder.as_view(), name='getorder'),
    path('update/<int:pk>', UpdateOrder.as_view(), name='UpdateOrder'),
    path('filterRangeTime/<yyyy:date>/<int:warehouse>/<int:range>', GetOrdersByRangeTime.as_view(), name='Test'),
    #re_path(r'^ids/^P<year>\d+(,\d+)*$', GetOrdersByIDs.as_view(), name='getordersbyids')
    #re_path(r'^ids/^P<year>\d+(,\d+)*$', GetOrdersByIDs, name='getordersbyids')
    path('ids/', GetOrdersByIDs, name='getordersbyids')
], 'order')

warehouse_patterns = ([
    path('', GetWarehouses.as_view(), name='getwarehouses'),
    path('create/', CreateWarehouse.as_view(), name='createwarehouse'),
    path('<int:wh>', GetWarehouseByID.as_view(), name='getwarehousesbyid')
], 'warehouse')

route_patterns = ([
    path('', GetRoutes.as_view(), name='getroutes'),
    path('create/', CreateRoute.as_view(), name='createroute'),
    path('createManual/', CreateManualRoute.as_view(), name='createmanualroute'),
    path('<int:route>', GetRouteWithDetails.as_view(), name='getroute')
], 'route')

urlpatterns = [
    path('order/', include(order_patterns)),
    path('warehouse/', include(warehouse_patterns)),
    path('route/', include(route_patterns))
]

