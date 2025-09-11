from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

# Vendor Model
class Vendor(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    address = models.TextField(null=True)
    
    def __str__(self):
        return self.user.username



# Product Category Model
class ProductCategory(models.Model):
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)

    def __str__(self):
        return self.title



# Product Model
class Product(models.Model):    
    category = models.ForeignKey(
        ProductCategory, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name="categoryProducts"
    )
    slug = models.SlugField(max_length=255, blank=True, null=True)  # no unique
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)
    price = models.IntegerField()
    tags=models.TextField(null=True)
    image = models.ImageField(upload_to='product_imgs/',null=True)
    demo_url=models.URLField(null=True,blank=True)
    product_file = models.FileField(upload_to='products/', null=True, blank=True)    
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
    def tag_list(self):
        if self.tags:
            return [t.strip() for t in self.tags.split(',')]
        return [] 




class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mobile = models.IntegerField(unique=True)  

    def __str__(self):
        return self.user.username



# Customer Address Model
class CustomerAddress(models.Model):
    customer = models.ForeignKey(
        Customer, 
        on_delete=models.CASCADE, 
        related_name="customer_addresses"
    )
    address = models.TextField()
    default_address = models.BooleanField(default=False)

    def __str__(self):
        return self.address



# Order Model
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_time = models.DateTimeField(auto_now_add=True)
    order_status=models.BooleanField(default=False)
    
    def __str__(self):
        return f"Order #{self.id} by {self.customer.user.username}"



# Order Items Model
class OrderItems(models.Model):
    order = models.ForeignKey(
        Order, 
        on_delete=models.CASCADE, 
        related_name="orderItems"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty=models.IntegerField(default=1)
    price=models.DecimalField(max_digits=10,decimal_places=2,default=0)


    def __str__(self):
        return self.product.title



# Rating & Review Model 
class ProductRating(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='rating_customers')
    product = models.ForeignKey(Product, on_delete=models.CASCADE,related_name='product_ratings')
    rating=models.IntegerField()
    reviews=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.rating} - {self.reviews}'


# Product Images Model
class ProductImage(models.Model):
    product = models.ForeignKey( Product, on_delete=models.CASCADE, related_name="product_imgs" )
    image = models.ImageField(upload_to='product_imgs/',null=True)
   

    def __str__(self):
        return self.image.url 
    
    
