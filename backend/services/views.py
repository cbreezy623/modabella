from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404

from .models import Category, Service, ServMod, Modifier
from .serializers import CategorySerializer, ServiceSerializer, ServiceCreateSerializer, ServModSerializer, ModifierSerializer, ServModCreateSerializer

# Create your views here.

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.order_by('name')

class ServiceView(viewsets.ModelViewSet):
    queryset = Service.objects.order_by('name')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']

    def get_serializer_class(self):
        method = self.request.method
        if method == 'PUT' or method == 'POST':
            return ServiceCreateSerializer
        else:
            return ServiceSerializer

class ModifierView(viewsets.ModelViewSet):
    serializer_class = ModifierSerializer
    queryset = Modifier.objects.order_by('name')

class ServModView(viewsets.ModelViewSet):
    queryset = ServMod.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['service', 'modifier']

    def get_serializer_class(self):
        method = self.request.method
        if method == 'PUT' or method == 'POST':
            return ServModCreateSerializer
        else:
            return ServModSerializer
