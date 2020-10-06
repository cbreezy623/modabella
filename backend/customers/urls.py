from django.urls import path
from .views import customer_detail_view, customer_create_view

app_name = 'customers'
urlpatterns = [
        path('<int:my_id>/', customer_detail_view, name='customer-detail'),
        path('create/', customer_create_view, name='customer-create')
        ]
