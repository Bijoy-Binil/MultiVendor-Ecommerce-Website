from django.conf import settings
from django.urls import path
from . import views
from django.conf.urls.static import static
from rest_framework import routers

router=routers.DefaultRouter()
router.register('address', views.CustomerAddressViewset, basename='customeraddress')
router.register('productrating', views.ProductRatingViewset, basename='productrating')


urlpatterns = [
# ==============================VendorUrls==========================================
    path('vendors/',views.VendorList.as_view()),
    path('vendor/<int:pk>/',views.VendorDetail.as_view()),

 # ==============================ProductUrls==========================================
    path('products/',views.ProductList.as_view()),
    path('products/<str:tag>/', views.TagProductList.as_view()),
    path('product/<int:pk>/',views.ProductDetailList.as_view()),
    path('related-product/<int:pk>/',views.RelatedProductList.as_view()),

 # ==============================ProductCategoriesUrls==========================================
    path('categories/',views.CategoryList.as_view()),
    path('category/<int:pk>/',views.CategoryDetailList.as_view()),

# ==============================CustomerUrls==========================================
    path('customers/',views.CustomerList.as_view()),
    path('customer/<int:pk>/',views.CustomerDetailList.as_view()),
    path('customer/login/',views.CustomerLogin,name="customer_login"),
    path('customer/register/',views.CustomerRegister,name="customer_register"),

# ==============================OrderUrls==========================================
    path('orders/',views.OrderList.as_view()),
    path('order/<int:pk>/',views.OrderDetail.as_view()),

# ==============================CustomerAddressUrls==========================================

]+static (settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns +=router.urls