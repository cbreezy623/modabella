from rest_framework import serializers
from .models import Appointment, SchedulerAppointment, AppointmentTotals

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class AppointmentEntrySerializer(serializers.Serializer):
    apt_id = serializers.IntegerField(read_only=True)
    c_id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(max_length=120)
    last_name = serializers.CharField(max_length=120)
    datetime = serializers.DateTimeField()

class SchedulerAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchedulerAppointment
        fields = '__all__'

class SchedulerAppointmentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchedulerAppointment
        fields = '__all__'
        depth = 1

class AppointmentTotalsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentTotals
        fields = ('appointment', 'cash', 'card', 'check', 'subtotal', 'tax', 'p_sub', 's_sub')

class AppointmentTotalsSerializer(serializers.ModelSerializer):
    appointment = SchedulerAppointmentSerializer(required=True)

    class Meta:
        model = AppointmentTotals
        fields = ('appointment', 'cash', 'card', 'check', 'subtotal', 'tax', 'p_sub', 's_sub')
