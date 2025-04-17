from django.shortcuts import render,HttpResponse
from rest_framework import generics,permissions
from .import serializers
from .import models
# Create your views here.
class VendorList(generics.ListAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorSerializer
    # permission_classes=[permissions.IsAuthenticated]

class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]
 
class ProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    # permission_classes=[permissions.IsAuthenticated]
 
class ProductDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]
 