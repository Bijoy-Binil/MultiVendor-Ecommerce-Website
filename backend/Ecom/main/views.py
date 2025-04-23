from django.shortcuts import render,HttpResponse
from rest_framework import generics,permissions,pagination,viewsets
from django.shortcuts import get_object_or_404
from .import serializers
from .import models
# Create your views here.

# ==============================VendorView==========================================
class VendorList(generics.ListCreateAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorSerializer
    # permission_classes=[permissions.IsAuthenticated]

class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorDetailSerializer

# ==============================ProductView==========================================
 
class ProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination
    
    
    def get_queryset(self):
        qs = super().get_queryset()
        category_id = self.request.GET.get("category")

        if category_id:
            try:
                category = models.ProductCategory.objects.get(id=category_id)
                qs = qs.filter(category=category)
            except models.ProductCategory.DoesNotExist:
                qs = qs.none()  # Return empty queryset if category doesn't exist

        return qs

    
class ProductDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductDetailSerializer

# ==============================CustomerView==========================================

class CustomerList(generics.ListCreateAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerSerializer
    
class CustomerDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerDetailSerializer
    

# ==============================OrderView==========================================

class OrderList(generics.ListAPIView):
    queryset=models.Order.objects.all()
    serializer_class=serializers.OrderSerializer
    
class OrderDetail(generics.ListAPIView):
    # queryset=models.OrderItems.objects.all()
    serializer_class=serializers.OrderDetailSerializer

    def get_queryset(self):
        order = get_object_or_404(models.Order, id=self.kwargs['pk'])
        return models.OrderItems.objects.filter(order=order)
    
 
# ==============================CustomerAddressViewSet==========================================

class CustomerAddressViewset(viewsets.ModelViewSet):
    serializer_class=serializers.CustomerAddressSerializer
    queryset=models.CustomerAddress.objects.all()
    
    
# ==============================ProductRatingAddressViewSet==========================================

class ProductRatingViewset(viewsets.ModelViewSet):
    serializer_class=serializers.ProductRatingSerializer
    queryset=models.ProductRating.objects.all()


# ==============================CategoryView==========================================
# ==============================VendorView==========================================
class CategoryList(generics.ListCreateAPIView):
    queryset=models.ProductCategory.objects.all()
    serializer_class=serializers.CategorySerializer
    # permission_classes=[permissions.IsAuthenticated]

class CategoryDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.ProductCategory.objects.all()
    serializer_class=serializers.CategoryDetailSerializer
