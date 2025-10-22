# ============================================
# IMPORTS
# ============================================
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError

from rest_framework import generics, viewsets, status
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response

from . import models, serializers
from .models import Product, Order
from .serializers import ProductSerializer
from django.db.models import Count, Sum, F
from django.db.models.functions import TruncDate, TruncMonth, TruncYear
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import ChangePasswordSerializer
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Vendor, Product
from .serializers import ProductSerializer

import stripe
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order, Customer
from rest_framework.exceptions import ValidationError
from .models import Customer, Order, Product, OrderItems

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_stripe_payment_intent(request):
    """
    Create a Stripe PaymentIntent for the frontend
    """
    try:
        data = request.data
        amount = data.get("amount")

        if amount is None:
            return Response({"error": "Amount is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Stripe expects amount in cents
        if isinstance(amount, float) or isinstance(amount, str):
            amount = float(amount)
        stripe_amount = int(amount * 100)  # Convert to cents

        intent = stripe.PaymentIntent.create(
            amount=stripe_amount,
            currency="usd",
            payment_method_types=["card"],
        )

        return Response({"client_secret": intent.client_secret})

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_order_after_payment(request):
    """
    Confirm order after successful Stripe payment
    """
    try:
        customer = Customer.objects.get(user=request.user)
    except Customer.DoesNotExist:
        raise ValidationError("Customer profile not found.")

    data = request.data
    stripe_payment_intent_id = data.get("payment_intent_id")
    order_id = data.get("order_id")  # <-- pass order_id from frontend

    if not stripe_payment_intent_id or not order_id:
        return Response({"error": "PaymentIntent ID and order_id required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Retrieve Stripe PaymentIntent
        intent = stripe.PaymentIntent.retrieve(stripe_payment_intent_id)
        if intent.status != "succeeded":
            return Response({"error": "Payment not successful"}, status=status.HTTP_400_BAD_REQUEST)

        # Mark the existing order as paid
        order = Order.objects.get(id=order_id, customer=customer)
        order.order_status = True
        order.save()

        return Response({"success": True, "order_id": order.id})

    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# ============================================
# VENDOR VIEWS
# ============================================
# class VendorList(generics.ListCreateAPIView):
#     queryset = models.Vendor.objects.all()
#     serializer_class = serializers.VendorSerializer
#     permission_classes=[AllowAny]
# class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = models.Vendor.objects.all()
#     serializer_class = serializers.VendorSerializer
#     permission_classes=[AllowAny]
# ✅ List + Create

@api_view(['GET'])
@permission_classes([AllowAny])
def vendor_products(request, pk):
    """Return all products for a specific vendor"""
    try:
        vendor = Vendor.objects.get(pk=pk)
    except Vendor.DoesNotExist:
        return Response({"error": "Vendor not found"}, status=404)

    products = Product.objects.filter(vendor=vendor).order_by('-id')
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)
class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all().select_related('user').order_by('-id')
    serializer_class = serializers.VendorSerializer
    permission_classes = [AllowAny]


# ✅ Retrieve + Update + Delete
class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all().select_related('user')
    serializer_class = serializers.VendorSerializer
    permission_classes = [AllowAny]
@csrf_exempt
def vendor_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
        except:
            return JsonResponse({"bool": False, "msg": "Invalid JSON"})

        user = authenticate(username=username, password=password)
        if user is not None:
            vendor = models.Vendor.objects.get(user=user)
            return JsonResponse({
                "bool": True,
                "vendor_login": True,
                "user": vendor.user.username,
                "vendor_id": vendor.id
            })
        return JsonResponse({"bool": False, "msg": "Invalid credentials"})

    return JsonResponse({"msg": "Only POST method allowed"})

@csrf_exempt
def vendor_register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            first_name = data.get("first_name")
            last_name = data.get("last_name")
            email = data.get("email")
            address = data.get("address")
            username = data.get("username")
            password = data.get("password")
            mobile = data.get("mobile")
        except:
            return JsonResponse({"bool": False, "msg": "Invalid JSON"})

        if not username or not password:
            return JsonResponse({"bool": False, "msg": "Username and password required"})
        if User.objects.filter(username=username).exists():
            return JsonResponse({"bool": False, "msg": "Username already exists"})
        if User.objects.filter(email=email).exists():
            return JsonResponse({"bool": False, "msg": "Email already exists"})
        if models.Vendor.objects.filter(mobile=mobile).exists():
            return JsonResponse({"bool": False, "msg": "Mobile number already linked"})

        try:
            user = User.objects.create_user(
                username=username,
                password=password,
                first_name=first_name,
                last_name=last_name,
                email=email
            )
            vendor = models.Vendor.objects.create(
                user=user,
                address=address,
                mobile=mobile
            )
            return JsonResponse({
                "msg": "Registration Completed Succesfully",
                "user_id": user.id,
                "customer_id": vendor.id
            })
        except IntegrityError:
            return JsonResponse({"bool": False, "msg": "Database error"})

    return JsonResponse({"msg": "Only POST method allowed"})

# ============================================
# PRODUCT VIEWS
# ============================================
class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        queryset = models.Product.objects.all()

        # Filter by category if provided
        category_id = self.request.GET.get("category")
        if category_id:
            queryset = queryset.filter(category__id=category_id)

        # Fetch limit
        fetch_limit = self.request.GET.get("fetch_limit")
        if fetch_limit:
            try:
                limit = int(fetch_limit)
                # Check if we want latest or first products
                order = self.request.GET.get("order", "latest")  # default to latest
                if order == "latest":
                    queryset = queryset.order_by("-id")[:limit]  # latest products
                elif order == "first":
                    queryset = queryset[:limit]  # first products
            except ValueError:
                pass

        return queryset

class ProductDetail(generics.RetrieveUpdateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    parser_classes = [MultiPartParser, FormParser]

    def delete(self, request, *args, **kwargs):
        product = self.get_object()
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProductImgsList(generics.ListCreateAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer

class ProductImageDeleteAPIView(generics.DestroyAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer

    def delete(self, request, pk):
        try:
            image_obj = models.ProductImage.objects.get(pk=pk)
            image_obj.delete()
            return Response({"message": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except models.ProductImage.DoesNotExist:
            return Response({"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)

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
    serializer_class = ProductSerializer

    def get_queryset(self):
        tag = self.kwargs.get('tag')
        if tag:
            return Product.objects.filter(tags__icontains=tag)
        return Product.objects.all()

# ============================================
# CUSTOMER VIEWS
# ============================================
class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser)

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer

@csrf_exempt
def customer_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
        except:
            return JsonResponse({"bool": False, "msg": "Invalid JSON"})

        user = authenticate(username=username, password=password)
        if user is not None:
            customer = models.Customer.objects.get(user=user)
            return JsonResponse({"customer_login": True, "user": customer.user.username,'customer_id':customer.id})
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

        if not username or not password:
            return JsonResponse({"bool": False, "msg": "Username and password required"})
        if User.objects.filter(username=username).exists():
            return JsonResponse({"bool": False, "msg": "Username already exists"})
        if User.objects.filter(email=email).exists():
            return JsonResponse({"bool": False, "msg": "Email already exists"})
        if models.Customer.objects.filter(mobile=mobile).exists():
            return JsonResponse({"bool": False, "msg": "Mobile number already linked"})

        try:
            user = User.objects.create_user(
                username=username,
                password=password,
                first_name=first_name,
                last_name=last_name,
                email=email
            )
            customer = models.Customer.objects.create(user=user, mobile=mobile)
            return JsonResponse({"msg":"Registration Completed Succesfully", "user_id": user.id, "customer_id": customer.id})
        except IntegrityError:
            return JsonResponse({"bool": False, "msg": "Database error"})

    return JsonResponse({"msg": "Only POST method allowed"})
from rest_framework.exceptions import ValidationError
# ============================================
# ORDER VIEWS
# ============================================
class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all().order_by('-id')
    serializer_class = serializers.OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            customer = models.Customer.objects.get(user=self.request.user)
        except models.Customer.DoesNotExist:
            raise ValidationError("Customer profile not found for the logged-in user.")

        serializer.save(customer=customer)



class CustomerOrderList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemsSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs.get("pk")
        if customer_id:
            qs = qs.filter(order__customer__id=customer_id)
        return qs

class VendorCustomerOrderList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemsSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs.get("customer_id")
        vendor_id = self.kwargs.get("vendor_id")
        if customer_id:
            qs = qs.filter(order__customer__id=customer_id, product__vendor__id=vendor_id)
        return qs

class VendorOrderList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemsSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs.get("pk")
        if vendor_id:
            qs = qs.filter(product__vendor__id=vendor_id)
        return qs
class ChangePasswordView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        # pk is the Customer.id coming from the frontend
        customer = models.Customer.objects.filter(pk=pk).select_related("user").first()
        if not customer:
            return Response({"detail": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

        user = customer.user

        # Ensure the authenticated user matches the target user
        if not request.user or request.user.id != user.id:
            return Response({"detail": "Not allowed"}, status=status.HTTP_403_FORBIDDEN)

        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not current_password or not new_password:
            return Response({"detail": "Both fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if confirm_password is not None and new_password != confirm_password:
            return Response({"detail": "New password and confirm password do not match"}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({"detail": "Incorrect current password"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"detail": "Password changed successfully"}, status=status.HTTP_200_OK)
        
class VendorChangePasswordView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        # pk is the Vendor.id
        vendor = models.Vendor.objects.filter(pk=pk).select_related("user").first()
        if not vendor:
            return Response({"detail": "Vendor not found"}, status=status.HTTP_404_NOT_FOUND)

        user = vendor.user

        if not request.user or request.user.id != user.id:
            return Response({"detail": "Not allowed"}, status=status.HTTP_403_FORBIDDEN)

        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not current_password or not new_password:
            return Response({"detail": "Both fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if confirm_password is not None and new_password != confirm_password:
            return Response({"detail": "New password and confirm password do not match"}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({"detail": "Incorrect current password"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"detail": "Password changed successfully"}, status=status.HTTP_200_OK)

class VendorDailyreport(generics.GenericAPIView):
    serializer_class = serializers.VendorDailyReportSerializer

    def get(self, request, pk):
        vendor_id = pk
        if vendor_id:
            # Aggregate orders per day
            qs = (
                models.OrderItems.objects.filter(product__vendor__id=vendor_id)
                .annotate(order_date=TruncDate('order__order_time'))
                .values('order_date')
                .annotate(
                    total_orders=Count('id'),
                    total_amount=Sum(F('price') * F('qty')),
                    total_usd_amount=Sum(F('usd_price') * F('qty')),
                    total_products_sold=Sum('qty')
                )
                .order_by('order_date')
            )
            serializer = self.get_serializer(qs, many=True)
            return Response(serializer.data)
        return Response([])
    
# MONTHLY REPORT
class VendorMonthlyReport(generics.GenericAPIView):
    serializer_class = serializers.VendorMonthlyReportSerializer

    def get(self, request, pk):
        vendor_id = pk
        if vendor_id:
            qs = (
                models.OrderItems.objects.filter(product__vendor__id=vendor_id)
                .annotate(month=TruncMonth('order__order_time'))
                .values('month')
                .annotate(
                    total_orders=Count('id'),
                    total_amount=Sum(F('price') * F('qty')),
                    total_usd_amount=Sum(F('usd_price') * F('qty')),
                    total_products_sold=Sum('qty')
                )
                .order_by('month')
            )
            serializer = self.get_serializer(qs, many=True)
            return Response(serializer.data)
        return Response([])
# YEARLY REPORT
class VendorYearlyReport(generics.GenericAPIView):
    serializer_class = serializers.VendorYearlyReportSerializer

    def get(self, request, pk):
        vendor_id = pk
        if vendor_id:
            qs = (
                models.OrderItems.objects.filter(product__vendor__id=vendor_id)
                .annotate(order_year=TruncYear('order__order_time'))
                .values('order_year')
                .annotate(
                    total_orders=Count('id'),
                    total_amount=Sum(F('price') * F('qty')),
                    total_usd_amount=Sum(F('usd_price') * F('qty')),
                    total_products_sold=Sum('qty')
                )
                .order_by('order_year')
            )
            for q in qs:
                q["order_year"] = q["order_year"].year
            serializer = self.get_serializer(qs, many=True)
            return Response(serializer.data)
        return Response([])
    

class VendorCustomerList(generics.ListAPIView):
    serializer_class = serializers.CustomerSerializer

    def get_queryset(self):
        vendor_id = self.kwargs.get("pk")
        customer_ids = models.OrderItems.objects.filter(
            product__vendor__id=vendor_id
        ).values_list("order__customer", flat=True).distinct()
        return models.Customer.objects.filter(id__in=customer_ids)

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

class OrderModify(generics.RetrieveUpdateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

# ============================================
# ORDER ITEMS VIEWS
# ============================================
class OrderItemsList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemsSerializer

class OrderItemsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemsSerializer

# ============================================
# CUSTOMER ADDRESS & WISHLIST VIEWS
# ============================================
class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAddressSerializer
    queryset = models.CustomerAddress.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

# class ProductRatingViewset(viewsets.ModelViewSet):
#     queryset = models.ProductRating.objects.all().order_by('-add_time')
#     serializer_class = serializers.ProductRatingSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         # automatically assign logged-in user's customer profile
#         print(f"User: {self.request.user}")
#         print(f"User ID: {self.request.user.id}")
#         try:
#             customer = models.Customer.objects.get(user=self.request.user)
#             print(f"Customer found: {customer}")
#             serializer.save(customer=customer)
#         except models.Customer.DoesNotExist:
#             print("Customer not found")
#             raise serializers.ValidationError("Customer profile not found")
from rest_framework.decorators import action
class ProductRatingViewset(viewsets.ModelViewSet):
    queryset = models.ProductRating.objects.all().order_by('-add_time')
    serializer_class = serializers.ProductRatingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        print(f"Authenticated user: {user}")

        try:
            customer = models.Customer.objects.get(user=user)
            serializer.save(customer=customer)
            print("Review saved successfully")
        except models.Customer.DoesNotExist:
            print("Customer not found for user:", user)
            raise serializers.ValidationError({"error": "Customer profile not found."})

    # ✅ Custom endpoint for latest 3 reviews
    @action(detail=False, methods=['get'])
    def latest(self, request):
        latest_reviews = models.ProductRating.objects.all().order_by('-add_time')[:3]
        serializer = self.get_serializer(latest_reviews, many=True)
        return Response(serializer.data)

class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        queryset = models.ProductCategory.objects.all()
        
        # Optional: filter by name or any other field (example)
        name = self.request.GET.get("name")
        if name:
            queryset = queryset.filter(title__icontains=name)
        
        # Optional: limit the number of results
        fetch_limit = self.request.GET.get("fetch_limit")
        if fetch_limit:
            try:
                limit = int(fetch_limit)
                queryset = queryset.order_by("-id")[:limit]
            except ValueError:
                pass
        
        return queryset
class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer

# ============================================
# MISC FUNCTION-BASED VIEWS
# ============================================
@csrf_exempt
def update_order_status(request, order_id):
    if request.method == "POST":
        updated = models.Order.objects.filter(id=order_id).update(order_status=True)
        if updated:
            return JsonResponse({"success": True, "order_id": order_id, "status": "paid"})
        return JsonResponse({"success": False, "error": "Order not found"}, status=404)
    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def update_product_download_count(request, product_id):
    if request.method == "POST":
        try:
            product = models.Product.objects.get(id=product_id)
        except models.Product.DoesNotExist:
            return JsonResponse({"bool": False, "error": "Product not found"}, status=404)
        product.downloads += 1
        product.save()
        return JsonResponse({"bool": True, "product_id": product_id, "status": "added count"})
    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

class WishList(generics.ListCreateAPIView):
    queryset = models.Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import models, serializers

# ==========================
# Check if product is in wishlist
# ==========================
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from . import models

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def check_in_wishlist(request):
    """
    Check if a product is in the logged-in user's wishlist.
    Works with token authentication.
    """
    # Get product ID from POST or GET
    product_id = request.data.get("product") if request.method == "POST" else request.query_params.get("product")
    if not product_id:
        return Response({"bool": False})

    # Get customer's profile from user
    try:
        customer = Customer.objects.get(user=request.user)  # or request.user.customer_set.first()
    except AttributeError:
        return Response({"bool": False})

    exists = models.Wishlist.objects.filter(product_id=product_id, customer=customer).exists()
    return Response({"bool": exists})
# ==========================
# Customer Wishlist List
# ==========================
class CustomerWishItemList(generics.ListAPIView):
    serializer_class = serializers.CustomerWishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        customer = user.customer_set.first()
        if not customer:
            return models.Wishlist.objects.none()
        return models.Wishlist.objects.filter(customer=customer).select_related("product").order_by("-id")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request  # for absolute image URLs
        return context

# ==========================
# Toggle Wishlist (Add/Remove)
# ==========================
@csrf_exempt
def toggle_wishlist(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid method"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "Unauthorized"}, status=401)

    product_id = request.POST.get("product")
    if not product_id:
        return JsonResponse({"error": "Missing product"}, status=400)

    customer = user.customer_set.first()
    if not customer:
        return JsonResponse({"error": "Customer not found"}, status=404)

    wishlist_obj = models.Wishlist.objects.filter(product_id=product_id, customer=customer).first()
    if wishlist_obj:
        wishlist_obj.delete()
        return JsonResponse({"bool": False, "msg": "Removed from wishlist"})
    else:
        models.Wishlist.objects.create(product_id=product_id, customer=customer)
        return JsonResponse({"bool": True, "msg": "Added to wishlist"})

# ==========================
# Remove from Wishlist
# ==========================
@csrf_exempt
def remove_from_wishlists(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid method"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"bool": False, "error": "Unauthorized"}, status=401)

    wishlist_id = request.POST.get("wishlist_id")
    if not wishlist_id:
        return JsonResponse({"bool": False, "error": "Missing wishlist_id"}, status=400)

    customer = user.customer_set.first()
    deleted, _ = models.Wishlist.objects.filter(id=wishlist_id, customer=customer).delete()
    return JsonResponse({"bool": bool(deleted)})

class CustomerAddressList(generics.ListCreateAPIView):
    queryset = models.CustomerAddress.objects.all()
    serializer_class = serializers.CustomerAddressSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs.get("pk")
        if customer_id:
            qs = qs.filter(customer__id=customer_id).order_by('id')
        return qs
    
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from . import models, serializers

# Customer Wishlist List
class CustomerWishItemList(generics.ListAPIView):
    serializer_class = serializers.CustomerWishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        customer = user.customer_set.first()
        if not customer:
            return models.Wishlist.objects.none()
        return models.Wishlist.objects.filter(customer=customer).select_related("product").order_by("-id")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request  # for absolute image URLs
        return context


# Toggle Wishlist (Add/Remove)
class ToggleWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product")
        if not product_id:
            return Response({"error": "Missing product"}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        customer = user.customer_set.first()
        if not customer:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

        wishlist_obj = models.Wishlist.objects.filter(product_id=product_id, customer=customer).first()
        if wishlist_obj:
            wishlist_obj.delete()
            return Response({"bool": False, "msg": "Removed from wishlist"})
        else:
            models.Wishlist.objects.create(product_id=product_id, customer=customer)
            return Response({"bool": True, "msg": "Added to wishlist"})


# Remove from Wishlist
class RemoveFromWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        wishlist_id = request.data.get("wishlist_id")
        if not wishlist_id:
            return Response({"bool": False, "error": "Missing wishlist_id"}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        customer = user.customer_set.first()
        deleted, _ = models.Wishlist.objects.filter(id=wishlist_id, customer=customer).delete()
        return Response({"bool": bool(deleted)})

@csrf_exempt
def mark_as_default_address(request, pk):
    response = {"success": False}
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            address_id = data.get("address_id")
        except (json.JSONDecodeError, KeyError):
            return JsonResponse({"success": False, "error": "Invalid data"})

        if address_id:
            try:
                address = models.CustomerAddress.objects.get(id=address_id)
                models.CustomerAddress.objects.filter(customer=address.customer).update(default_address=False)
                address.default_address = True
                address.save()
                response["success"] = True
            except models.CustomerAddress.DoesNotExist:
                response = {"success": False, "error": "Address not found"}
    return JsonResponse(response)

def customer_dashboard(request, pk):
    try:
        total_address = models.CustomerAddress.objects.filter(customer__id=pk).count()
        total_orders = models.Order.objects.filter(customer__id=pk).count()
        total_wishlist = models.Wishlist.objects.filter(customer__id=pk).count()
        return JsonResponse({
            "total_address": total_address,
            "total_orders": total_orders,
            "total_wishlist": total_wishlist
        })
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
def vendor_dashboard(request, pk):
    """
    Return total counts for a vendor:
    - total_products
    - total_orders
    - total_customers
    """
    try:
        total_products = models.Product.objects.filter(vendor__id=pk).count()
        total_orders = models.OrderItems.objects.filter(product__vendor__id=pk).count()
        # Get unique customers who purchased from this vendor
        total_customers = models.OrderItems.objects.filter(product__vendor__id=pk).values_list(
            "order__customer", flat=True
        ).distinct().count()

        return JsonResponse({
            "total_products": total_products,
            "total_orders": total_orders,
            "total_customers": total_customers
        })
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)