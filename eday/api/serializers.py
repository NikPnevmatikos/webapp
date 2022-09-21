from dataclasses import fields
from xml.dom.expatbuilder import InternalSubsetExtractor
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Profile, MyBids, Message
from phonenumber_field.serializerfields import PhoneNumberField


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# Add serializers here

class Product_Serializer(serializers.ModelSerializer):
    started = serializers.DateTimeField(format = '%Y-%m-%d %H:%M:%S')
    ended = serializers.DateTimeField(format = '%Y-%m-%d %H:%M:%S')
    class Meta:
        model = Product
        fields = '__all__'


class Bids_Serializer(serializers.ModelSerializer):
    
    username = serializers.CharField(source = 'user.username')
    owner = serializers.CharField(source = 'product.user.id')
    name = serializers.CharField(source = 'product.name')
    image = serializers.ImageField(source = 'product.image')
    brand = serializers.CharField(source = 'product.brand')
    category = serializers.CharField(source = 'product.category')
    price = serializers.DecimalField(source = 'product.price', max_digits=7, decimal_places=2)
    currently = serializers.DecimalField(source = 'product.currently', max_digits=7, decimal_places=2)
    start = serializers.DateTimeField(source = 'product.started', format = '%Y-%m-%d %H:%M:%S')
    end = serializers.DateTimeField(source = 'product.ended',format = '%Y-%m-%d %H:%M:%S')
    payed = serializers.BooleanField(source = 'product.payed')
    
    # created_at = serializers.DateField(format=None, input_formats=None)


    class Meta:
        model = MyBids
        fields = [
            'username',
            'owner',
            'name',
            'image',
            'brand',
            'category',
            'price',
            'currently',
            'user',
            'product',
            'value',
            'winningBid',
            'start',
            'end',
            'payed',
            '_id'
            ]

    def get_productinfo(self,obj):
        product = Product.objects.filter(_id = obj.product._id)

        serializer = Product_Serializer(product,many=False)

        return serializer.data


class Profile_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class User_Serializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)
    location = serializers.CharField(source = 'profile.location')
    phone = PhoneNumberField(source = 'profile.phone')
    afm = serializers.CharField(source = 'profile.afm')
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
    verified = serializers.BooleanField(source = 'profile.verified')
        
    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'email', 
            'name',
            'is_staff', 
            'verified',
            'token', 

        ]
        
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
    
    
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'