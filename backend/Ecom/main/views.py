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
from django.views import View
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
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
        # Print debugging information
        print(f"User authenticated: {self.request.user.is_authenticated}")
        print(f"Username: {self.request.user.username}")
        
        # Filter orders to only show those of the authenticated customer
        if self.request.user.is_authenticated:
            try:
                customer = models.Customer.objects.get(user=self.request.user)
                print(f"Customer found: ID={customer.id}")
                orders = models.Order.objects.filter(customer=customer)
                print(f"Orders found: {orders.count()}")
                return orders
            except models.Customer.DoesNotExist:
                print("Customer not found for this user")
                # Return all orders for debugging
                return models.Order.objects.all()
        
        print("User not authenticated")
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
            
            # Print when order is created
            print(f"Creating order for customer: {customer.id} - {self.request.user.username}")
            serializer.save(customer=customer)
        except models.Customer.DoesNotExist:
            raise serializers.ValidationError("Customer profile not found for this user")

    def post(self, request, *args, **kwargs):
        print(request.POST)
        return super().post(request, *args, **kwargs)

@method_decorator(csrf_exempt, name='dispatch')
class UpdateOrderStatusView(View):
    def post(self, request, order_id):
        try:
            order = models.Order.objects.get(id=order_id)
            order.order_status = True  # or "Completed" if it's a CharField
            order.save()
            return JsonResponse({"bool": True, "message": "Order updated successfully"})
        except models.Order.DoesNotExist:
            return JsonResponse({"bool": False, "error": "Order not found"})
        except Exception as e:
            return JsonResponse({"bool": False, "error": str(e)})



class CustomerOrderItemList(generics.ListAPIView):  # Changed to ListAPIView
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        customer_id = self.kwargs['pk']
        return models.OrderItems.objects.filter(order__customer__id=customer_id)





class OrderItemView(generics.CreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        order_id = self.request.data.get('order')
        product_id = self.request.data.get('product')
        
        if not order_id or not product_id:
            raise serializers.ValidationError("Order ID and Product ID are required")
        
        try:
            order = models.Order.objects.get(id=order_id)
            # Check if the order belongs to the current user's customer
            customer = models.Customer.objects.get(user=self.request.user)
            
            if order.customer != customer:
                raise serializers.ValidationError("You don't have permission to add items to this order")
            
            product = models.Product.objects.get(id=product_id)
            serializer.save(order=order, product=product)
            
        except models.Order.DoesNotExist:
            raise serializers.ValidationError("Order not found")
        except models.Product.DoesNotExist:
            raise serializers.ValidationError("Product not found")
        except models.Customer.DoesNotExist:
            raise serializers.ValidationError("Customer profile not found for this user")

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
