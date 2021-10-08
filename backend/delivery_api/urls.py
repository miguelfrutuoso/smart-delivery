from django.urls import path, include, register_converter, re_path
from .views.order_views import CreateOrder, GetOrders, GetOrder, UpdateOrder, GetOrdersByRangeTime, GetOrdersByIDs, GetAllOrders, GetNLastOrders, GetFilteredOrders, GetProcessingOrders, AcceptOrder, TryChange 
from .views.warehouse_views import GetWarehouses, CreateWarehouse, GetWarehouseByID
from .views.route_views import GetRoutes, CreateRoute, CreateManualRoute, GetRoute, GetRouteWithDetails, GetNLastRoutes, GetFilteredRoutes
from .views import GetRoutesByWarehouse, RejectOrder
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
    path('all/', GetAllOrders.as_view(), name='getallorders'),
    path('create/', CreateOrder.as_view(), name='createorder'),
    path('user/<int:us>', GetOrders.as_view(), name='getorders'),
    path('<int:order>', GetOrder.as_view(), name='getorder'),
    path('update/<int:pk>', UpdateOrder.as_view(), name='UpdateOrder'),
    path('filterRangeTime/<yyyy:date>/<int:warehouse>/<int:range>', GetOrdersByRangeTime.as_view(), name='Test'),
    path('ids/', GetOrdersByIDs, name='getordersbyids'),
    path('lastorders/<int:n>', GetNLastOrders.as_view(), name='lastnorders'),
    path('filter/<yyyy:date_min>/<yyyy:date_max>/<int:by>', GetFilteredOrders.as_view(), name='filteredorders'),
    path("processing/<int:wh>", GetProcessingOrders.as_view(), name="processingorders"),
    path("accept/<int:id>", AcceptOrder.as_view(), name="acceptorders"),
    path('forceCustom/', TryChange.as_view(), name="trychange"),
    path('reject/<int:id>', RejectOrder.as_view(), name="rejectorder")
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
    path('<int:pk>', GetRouteWithDetails.as_view(), name='getroute'),
    path('lastroutes/<int:n>', GetNLastRoutes.as_view(), name='lastnorders'),
    path('filter/<yyyy:date_min>/<yyyy:date_max>/<int:by>', GetFilteredRoutes.as_view(), name='filteredroutes'),
    path('filter/warehouse/<int:wh>', GetRoutesByWarehouse.as_view(), name='routesbywarehouse')
], 'route')

urlpatterns = [
    path('order/', include(order_patterns)),
    path('warehouse/', include(warehouse_patterns)),
    path('route/', include(route_patterns))
]

