from django.urls import path
from . import views
urlpatterns = [
 
# ======================VendorList===================
    path('vendors/',views.VendorList.as_view() ),
    path('vendor/<int:pk>',views.VendorDetailList.as_view() ),
# ======================VendorList===================

# ======================ProductList===================
    path('products/',views.ProductList.as_view() ),
    path('product/<int:pk>',views.ProductDetailList.as_view() ),
# ======================ProductList===================

# ======================CustomerList===================
    path('customers/',views.CustomerList.as_view() ),
    path('customer/<int:pk>',views.CustomerDetailList.as_view() ),
# ======================CustomerList===================

# ======================OrderList===================
    path('orders/',views.OrderList.as_view() ),
    path('order/<int:pk>',views.OrderDetailList.as_view() ),
# ======================OrderList===================

# ======================OrderItemsList===================
    path('order-items/',views.OrderItemsList.as_view() ),
    path('order-item/<int:pk>',views.OrderItemsDetailList.as_view() ),
# ======================OrderItemsList===================

]
