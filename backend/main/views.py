from . import models
from . import serializers
from rest_framework import generics, viewsets
from .models import Product
from .serializers import ProductSerializer
# Vendor views
class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer

class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer


# Product views
class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer

    def get_queryset(self):
        queryset = models.Product.objects.all()
        category_id = self.request.GET.get("category")  # ✅ safe access
        if category_id:
            queryset = queryset.filter(category__id=category_id)
        return queryset
    


class RelatedProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('pk')
        if product_id:
            try:
                product = Product.objects.get(id=product_id)
                return Product.objects.filter(category=product.category).exclude(id=product_id)
            except Product.DoesNotExist:
                return Product.objects.none()
        return Product.objects.all()


    
class TagProductList(generics.ListCreateAPIView):
    serializer_class = ProductSerializer  # only the serializer

    def get_queryset(self):
        tag = self.kwargs.get('tag')
        if tag:
            return Product.objects.filter(tags__icontains=tag)
        return Product.objects.all()

        

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer
    

# Customer views
class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer


# Order views
class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer


# Order Items views
class OrderItemsList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemsSerializer

class OrderItemsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemsSerializer

# Customer Address views
class CustomerAddressViewset(viewsets.ModelViewSet):
    queryset = models.CustomerAddress.objects.all()
    serializer_class = serializers.CustomerAddressSerializer

# Customer Address views
class ProductRatingViewset(viewsets.ModelViewSet):
    queryset = models.ProductRating.objects.all()
    serializer_class = serializers.ProductRatingSerializer

    # Category views
class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer
