from rest_framework import serializers
from database.models import Product,Sale,Customer,County

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"

class SaleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sale
        fields = "__all__"

class CustomerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = "__all__"

class CountySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = County
        fields = "__all__"