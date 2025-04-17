from rest_framework import serializers
from .models import Customer, Order, OrderItems, Vendor,Product,ProductCategory  # make sure Vendor model is imported
from django.contrib.auth.models import User  # or your custom User model
# ==============================VendorSerializer==========================================
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address']

    def __init__(self, *args, **kwargs):
        super(VendorSerializer,self).__init__(*args, **kwargs)
        # self.Meta.depth =1 

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address']

    def __init__(self, *args, **kwargs):
        super(VendorDetailSerializer,self).__init__(*args, **kwargs)
        # self.Meta.depth =1


# ==============================ProductSerializer==========================================

class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'category', 'vendor','title','detail','price']

    def __init__(self, *args, **kwargs):
        super(ProductListSerializer,self).__init__(*args, **kwargs)
        # self.Meta.depth =1

class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'category', 'vendor','title','detail','price']

    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer,self).__init__(*args, **kwargs)
        # self.Meta.depth =1


# =========================CustomerSerializer===============================================
#Customer
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'mobile_number']

    def __init__(self, *args, **kwargs):
        super(CustomerSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1 

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'mobile_number']

    def __init__(self, *args, **kwargs):
        super(CustomerDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1

  # =========================OrderSerializer===============================================
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'customer', 'order_time']

    def __init__(self, *args, **kwargs):
        super(OrderSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1 

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'customer', 'order_time']

    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1


  # =========================OrderItemSerializer===============================================
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['id', 'order', 'product']

    def __init__(self, *args, **kwargs):
        super(OrderItemSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1 

class OrderItemDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['id', 'order', 'product']

    def __init__(self, *args, **kwargs):
        super(OrderItemDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1