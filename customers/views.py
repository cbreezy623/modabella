from django.shortcuts import render, get_object_or_404
from rest_framework import generics, viewsets, permissions

from .forms import CustomerForm
from .models import Customer
from .serializers import CustomerSerializer

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

# Create your views here.
def customer_create_view(request):
    form = CustomerForm(request.POST or None)
    if form.is_valid():
        form.save()
        form = CustomerForm()

    context = {
            'form': form
            }
    return render(request, "customers/create_form.html", context)

def customer_detail_view(request, my_id):
    #obj = Customer.objects.get(id=my_id)
    obj = get_object_or_404(Customer, id=my_id)
    context = {
            'object': obj
            }
    return render(request, "customers/detail.html", context)
