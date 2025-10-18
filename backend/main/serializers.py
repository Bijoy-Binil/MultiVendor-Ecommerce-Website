from rest_framework import serializers
from . import models
from .models import Vendor
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email']
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    confirm_password = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match"})
        return attrs

# =========================
# Vendor serializers
# =========================
class VendorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Vendor
        fields = ['id', 'user', 'mobile', 'address', 'profile_img']
        # depth = 1

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id', 'user', 'address']
        # depth = 1

# =========================
# Category serializers
# =========================
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = ['id', 'title', 'detail']
        # depth = 1

class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = ['id', 'title', 'detail']
        # depth = 1

# =========================
# Product serializers
# =========================
class RelatedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['id', 'title', 'slug', 'price', 'image']

class ProductSerializer(serializers.ModelSerializer):
    product_ratings = serializers.StringRelatedField(many=True, read_only=True)
    related_products = serializers.SerializerMethodField()
    tag_list = serializers.SerializerMethodField()

    category = serializers.PrimaryKeyRelatedField(queryset=models.ProductCategory.objects.all())
    vendor = serializers.PrimaryKeyRelatedField(queryset=models.Vendor.objects.all())

    class Meta:
        model = models.Product
        fields = [
            'id', 'category', 'vendor', 'title', 'slug', 'tags',
            'tag_list', 'image', 'demo_url', 'related_products',
            'detail', 'price', 'is_published', 'product_ratings',
            'usd_price', 'product_imgs', 'product_file'
        ]
        extra_kwargs = {
            'image': {'required': False, 'allow_null': True},
            'product_file': {'required': False, 'allow_null': True},
        }
        depth = 1

    def get_tag_list(self, obj):
        if obj.tags:
            return [t.strip() for t in obj.tags.split(',')]
        return []

    def get_related_products(self, obj):
        related = models.Product.objects.filter(category=obj.category).exclude(id=obj.id)
        from .serializers import RelatedProductSerializer
        return RelatedProductSerializer(related, many=True).data

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductImage
        fields = ["id", "image", "product"]

class ProductDetailSerializer(serializers.ModelSerializer):
    product_ratings = serializers.StringRelatedField(many=True, read_only=True)
    product_imgs = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = models.Product
        fields = [
            'id', 'category', 'vendor', 'title', 'slug', 'tag_list',
            'image', 'demo_url', 'usd_price', 'detail', 'downloads',
            'price', 'product_ratings', 'product_imgs', 'product_file'
        ]
        depth = 1

    def get_tag_list(self, obj):
        return obj.tag_list()

# =========================
# User serializers
# =========================
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'first_name', 'last_name', 'username', 'email']
        depth = 1

# =========================
# Customer serializers
# =========================
class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = models.Customer
        fields = ['id', 'user', 'mobile', 'profile_img']

    def get_user(self, obj):
        return {
            "username": obj.user.username,
            "email": obj.user.email,
            "first_name": obj.user.first_name,
            "last_name": obj.user.last_name,
        }

class CustomerDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = models.Customer
        fields = ['id', 'user', 'mobile', 'profile_img']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response

# =========================
# Order serializers
# =========================
class OrderSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()

    class Meta:
        model = models.Order
        fields = ['id', 'customer_name', 'order_status', 'total_amount', 'total_usd_amount']

    def get_customer_name(self, obj):
        if obj.customer and obj.customer.user:
            return f"{obj.customer.user.first_name} {obj.customer.user.last_name}"
        return "Unknown"

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['id', 'customer']
        depth = 1

# =========================
# OrderItems serializers
# =========================
class OrderItemsSerializer(serializers.ModelSerializer):
    order_info = serializers.SerializerMethodField(read_only=True)
    product_info = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.OrderItems
        fields = ['id', 'order', 'product', 'qty', 'price', 'usd_price', 'order_info', 'product_info']

    def get_order_info(self, obj):
        return OrderSerializer(obj.order, context=self.context).data

    def get_product_info(self, obj):
        return ProductDetailSerializer(obj.product, context=self.context).data

class OrderItemsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItems
        fields = ['id', 'order', 'product']
        depth = 1

# =========================
# CustomerAddress serializers
# =========================
class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomerAddress
        fields = ['id', 'address', 'customer', 'default_address']

    def create(self, validated_data):
        if 'customer' not in validated_data:
            validated_data['customer'] = self.context['request'].user.customer
        return super().create(validated_data)

# =========================
class ProductRatingSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title', read_only=True)
    customer_name = serializers.CharField(source='customer.user.username', read_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset=models.Product.objects.all())
    customer = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = models.ProductRating
        fields = [
            'id',
            'customer',
            'customer_name',
            'product',
            'product_title',
            'rating',
            'reviews',
            'add_time',
        ]

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value
# =========================
# Wishlist serializers
# =========================
class WishlistSerializer(serializers.ModelSerializer):
    product_info = ProductDetailSerializer(source='product', read_only=True)
    customer_info = CustomerSerializer(source='customer', read_only=True)

    class Meta:
        model = models.Wishlist
        fields = ['id', 'product', 'customer', 'product_info', 'customer_info']

    def get_customer_info(self, obj):
        return CustomerSerializer(obj.customer, context=self.context).data

    def get_product_info(self, obj):
        return ProductDetailSerializer(obj.product, context=self.context).data

class VendorDailyReportSerializer(serializers.Serializer):
    order_date = serializers.DateField()
    total_orders = serializers.IntegerField()
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_usd_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_products_sold = serializers.IntegerField()

class VendorMonthlyReportSerializer(serializers.Serializer):
    month = serializers.DateTimeField()  # 👈 changed from DateField
    total_orders = serializers.IntegerField()
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_usd_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_products_sold = serializers.IntegerField()

class VendorYearlyReportSerializer(serializers.Serializer):
    order_year = serializers.IntegerField()
    total_orders = serializers.IntegerField()
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_usd_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_products_sold = serializers.IntegerField()