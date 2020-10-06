"""modabella URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from appointments.views import AppointmentView, AppointmentEntryView, SchedulerAppointmentView, SchedulerCustomerView, AppointmentTotalsView, SchedulerAppointmentDetailView
from customers.views import CustomerView
from products.views import BrandView, ProductView, product_detail_view
from sales.views import PSaleView, SSaleView, SMSaleView, PSaleDetailView, SSaleDetailView
from services.views import CategoryView, ServiceView, ServModView, ModifierView

router = routers.DefaultRouter()
#router.register(r'appointments', AppointmentView, 'appointment')
router.register(r'appointmentEntries', AppointmentEntryView, 'appointmentEntry')
router.register(r'appointmentsTotals', AppointmentTotalsView, 'appointmentTotals')
router.register(r'brands', BrandView, 'brand')
router.register(r'categories', CategoryView, 'category')
router.register(r'customers', CustomerView, 'customer')
router.register(r'modifiers', ModifierView, 'modifier')
router.register(r'products', ProductView, 'product')
router.register(r'psales', PSaleView, 'psale')
router.register(r'psalesDetailed', PSaleDetailView, 'psaledetailed')
router.register(r'schedulerAppointments', SchedulerAppointmentView, 'schedulerAppointment')
router.register(r'schedulerAppointmentsDetails', SchedulerAppointmentDetailView, 'schedulerAppointmentDetails')
router.register(r'schedulerCustomers', SchedulerCustomerView, 'schedulerCustomer')
router.register(r'servmods', ServModView, 'servmod')
router.register(r'smsales', SMSaleView, 'smsale')
router.register(r'ssales', SSaleView, 'ssale')
router.register(r'ssalesDetailed', SSaleDetailView, 'ssaledetailed')
router.register(r'services', ServiceView, 'service')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
