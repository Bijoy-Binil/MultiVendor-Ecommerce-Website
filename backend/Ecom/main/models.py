from django.db import models
from django.contrib.auth.models import User
# Create your models here.

#Vendor Models
class Vendor(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    address=models.TextField(null=True)

    def __str__(self):
        return self.user.username
    
#Product Category
class ProductCategory(models.Model):
    title=models.CharField(max_length=200)
    detail=models.TextField(null=True)

    def __str__(self):
        return self.title
    
#Products
class Product(models.Model):
    category=models.ForeignKey(ProductCategory,on_delete=models.SET_NULL,null=True,related_name='category_products')
    vendor=models.ForeignKey(Vendor,on_delete=models.SET_NULL,null=True)
    title=models.CharField(max_length=200)
    detail=models.TextField(null=True)
    price=models.FloatField()

    def __str__(self):
        return self.title
    
# ==============================================================
#Customer Model 
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    mobile_number = models.PositiveBigIntegerField()

    def __str__(self):
        return self.user.username

#Order Model  
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)
    order_time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.customer.user.username}"

#Order Items Model 
class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE,related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # Corrected here

    def __str__(self):
        return f"{self.product.title} in Order #{self.order.id}"
    
#Customer AddressModel
class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,related_name='customer_addresses')
    address = models.TextField()  
    default_address=models.BooleanField(default=False)

    def __str__(self):
        return self.address

#Product Rating And Reviews

class ProductRating(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='rating_customers')
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_ratings')
    rating=models.IntegerField()
    reviews=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rating: {self.rating} - Review: {self.reviews}"