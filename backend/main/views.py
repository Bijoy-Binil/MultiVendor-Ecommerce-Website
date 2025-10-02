from . import models
from . import serializers
from rest_framework import generics, viewsets
from .models import Product,Order
from .serializers import ProductSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
import json
from django.contrib.auth.models import User

from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.db import IntegrityError
# Vendor views
class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer

class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer

@csrf_exempt
def vendor_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # parse JSON body
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
        else:
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

        # 🔹 Validate inputs before creating user
        if not username or not password:
            return JsonResponse({"bool": False, "msg": "Username and password required"})
        if User.objects.filter(username=username).exists():
            return JsonResponse({"bool": False, "msg": "Username already exists"})
        if User.objects.filter(email=email).exists():
            return JsonResponse({"bool": False, "msg": "Email already exists"})
        if models.Vendor.objects.filter(mobile=mobile).exists():
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
            vendor = models.Vendor.objects.create(
                user=user,
                address=address,
                mobile=mobile
            )
            return JsonResponse({"msg":"Registration Completed Succesfully", "user_id": user.id, "customer_id": vendor.id})

        except IntegrityError:
            return JsonResponse({"bool": False, "msg": "Database error"})

   
    return JsonResponse({"msg": "Only POST method allowed"})

class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer

    def get_queryset(self):
        queryset = models.Product.objects.all()
        category_id = self.request.GET.get("category")  # ✅ safe access

        if category_id:
            queryset = queryset.filter(category__id=category_id)

        fetch_limit = self.request.GET.get("fetch_limit")
        if fetch_limit:
            try:
                limit = int(fetch_limit)
                queryset = queryset.order_by("-id")[:limit]  # ✅ latest first
            except ValueError:
                pass


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
            data = json.loads(request.body)  # parse JSON body
            username = data.get("username")
            password = data.get("password")
        except:
            return JsonResponse({"bool": False, "msg": "Invalid JSON"})

        user = authenticate(username=username, password=password)
        if user is not None:
            customer=models.Customer.objects.get(user=user)

            return JsonResponse({"customer_login": True, "user": customer.user.username,'customer_id':customer.id})
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

# Customer Order views
class CustomerOrderList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemsSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs.get("pk")
        if customer_id:
            qs = qs.filter(order__customer__id=customer_id)
        return qs


        
    
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
class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAddressSerializer
    queryset = models.CustomerAddress.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

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


@csrf_exempt
def update_order_status(request, order_id):
    """
    Update order status after successful payment
    """
    if request.method == "POST":
        updated = models.Order.objects.filter(id=order_id).update(order_status=True)
        if updated:
            return JsonResponse({
                "success": True,
                "order_id": order_id,
                "status": "paid"
            })
        else:
            return JsonResponse({
                "success": False,
                "error": "Order not found"
            }, status=404)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def update_product_download_count(request, product_id):
    if request.method == "POST":
        try:
            product = models.Product.objects.get(id=product_id)
        except models.Product.DoesNotExist:
            return JsonResponse({"bool": False, "error": "Product not found"}, status=404)

        total_downloads = int(product.downloads)
        total_downloads += 1

        models.Product.objects.filter(id=product_id).update(downloads=total_downloads)

        return JsonResponse({
            "bool": True,
            "product_id": product_id,
            "status": "added count"
        })

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



# Wishlist views
class WishList(generics.ListCreateAPIView):
    queryset = models.Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializer

@csrf_exempt
def check_in_wishlist(request):
    msg = {"bool": False}  
    
    if request.method == "POST":
        product_id = request.POST.get("product")
        customer_id = request.POST.get("customer")
    else:  # handle GET
        product_id = request.GET.get("product")
        customer_id = request.GET.get("customer")

    if product_id and customer_id:
        exists = models.Wishlist.objects.filter(
            product_id=product_id,
            customer_id=customer_id
        ).exists()
        msg = {"bool": exists}

    return JsonResponse(msg)



# Customer WisthItems views
class CustomerWishItemList(generics.ListCreateAPIView):
    queryset = models.Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs.get("pk")
        if customer_id:
            qs = qs.filter(customer__id=customer_id)
        return qs
    
# Customer WisthItems views
class CustomerAddressList(generics.ListCreateAPIView):
    queryset = models.CustomerAddress.objects.all()
    serializer_class = serializers.CustomerAddressSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs.get("pk")
        if customer_id:
            qs = qs.filter(customer__id=customer_id).order_by('id')
        return qs
    

@csrf_exempt   
def remove_from_wishlists(request):
    msg = {"bool": False}  

    if request.method == "POST":
        wishlist_id = request.POST.get("wishlist_id")

        if wishlist_id:
            deleted, _ = models.Wishlist.objects.filter(id=wishlist_id).delete()
            
            if deleted:  # deleted > 0 means something was deleted
                msg = {"bool": True}

    return JsonResponse(msg)


@csrf_exempt
def mark_as_default_address(request,pk):
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
                # Unset previous default addresses for this customer
                models.CustomerAddress.objects.filter(customer=address.customer).update(default_address=False)
                # Set selected address as default
                address.default_address = True
                address.save()
                response["success"] = True
            except models.CustomerAddress.DoesNotExist:
                response = {"success": False, "error": "Address not found"}

    return JsonResponse(response)


def customer_dashboard(request, pk):
    try:
        customer_id = pk  # Use pk from URL
        total_address = models.CustomerAddress.objects.filter(customer__id=customer_id).count()
        total_orders = models.Order.objects.filter(customer__id=customer_id).count()
        total_wishlist = models.Wishlist.objects.filter(customer__id=customer_id).count()

        msg = {
            "total_address": total_address,
            "total_orders": total_orders,
            "total_wishlist": total_wishlist,  # fixed typo
        }

        return JsonResponse(msg)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)