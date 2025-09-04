from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter 
from django.conf import settings
from django.conf.urls.static import static
router=DefaultRouter()
router.register('address', views.CustomerAddressViewset)
router.register('product-rating', views.ProductRatingViewset)

urlpatterns = [
 
# Vendor endpoints
path('vendors/', views.VendorList.as_view()),
path('vendor/<int:pk>/', views.VendorDetail.as_view()),

# Product endpoints
path('products/', views.ProductList.as_view()),
path('products/<str:tag>', views.TagProductList.as_view()),
path('related-products/<int:pk>/', views.RelatedProductList.as_view()),
path('product/<int:pk>/', views.ProductDetail.as_view()),

# Product Categories endpoints
path('categories/', views.CategoryList.as_view()),
path('category/<int:pk>/', views.CategoryDetail.as_view()),

# Customer endpoints
path('customers/', views.CustomerList.as_view()),
path('customer/<int:pk>/', views.CustomerDetail.as_view()),

# Order endpoints
path('orders/', views.OrderList.as_view()),
path('order/<int:pk>/', views.OrderDetail.as_view()),

# Order Items endpoints
path('order-items/', views.OrderItemsList.as_view()),
path('order-item/<int:pk>/', views.OrderItemsDetail.as_view()),



]
urlpatterns +=router.urls
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)