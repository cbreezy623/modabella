from django.shortcuts import render
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import Product, Brand
from .serializers import BrandSerializer, ProductSerializer, ProductCreateSerializer

# Create your views here.
class BrandView(viewsets.ModelViewSet):
    serializer_class = BrandSerializer
    queryset = Brand.objects.order_by('name')

class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.order_by('name')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['brand']

    def get_serializer_class(self):
        method = self.request.method
        if method == 'PUT' or method == 'POST':
            return ProductCreateSerializer
        else:
            return ProductSerializer


def product_detail_view(request, my_id):
    obj = Product.objects.get(id=my_id)
    context = { 'object': obj }
    return render(request, "products/detail.html", context)
