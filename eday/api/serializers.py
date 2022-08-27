from dataclasses import fields
from xml.dom.expatbuilder import InternalSubsetExtractor
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Add serializers here

class Product_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username' , 'email']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token
        
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email
        
        
        return data
        