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
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.db import transaction
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken
import time
from django.utils import timezone
from datetime import timedelta
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
        customer=models.Customer.objects.get(user=user)
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return JsonResponse({
            'bool': True, 
            'user': user.username, 
            'id': customer.id, 
            'msg': 'Login Successful!',
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }
        })
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
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return JsonResponse({
            'bool': True, 
            'user': user.id, 
            'customer': customer.id, 
            'msg': 'Register Successful!',
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }
        })
    else:
        return JsonResponse({'bool': False, 'msg': 'Error Occurred!'})


# ==============================OrderView==========================================

class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Filter orders to only show those of the authenticated customer
        if self.request.user.is_authenticated:
            try:
                customer = models.Customer.objects.get(user=self.request.user)
                return models.Order.objects.filter(customer=customer)
            except models.Customer.DoesNotExist:
                return models.Order.objects.none()
        return models.Order.objects.none()

    def perform_create(self, serializer):
        # Set the customer from the authenticated user
        try:
            customer = models.Customer.objects.get(user=self.request.user)
            
            # Check for recent orders to prevent duplicates (within last 5 seconds)
            five_seconds_ago = timezone.now() - timedelta(seconds=5)
            recent_order = models.Order.objects.filter(
                customer=customer,
                created_at__gte=five_seconds_ago
            ).exists()
            
            if recent_order:
                raise serializers.ValidationError("An order was just created. Please wait before creating another one.")
            
            serializer.save(customer=customer)
        except models.Customer.DoesNotExist:
            raise serializers.ValidationError("Customer profile not found for this user")

    def post(self, request, *args, **kwargs):
        print(request.POST)
        return super().post(request, *args, **kwargs)

class OrderDetail(generics.ListAPIView):
    serializer_class = serializers.OrderDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        order_id = self.kwargs['pk']
        order = get_object_or_404(models.Order, id=order_id)
        
        # Check if the authenticated user is the customer of this order
        if self.request.user.is_authenticated:
            try:
                customer = models.Customer.objects.get(user=self.request.user)
                if order.customer == customer:
                    return models.OrderItems.objects.filter(order=order)
            except models.Customer.DoesNotExist:
                return models.OrderItems.objects.none()
                
        return models.OrderItems.objects.none()
    
 
# ==============================CustomerAddressViewSet==========================================

class CustomerAddressViewset(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAddressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Only return addresses for the authenticated customer
        if self.request.user.is_authenticated:
            try:
                customer = models.Customer.objects.get(user=self.request.user)
                return models.CustomerAddress.objects.filter(customer=customer)
            except models.Customer.DoesNotExist:
                return models.CustomerAddress.objects.none()
        return models.CustomerAddress.objects.none()
    
    def perform_create(self, serializer):
        # Set the customer from the authenticated user
        try:
            customer = models.Customer.objects.get(user=self.request.user)
            serializer.save(customer=customer)
        except models.Customer.DoesNotExist:
            raise serializers.ValidationError("Customer profile not found for this user")

# ==============================ProductRatingViewSet==========================================

class ProductRatingViewset(viewsets.ModelViewSet):
    serializer_class = serializers.ProductRatingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return models.ProductRating.objects.all()
    
    def perform_create(self, serializer):
        # Set the customer from the authenticated user
        try:
            customer = models.Customer.objects.get(user=self.request.user)
            serializer.save(customer=customer)
        except models.Customer.DoesNotExist:
            raise serializers.ValidationError("Customer profile not found for this user")

# ==============================CategoryView==========================================
# ==============================VendorView==========================================
class CategoryList(generics.ListCreateAPIView):
    queryset=models.ProductCategory.objects.all()
    serializer_class=serializers.CategorySerializer
    # permission_classes=[permissions.IsAuthenticated]

class CategoryDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.ProductCategory.objects.all()
    serializer_class=serializers.CategoryDetailSerializer
