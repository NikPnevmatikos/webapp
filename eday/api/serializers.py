from dataclasses import fields
from xml.dom.expatbuilder import InternalSubsetExtractor
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

# Add serializers here

class Product_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        