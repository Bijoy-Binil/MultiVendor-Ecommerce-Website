from django.urls import path
from . import views
urlpatterns = [
# ==============================VendorUrls==========================================
    path('vendors/',views.VendorList.as_view()),
    path('vendor/<int:pk>/',views.VendorDetail.as_view()),

 # ==============================ProductUrls==========================================
    path('products/',views.ProductList.as_view()),
    path('products/<int:pk>/',views.ProductDetailList.as_view()),

# ==============================CustomerUrls==========================================
    path('customers/',views.CustomerList.as_view()),
    path('customer/<int:pk>/',views.CustomerDetailList.as_view()),

# ==============================OrderUrls==========================================
    path('orders/',views.OrderList.as_view()),
    path('order/<int:pk>/',views.OrderDetail.as_view()),

# ==============================OrderItemsUrls==========================================

]
