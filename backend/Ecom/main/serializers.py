from rest_framework import serializers
from .models import Vendor,Product,ProductCategory  # make sure Vendor model is imported
from django.contrib.auth.models import User  # or your custom User model


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address']

    def __init__(self, *args, **kwargs):
        super(VendorSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1 

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address']

    def __init__(self, *args, **kwargs):
        super(VendorDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1

class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'category', 'vendor','title','detail','price']

    def __init__(self, *args, **kwargs):
        super(ProductListSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1

class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'category', 'vendor','title','detail','price']

    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1
