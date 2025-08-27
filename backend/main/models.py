from django.db import models
from django.contrib.auth.models import User
# Create your models here.

# ======================Vendor Model===================
class Vendor(models.Model):
    user=models.ForeignKey(User,null=True,on_delete=models.CASCADE)
    address=models.TextField(null=True)
    
    def __str__(self):
        return self.user.username
# ======================Vendor Model===================



# ======================Product Category===================
class ProductCategory(models.Model):

    title=models.CharField(max_length=200)
    detail=models.TextField(null=True)

    def __str__(self):
        return self.title
# ======================Product Category===================



# ======================Product Model===================
class Product(models.Model):    
    category=models.ForeignKey(ProductCategory,on_delete=models.SET_NULL,null=True,related_name="categoryProducts")
    vendor=models.ForeignKey(Vendor,on_delete=models.SET_NULL,null=True)
    title=models.CharField(max_length=200)
    detail=models.TextField(null=True)
    price=models.IntegerField()

    def __str__(self):
        return self.title
# ======================Product Model===================



# ======================Customer Model===================
class Customer(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    mobile=models.PositiveIntegerField()

    def __str__(self):
        return self.user.username
# ======================Customer Model===================



# ======================Order Model===================
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} by {self.customer.user.username}"
# ======================Order Model===================

    
    
# ======================OrderItems Model===================
class OrderItems(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name="orderItems")
    product=models.ForeignKey(Product,on_delete=models.CASCADE)


    def __str__(self):
        return self.product.title
# ======================OrderItems Model===================
