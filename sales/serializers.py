from rest_framework import serializers
from .models import PSale, SSale, SMSale

class PSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PSale
        fields = ('id',
                  'appointment',
                  'product',
                  'name',
                  'quantity',
                  'unitSalePrice',
                  'unitTax',
                  'payment',
                  'subtotal',
                  'tax',
                  'total'
        )

class PSaleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PSale
        fields = ('id',
                  'appointment',
                  'product',
                  'name',
                  'quantity',
                  'unitSalePrice',
                  'unitTax',
                  'payment',
                  'subtotal',
                  'tax',
                  'total'
        )
        depth = 2

class SSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SSale
        fields = ('id',
                  'appointment',
                  'service',
                  'name',
                  'payment',
                  'salePrice',
        )

class SSaleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SSale
        fields = ('id',
                  'appointment',
                  'service',
                  'name',
                  'payment',
                  'salePrice',
        )
        depth = 1

class SMSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SMSale
        fields = '__all__'
