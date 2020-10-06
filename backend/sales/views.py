from django.shortcuts import render
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import PSale, SSale, SMSale
from .serializers import PSaleSerializer, SSaleSerializer, SMSaleSerializer, PSaleDetailSerializer, SSaleDetailSerializer

# Create your views here.
class PSaleView(viewsets.ModelViewSet):
    serializer_class = PSaleSerializer
    queryset = PSale.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['appointment', 'payment']

class PSaleDetailView(viewsets.ModelViewSet):
    serializer_class = PSaleDetailSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['appointment', 'payment']

    def get_queryset(self):
        queryset = PSale.objects.all()
        month = self.request.query_params.get('month', None)
        start = self.request.query_params.get('start', None)
        end = self.request.query_params.get('end', None)

        if month is not None:
            queryset = queryset.filter(appointment__startDate__month=month)
        if (start is not None) and (end is not None):
            queryset = queryset.filter(appointment__startDate__range=(start, end))

        return queryset

class SSaleView(viewsets.ModelViewSet):
    serializer_class = SSaleSerializer
    queryset = SSale.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['appointment', 'payment']

class SSaleDetailView(viewsets.ModelViewSet):
    serializer_class = SSaleDetailSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['appointment', 'payment']

    def get_queryset(self):
        queryset = SSale.objects.all()
        month = self.request.query_params.get('month', None)
        start = self.request.query_params.get('start', None)
        end = self.request.query_params.get('end', None)

        if month is not None:
            queryset = queryset.filter(appointment__startDate__month=month)
        if (start is not None) and (end is not None):
            queryset = queryset.filter(appointment__startDate__range=(start, end))

        return queryset


class SMSaleView(viewsets.ModelViewSet):
    serializer_class = SMSaleSerializer
    queryset = SMSale.objects.all()
