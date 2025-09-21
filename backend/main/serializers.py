from rest_framework import serializers
from . import models


# Vendor serializers
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id', 'user', 'address']
        # depth = 1

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id', 'user', 'address']
        # depth = 1

# Category serializers
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


# Product serializers

class RelatedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['id', 'title', 'slug', 'price', 'image']  # no related_products here

class ProductSerializer(serializers.ModelSerializer):
    product_ratings = serializers.StringRelatedField(many=True, read_only=True)
    related_products = serializers.SerializerMethodField()
    tag_list = serializers.SerializerMethodField()
    product_file = serializers.FileField(read_only=True, use_url=True)

    class Meta:
        model = models.Product
        fields = [
            'id', 'category', 'vendor', 'title', 'slug', 'tags',
            'tag_list', 'image',"demo_url" ,'related_products', 'detail',
            'price', 'product_ratings','usd_price', 'product_imgs',"product_file"
        ]
        depth = 1

    def get_tag_list(self, obj):
        if obj.tags:
            return [t.strip() for t in obj.tags.split(',')]
        return []

    def get_related_products(self, obj):
        related = models.Product.objects.filter(category=obj.category).exclude(id=obj.id)
        return RelatedProductSerializer(related, many=True).data


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductImage
        fields = ["id", "image","product"]


class ProductDetailSerializer(serializers.ModelSerializer):
    product_ratings = serializers.StringRelatedField(many=True, read_only=True)
    product_imgs = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = models.Product
        depth = 1
        fields = ['id', 'category', 'vendor', 'title',"slug","tag_list","image","demo_url",'usd_price' ,'detail',"downloads", 'price','product_ratings',"product_imgs",'product_file']

    def get_tag_list(self, obj):
        return obj.tag_list()  # call your model method safely
    

# User serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'first_name', 'last_name', 'username', 'email']
        depth = 1


# Customer serializer (for create/update)  
class CustomerSerializer(serializers.ModelSerializer):
    """Used when creating or updating customers (expects user id)"""
    class Meta:
        model = models.Customer
        fields = ['id', 'user', 'mobile', 'profile_img']

        # depth = 1

# Customer detail serializer (for reading with nested user info)

# class CustomerDetailSerializer(serializers.ModelSerializer):
#     user = UserSerializer()

#     class Meta:
#         model = models.Customer
#         fields = ['id', 'user', 'mobile', 'profile_img']

#     def update(self, instance, validated_data):
#         user_data = validated_data.pop('user', None)

#         if user_data:
#             # update the nested User
#             user = instance.user
#             user.first_name = user_data.get('first_name', user.first_name)
#             user.last_name = user_data.get('last_name', user.last_name)
#             user.username = user_data.get('username', user.username)
#             user.email = user_data.get('email', user.email)
#             user.save()

#         # update Customer fields
#         instance.mobile = validated_data.get('mobile', instance.mobile)
#         instance.profile_img = validated_data.get('profile_img', instance.profile_img)
#         instance.save()

#         return instance
class CustomerDetailSerializer(serializers.ModelSerializer):
    # """Used for GET requests to show nested user details"""
    user = UserSerializer(read_only=True)

    class Meta:
        model = models.Customer
        fields = ['id', 'user', 'mobile', 'profile_img']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        # Nested user
        response['user'] = UserSerializer(instance.user).data

        # Customer orders (assuming customer_orders is a related_name on Order)
        # .all() is needed if it's a reverse relation manager


        return response
    
    # These must be outside Meta
    # def get_user_info(self, obj):
    #     return UserSerializer(obj.user, context=self.context).data

    # def get_product_info(self, obj):
    #     return ProductDetailSerializer(obj.product, context=self.context).data







# Order serializers
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['id', 'customer','order_status','total_amount','total_usd_amount']
        # depth = 1

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['id', 'customer']
        depth = 1


# Order Item serializers
class OrderItemsSerializer(serializers.ModelSerializer):
    # Accept IDs on write
    order = serializers.PrimaryKeyRelatedField(queryset=models.Order.objects.all())
    product = serializers.PrimaryKeyRelatedField(queryset=models.Product.objects.all())

    # Nested info for read
    order_info = serializers.SerializerMethodField(read_only=True)
    product_info = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.OrderItems
        fields = ['id', 'order', 'product', 'qty', 'price','usd_price', 'order_info', 'product_info']

    def get_order_info(self, obj):
        return OrderSerializer(obj.order, context=self.context).data

    def get_product_info(self, obj):
        return ProductDetailSerializer(obj.product, context=self.context).data


class OrderItemsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItems
        fields = ['id', 'order', 'product']
        depth = 1

# CustomerAddress serializers
# class CustomerAddressSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.CustomerAddress
#         fields = ['id', 'customer', 'address','default_address']
#         depth = 1
class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomerAddress
        fields = ['id', 'address', 'customer']

    def create(self, validated_data):
        if 'customer' not in validated_data:
            validated_data['customer'] = self.context['request'].user.customer
        return super().create(validated_data)
    
    
# ProductRating serializers
class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductRating
        fields = ['id', 'customer', 'product','rating','reviews','add_time']
        depth = 1

 # Wishlist serializers
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