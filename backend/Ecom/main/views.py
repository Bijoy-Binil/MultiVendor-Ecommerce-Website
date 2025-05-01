import json
from django.http import JsonResponse
from django.shortcuts import render,HttpResponse
from rest_framework import generics,permissions,pagination,viewsets
from django.shortcuts import get_object_or_404
from .import serializers
from .import models
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
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
 # ==============================TagProductListView==========================================   
class TagProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination
    
    
    def get_queryset(self):
        qs = super().get_queryset()
        tag = self.kwargs['tag']
        qs = qs.filter(tags__icontains=tag)
        return qs
# ==============================RelatedProductListView==========================================    
class RelatedProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    
    
    
    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs['pk']
        product=models.Product.objects.get(id=product_id)
        qs = qs.filter(category=product.category).exclude(id=product_id)
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

    
@csrf_exempt
def CustomerLogin(request):
    if request.method != "POST":
        return JsonResponse({'bool': False, 'msg': 'Only POST method allowed'})

    data = json.loads(request.body)
    username = data.get("username", "")
    password = data.get("password", "")
    
    user = authenticate(username=username, password=password)

    if user:
        return JsonResponse({'bool': True, 'user': user.username, 'msg': 'Login Successful!'})
    else:
        return JsonResponse({'bool': False, 'msg': 'Invalid Username/Password!'})
        
@csrf_exempt
def CustomerRegister(request):
    if request.method != "POST":
        return JsonResponse({'bool': False, 'msg': 'Only POST method allowed'})

    data = json.loads(request.body)
    first_name = data.get("firstName", "")
    last_name = data.get("lastName", "")
    username = data.get("userName", "")  # <-- careful here too
    email = data.get("email", "")
    mobile_number = data.get("mobileNumber", "")
    password = data.get("password", "")

    if User.objects.filter(username=username).exists():
        return JsonResponse({'bool': False, 'msg': 'Username already exists!'})
    if models.Customer.objects.filter(mobile_number=mobile_number).exists():
        return JsonResponse({'bool': False, 'msg': 'Mobile already exists!'})
    if User.objects.filter(email=email).exists():
        return JsonResponse({'bool': False, 'msg': 'Email already exists!'})
    
    user = User.objects.create_user(
        username=username,
        email=email,
        first_name=first_name,
        last_name=last_name,
        password=password
    )

    if user:
        customer = models.Customer.objects.create(
            user=user,
            mobile_number=mobile_number   # <-- corrected here
        )
        return JsonResponse({'bool': True, 'user': user.id, 'customer': customer.id, 'msg': 'Register Successful!'})
    else:
        return JsonResponse({'bool': False, 'msg': 'Error Occurred!'})


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
