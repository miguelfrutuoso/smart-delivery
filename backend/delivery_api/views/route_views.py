from rest_framework import viewsets, filters, generics, permissions
from delivery.models import Route
from ..serializers import routeSerializer, routeWithDetailsSerializer
from django.shortcuts import get_object_or_404

class GetRoutes(generics.ListAPIView):
    queryset = Route.objects.all()
    serializer_class = routeSerializer

class CreateRoute(generics.CreateAPIView):
    queryset = Route.objects.all()
    serializer_class = routeSerializer

class CreateManualRoute(generics.CreateAPIView):
    queryset = Route.objects.all()
    serializer_class = routeSerializer

class GetRoute(generics.RetrieveAPIView):

    serializer_class = routeSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('route')
        return get_object_or_404(Route, id=item)

class GetRouteWithDetails(generics.RetrieveAPIView):

    serializer_class = routeWithDetailsSerializer

    def get_object(self, queryset=None, **kwargs):

        route = Route.objects.all().values()

        item = self.kwargs.get('route')
       # return get_object_or_404(Route, id=item, orders__ordertimelocation__selected=1)
        return get_object_or_404(Route, id=item)