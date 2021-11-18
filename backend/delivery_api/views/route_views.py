from rest_framework import viewsets, filters, generics, permissions
from delivery.models import Route
from users.models import User
from ..serializers import routeSerializer, routeWithDetailsSerializer
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from ..permissions import isAdminPermission
from datetime import datetime
from django.http import HttpResponse

class GetRoutes(generics.ListAPIView):
    '''
        Get all routes
    '''
    permission_classes = [isAdminPermission]
    authentication_classes = (JWTAuthentication,)

    queryset = Route.objects.all()
    serializer_class = routeSerializer

class CreateRoute(generics.CreateAPIView):
    '''
        Create a route
    '''
    permission_classes = [isAdminPermission]
    authentication_classes = (JWTAuthentication,)

    queryset = Route.objects.all()
    serializer_class = routeSerializer

class CreateManualRoute(generics.CreateAPIView):
    permission_classes = [isAdminPermission]
    authentication_classes = (JWTAuthentication,)
    
    queryset = Route.objects.all()
    serializer_class = routeSerializer

class GetRoute(generics.RetrieveAPIView):
    '''
        Get a single route based on an id
    '''
    permission_classes = [isAdminPermission]
    authentication_classes = (JWTAuthentication,)

    serializer_class = routeSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('route')
        return get_object_or_404(Route, id=item)

class GetRouteWithDetails(generics.RetrieveAPIView):
    # permission_classes = [isAdminPermission]
    # authentication_classes = (JWTAuthentication,)

    serializer_class = routeWithDetailsSerializer
    def get_queryset(self):

        item = self.kwargs.get('pk')

        return Route.objects.filter(id=item)

class GetNLastRoutes(generics.ListAPIView):
    '''
        Get n last routes
    '''
    permission_classes = [isAdminPermission]
    authentication_classes = (JWTAuthentication,)

    serializer_class = routeSerializer

    def get_queryset(self):
        n = self.kwargs.get('n')
        return Route.objects.filter(day__gte = datetime.today()).order_by('day')[:n]

class GetFilteredRoutes(generics.ListAPIView):
    '''
        Get Routes between two dates
    '''
    permission_classes = [isAdminPermission]
    authentication_classes = (JWTAuthentication,)

    serializer_class = routeSerializer

    def get_queryset(self):
        options = ['id', 'date_available', '-date_available']
        date_min = self.kwargs.get('date_min')
        print(date_min)
        date_max = self.kwargs.get('date_max')
        by = self.kwargs.get('by')
        return Route.objects.filter(day__gte = date_min, day__lte = date_max).order_by(options[by])

class GetRoutesByWarehouse(generics.ListAPIView):
    '''
        Get routes warehouse routes
    '''
    permission_classes = [isAdminPermission]
    authentication_classes = (JWTAuthentication,)

    serializer_class = routeSerializer

    def get_queryset(self):
        wh = self.kwargs.get('wh')
        return Route.objects.filter(warehouse= wh)

class GetNonAssignedRoutes(generics.ListAPIView):
    ''' 
        Get non assigned routes
    '''
    permission_classes = [isAdminPermission]
    authentication_classes = (JWTAuthentication,)

    serializer_class = routeSerializer

    def get_queryset(self):
        wh = self.kwargs.get('wh')
        return Route.objects.filter(driver__isnull= True)

class AssignRoute(generics.UpdateAPIView):
    '''
        Assign a route to a driver 
    '''
    permission_classes = [isAdminPermission]
    authentication_classes = (JWTAuthentication,)

    serializer_class = routeSerializer

    def put(self, request, *args, **kwargs):
        driver = self.kwargs.get('driver')
        route = self.kwargs.get('route')
        return HttpResponse(Route.objects.filter(id = route).update(driver=driver))

class TodayDriverRoutes(generics.ListAPIView):
    '''
        Get today's driver routes
    '''
    #permission_classes = [isAdminPermission]
    #authentication_classes = (JWTAuthentication,)

    serializer_class = routeSerializer

    def get_queryset(self):
        driver = self.kwargs.get('driver')
        return Route.objects.filter(driver = driver, day=datetime.today())

class PastDriverRoutes(generics.ListAPIView):
    '''
        Get today's driver routes
    '''
    #permission_classes = [isAdminPermission]
    #authentication_classes = (JWTAuthentication,)

    serializer_class = routeSerializer

    def get_queryset(self):
        driver = self.kwargs.get('driver')
        return Route.objects.filter(driver = driver, day__lte=datetime.today())

class NextDriverRoutes(generics.ListAPIView):
    '''
        Get next driver's routes
    '''
    authentication_classes = (JWTAuthentication,)
    serializer_class = routeSerializer

    def get_queryset(self):
        driver = self.kwargs.get('pk')
        return Route.objects.filter(driver_id = driver, day__gte=datetime.today())