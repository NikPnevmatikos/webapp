from dataclasses import fields
from xml.dom.expatbuilder import InternalSubsetExtractor
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# Add serializers here

class Product_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class User_Serializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'is_staff']
        
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

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

        # data['username'] = self.user.username
        # data['email'] = self.user.email
        
        serializer = UserSerializerWithToken(self.user).data
        
        for key, value in serializer.items():
            data[key] = value
            
        
        return data

class UserSerializerWithToken(User_Serializer):

    token = serializers.SerializerMethodField(read_only = True)
        
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'is_staff', 'token']
        
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    