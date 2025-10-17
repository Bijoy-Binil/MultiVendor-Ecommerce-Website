from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views

# DRF Router registrations
router = DefaultRouter()
router.register('address', views.CustomerAddressViewSet)
router.register('product-rating', views.ProductRatingViewset)

urlpatterns = [

    # ============================
    # 🏪 Vendor Endpoints
    # ============================
    path('vendors/', views.VendorList.as_view()),
    path('vendor/register/', views.vendor_register, name="vendor-register"),
    path('vendor/login/', views.vendor_login, name="vendor-login"),
    path('vendor/<int:pk>/', views.VendorDetail.as_view()),
    path('vendor/<int:pk>/customers/', views.VendorCustomerList.as_view()),
    path("vendor/<int:pk>/order-items", views.VendorOrderList.as_view()),
   path("vendor/<int:pk>/daily-report/", views.VendorDailyreport.as_view()), 
path('vendor/<int:pk>/monthly-report/', views.VendorMonthlyReport.as_view(), name='vendor-monthly-report'),    path('vendor/<int:pk>/yearly-report/', views.VendorYearlyReport.as_view(), 
name='vendor-yearly-report'),
 path("<int:pk>/change-password/", views.ChangePasswordView.as_view(), name="change-password"),

    path('vendor/dashboard/<int:pk>/', views.vendor_dashboard, name='vendor-dashboard'),

    # ============================
    # 🛍️ Product Endpoints
    # ============================
    path('products/', views.ProductList.as_view()),
    path('products/<str:tag>', views.TagProductList.as_view()),
    path('related-products/<int:pk>/', views.RelatedProductList.as_view()),
    path('product-imgs/', views.ProductImgsList.as_view()),
    path('product-imgs/<int:pk>/', views.ProductImageDeleteAPIView.as_view(), name='product-image-delete'),
    path('product/<int:pk>/', views.ProductDetail.as_view()),
    path("update_product_download_count/<int:product_id>/", views.update_product_download_count, name="downloads"),

    # ============================
    # 🧩 Product Categories
    # ============================
    path('categories/', views.CategoryList.as_view()),
    path('category/<int:pk>/', views.CategoryDetail.as_view()),

    # ============================
    # 👤 Customer Endpoints
    # ============================
    path('customers/', views.CustomerList.as_view()),
    path('customer/<int:pk>/', views.CustomerDetail.as_view()),
    path('customer/login/', views.customer_login, name='customer_login'),
    path('customer/register/', views.customer_register, name='customer_register'),
    path('user/<int:pk>/', views.UserDetail.as_view()),
    path("customer/<int:pk>/order-items", views.CustomerOrderList.as_view()),
    path("customer/<int:pk>/wish-items", views.CustomerWishItemList.as_view()),
    path("customer/<int:pk>/address-list/", views.CustomerAddressList.as_view()),
    path("customer/dashboard/<int:pk>/", views.customer_dashboard, name="customer_dashbaord"),
    path("vendor/<int:vendor_id>/customer/<int:customer_id>/order-items/", views.VendorCustomerOrderList.as_view()),


    # ============================
    # 📦 Order Endpoints
    # ============================
    path('orders/', views.OrderList.as_view()),
    path('order/<int:pk>/', views.OrderDetail.as_view()),
    path('order-modify/<int:pk>/', views.OrderModify.as_view()),
    path("update-order-status/<int:order_id>/", views.update_order_status, name="order-status"),

    # ============================
    # 📦 Order Items
    # ============================
    path('order-items/', views.OrderItemsList.as_view()),
    path('order-item/<int:pk>/', views.OrderItemsDetail.as_view()),

    # ============================
    # 💖 Wishlist Endpoints
    # ============================
    path("wishlists/", views.WishList.as_view()),
    path("check-in-wishlists/", views.check_in_wishlist, name="check_in_wishlists"),
    path("remove-from-wishlists/", views.remove_from_wishlists, name="remove_from_wishlists"),

    # ============================
    # 🏠 Address Management
    # ============================
    path("mark-as-default-address/<int:pk>/", views.mark_as_default_address, name="mark-as-default-addres"),
]

# Add router-generated URLs
urlpatterns += router.urls

# Serve media files in debug mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
