from django.contrib import admin
from .models import Vendor,Product,ProductCategory,Customer,Order,OrderItems,CustomerAddress,ProductRating,ProductImage
# Register your models here.

admin.site.register(Vendor)
admin.site.register(ProductCategory)

class CustomerAdmin(admin.ModelAdmin):
    list_display=['get_username','mobile_number']
    def get_username(self,obj):
        return obj.user.username
admin.site.register(Customer,CustomerAdmin)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['customer', 'order_time'] 
    
admin.site.register(OrderItems)
admin.site.register(CustomerAddress)
admin.site.register(ProductRating)
admin.site.register(ProductImage)

class ProductImagesInline(admin.StackedInline):
    model=ProductImage

class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    inlines=[
        ProductImagesInline,
    ] 
admin.site.register(Product, ProductAdmin)

