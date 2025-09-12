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
            'price', 'product_ratings', 'product_imgs',"product_file"
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
        fields = ['id', 'category', 'vendor', 'title',"slug","tag_list","image","demo_url" ,'detail', 'price','product_ratings',"product_imgs",'product_file']

    def get_tag_list(self, obj):
        return obj.tag_list()  # call your model method safely
# Customer serializers
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id', 'user', 'mobile']
        # depth = 1

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id', 'user', ]
        depth = 1




# Order serializers
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['id', 'customer','order_status']
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
        fields = ['id', 'order', 'product', 'qty', 'price', 'order_info', 'product_info']

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
class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomerAddress
        fields = ['id', 'customer', 'address','default_address']
        depth = 1

# ProductRating serializers
class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductRating
        fields = ['id', 'customer', 'product','rating','reviews','add_time']
        depth = 1