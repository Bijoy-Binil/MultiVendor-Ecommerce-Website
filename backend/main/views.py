from . import models
from. import serializers
from rest_framework import generics
# Create your views here.

# ======================VendorList===================
class VendorList(generics.ListCreateAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorSerializer

class VendorDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorSDetailSerializer
# ======================VendorList===================


# ======================ProductList===================
class ProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductSerializer

class ProductDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductDetailSerializer
# ======================ProductList===================


# ======================CustomerList===================
class CustomerList(generics.ListCreateAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerDetailSerializer

class CustomerDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerDetailSerializer
# ======================CustomerList===================

# ======================OrderList===================
class OrderList(generics.ListCreateAPIView):
    queryset=models.Order.objects.all()
    serializer_class=serializers.CustomerDetailSerializer

class OrderDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Order.objects.all()
    serializer_class=serializers.CustomerDetailSerializer
# ======================OrderList===================

# ======================OrderItemsList===================
class OrderItemsList(generics.ListCreateAPIView):
    queryset=models.OrderItems.objects.all()
    serializer_class=serializers.CustomerDetailSerializer

class OrderItemsDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.OrderItems.objects.all()
    serializer_class=serializers.CustomerDetailSerializer
# ======================OrderItemsList===================
