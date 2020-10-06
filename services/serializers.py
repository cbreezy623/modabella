from rest_framework import serializers
from .models import Category, Service, Modifier, ServMod

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class ServiceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'name', 'price', 'category')

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'name', 'price', 'category')
        depth=1

class ModifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modifier
        fields = ('id', 'name', 'price')

class ServModSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServMod
        fields = ('id', 'service', 'modifier')
        depth = 2

class ServModCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServMod
        fields = ('id', 'service', 'modifier')
