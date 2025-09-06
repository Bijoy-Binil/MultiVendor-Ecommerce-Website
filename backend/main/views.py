from . import models
from . import serializers
from rest_framework import generics, viewsets
from .models import Product
from .serializers import ProductSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
import json
from django.contrib.auth.models import User
from django.db import IntegrityError
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

    
@csrf_exempt
def customer_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # parse JSON body
            username = data.get("username")
            password = data.get("password")
        except:
            return JsonResponse({"bool": False, "msg": "Invalid JSON"})

        user = authenticate(username=username, password=password)
        if user is not None:
            return JsonResponse({"customer_login": True, "user": user.username})
        else:
            return JsonResponse({"bool": False, "msg": "Invalid credentials"})

    return JsonResponse({"msg": "Only POST method allowed"})
    

@csrf_exempt
def customer_register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            first_name = data.get("first_name")
            last_name = data.get("last_name")
            email = data.get("email")
            username = data.get("username")
            password = data.get("password")
            mobile = data.get("mobile")
        except:
            return JsonResponse({"bool": False, "msg": "Invalid JSON"})

        # 🔹 Validate inputs before creating user
        if not username or not password:
            return JsonResponse({"bool": False, "msg": "Username and password required"})
        if User.objects.filter(username=username).exists():
            return JsonResponse({"bool": False, "msg": "Username already exists"})
        if User.objects.filter(email=email).exists():
            return JsonResponse({"bool": False, "msg": "Email already exists"})
        if models.Customer.objects.filter(mobile=mobile).exists():
            return JsonResponse({"bool": False, "msg": "Mobile number already linked"})

        try:
            # ✅ Create User
            user = User.objects.create_user(
                username=username,
                password=password,
                first_name=first_name,
                last_name=last_name,
                email=email
            )

            # ✅ Create related Customer
            customer = models.Customer.objects.create(
                user=user,
                mobile=mobile
            )
            return JsonResponse({"msg":"Registration Completed Succesfully", "user_id": user.id, "customer_id": customer.id})

        except IntegrityError:
            return JsonResponse({"bool": False, "msg": "Database error"})

   
    return JsonResponse({"msg": "Only POST method allowed"})



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
