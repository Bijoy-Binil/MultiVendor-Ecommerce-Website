from django.shortcuts import render,HttpResponse
from rest_framework import generics,permissions
from .import serializers
from .import models
# Create your views here.

# ==============================VendorView==========================================
class VendorList(generics.ListAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorSerializer
    # permission_classes=[permissions.IsAuthenticated]

class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]

# ==============================ProductView==========================================
 
class ProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    # permission_classes=[permissions.IsAuthenticated]
 
class ProductDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]

# ==============================CustomerView==========================================

class CustomerList(generics.ListCreateAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerSerializer
    # permission_classes=[permissions.IsAuthenticated]
 
class CustomerDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]
 

# ==============================OrderView==========================================

class OrderList(generics.ListCreateAPIView):
    queryset=models.Order.objects.all()
    serializer_class=serializers.OrderSerializer
    # permission_classes=[permissions.IsAuthenticated]
 
class OrderDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Order.objects.all()
    serializer_class=serializers.OrderDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]
 
# ==============================OrderItemsView==========================================

class OrderItemsList(generics.ListCreateAPIView):
    queryset=models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer
    # permission_classes=[permissions.IsAuthenticated]
 
class OrderItemsDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]
 