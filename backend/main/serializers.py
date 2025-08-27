from rest_framework import serializers
from . import models


# ======================VendorSerializer===================
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Vendor
        fields=['id','user','address']
        #depth=1
class VendorSDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Vendor
        fields=['id','user','address']
       # depth=1
# ======================VendorSerializer===================


# ======================ProductSerializer===================
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Product
        fields=['id','category','vendor','title','detail','price']
        #depth=1
class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Product
        fields=['id','category','vendor','title','detail','price']
        depth=1
# ======================ProductSerializer===================


# ======================CustomerSerializer===================
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id','user','mobile']        
        #depth=1
class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id','user','mobile']
        depth=1
# ======================CustomerSerializer===================

# ======================OrderSerializer===================
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Order
        fields=['id','user','mobile']        
        #depth=1
class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Order
        fields=['id','user','mobile']
        depth=1
# ======================CustomerSerializer===================

# ======================OrderItemsSerializer===================
class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.OrderItems
        fields=['id','user','mobile']        
        #depth=1
class OrderItemsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.OrderItems
        fields=['id','user','mobile']
        depth=1
# ======================CustomerSerializer===================