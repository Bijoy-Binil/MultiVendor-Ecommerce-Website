from rest_framework import serializers
from .models import Vendor  # make sure Vendor model is imported
from django.contrib.auth.models import User  # or your custom User model


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address']

    def __init__(self, *args, **kwargs):
        super(VendorSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1 

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address']

    def __init__(self, *args, **kwargs):
        super(VendorDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth =1
