from django.contrib import admin
from .models import Vendor,Product,ProductCategory
# Register your models here.

admin.site.register(Vendor)
admin.site.register(Product)
admin.site.register(ProductCategory)