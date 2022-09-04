from dataclasses import fields
from xml.dom.expatbuilder import InternalSubsetExtractor
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Profile

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# Add serializers here

class Product_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class Profile_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class User_Serializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)
    location = serializers.CharField(source = 'profile.location')
    phone = serializers.IntegerField(source = 'profile.phone')
    afm = serializers.IntegerField(source = 'profile.afm')
    verified = serializers.BooleanField(source = 'profile.verified')

    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'email', 
            'name', 
            'is_staff', 
            'location',
            'phone',
            'afm',
            'verified',
        ]
        
        
    # def create(self, validated_data):
    #     dob_data = validated_data.pop('dob')

    #     user = User.objects.create(
    #         username=validated_data.get('username'),
    #         email=validated_data.get('email'),
    #         password=validated_data.get('password')
    #     )
    #     user.set_password(validated_data.get('password'))
    #     user.save()

    #     Profile.objects.create(user=user, dob=dob_data)
    #     return user
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.username

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
    location = serializers.CharField(source = 'profile.location')
    phone = serializers.IntegerField(source = 'profile.phone')
    afm = serializers.IntegerField(source = 'profile.afm')
    verified = serializers.BooleanField(source = 'profile.verified')
        
    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'email', 
            'name',
            'is_staff', 
            'token', 
            'location',
            'phone',
            'afm',
            'verified',
        ]
        
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    