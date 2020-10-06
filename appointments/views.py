from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import views, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
from .models import Appointment, SchedulerAppointment, AppointmentTotals
from .serializers import AppointmentSerializer, AppointmentEntrySerializer, SchedulerAppointmentSerializer, AppointmentTotalsSerializer, AppointmentTotalsCreateSerializer, SchedulerAppointmentDetailSerializer
from customers.models import Customer

class AppointmentView(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

class AppointmentEntryView(viewsets.ViewSet):
    def list(self, request, format=None):
        q1 = AppointmentTotals.objects.all()
        start = self.request.query_params.get('start', None)
        end = self.request.query_params.get('end', None)
        customer = self.request.query_params.get('customer', None)

        if (start is not None) and (end is not None):
            q1 = q1.filter(appointment__startDate__range=(start, end))

        if customer is not None:
            q1 = q1.filter(appointment__customer__id=customer)

        d = []
        for e in q1:
            d.append({
                "id": e.appointment.id,
                "c_id": e.appointment.customer.id,
                "first_name": e.appointment.customer.first_name,
                "last_name": e.appointment.customer.last_name,
                "startDate": e.appointment.startDate,
                "endDate": e.appointment.endDate,
                "cash": e.cash,
                "card": e.card,
                "check": e.check,
                "p_sub": e.p_sub,
                "s_sub": e.s_sub,
                "tax": e.tax,
                "subtotal":e.subtotal,
            })
        return Response(d)

class SchedulerAppointmentView(viewsets.ModelViewSet):
    serializer_class = SchedulerAppointmentSerializer

    def get_queryset(self):
        queryset = SchedulerAppointment.objects.all()
        start = self.request.query_params.get('start', None)
        end = self.request.query_params.get('end', None)

        if (start is not None) and (end is not None):
            queryset = queryset.filter(startDate__range=(start, end))

        return queryset

class SchedulerAppointmentDetailView(viewsets.ModelViewSet):
    serializer_class = SchedulerAppointmentDetailSerializer
    queryset = SchedulerAppointment.objects.all()

class SchedulerCustomerView(viewsets.ViewSet):
    def list(self, request, format=None):
        q1 = Customer.objects.all()
        d = []
        for e in q1:
            d.append({
                "id": e.id,
                "text": e.first_name + " " + e.last_name
            })
        return Response(d)

class AppointmentTotalsView(viewsets.ModelViewSet):
    queryset = AppointmentTotals.objects.all()

    def get_serializer_class(self):
        method = self.request.method
        if method == 'PUT' or method == 'POST':
            return AppointmentTotalsCreateSerializer
        else:
            return AppointmentTotalsSerializer
