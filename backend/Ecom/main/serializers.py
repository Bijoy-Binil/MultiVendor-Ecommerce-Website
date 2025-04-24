from rest_framework import serializers
from .models import Customer, CustomerAddress, Order, OrderItems, ProductRating, Vendor,Product,ProductCategory,ProductImage  # make sure Vendor model is imported
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


# ==============================ProductImageSerializer==========================================
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id",'image',"product"]

# ==============================ProductSerializer==========================================

class ProductListSerializer(serializers.ModelSerializer):
    product_ratings = serializers.StringRelatedField(many=True, read_only=True)
    product_images = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'category', 'vendor','title','image','slug','tag_list','detail','price','product_ratings','product_images']

    def __init__(self, *args, **kwargs):
        super(ProductListSerializer,self).__init__(*args, **kwargs)
        # self.Meta.depth =1

class ProductDetailSerializer(serializers.ModelSerializer):
    product_ratings = serializers.StringRelatedField(many=True, read_only=True)
    product_images = ProductImageSerializer(many=True, read_only=True)  # 💡 use nested serializer

    class Meta:
        many=True
        model = Product
        fields = ['id', 'category', 'vendor','title','image','slug','tag_list','detail','price','product_ratings','product_images']

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
        model = OrderItems
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1


  # =========================CustomerAddressSerializer===============================================
class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = ['id', 'customer', 'address','default_address']

    def __init__(self, *args, **kwargs):
        super(CustomerAddressSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1 



  # =========================ProductRatingSerializer===============================================
class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRating
        fields = ['id', 'customer', 'product','reviews','rating','add_time']

    def __init__(self, *args, **kwargs):
        super(ProductRatingSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1



  # =========================CategorySerializer===============================================
  # =========================OrderSerializer===============================================
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'title', 'detail']

    def __init__(self, *args, **kwargs):
        super(CategorySerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1 

class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'title', 'detail']

    def __init__(self, *args, **kwargs):
        super(CategoryDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1



