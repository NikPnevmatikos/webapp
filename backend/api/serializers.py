from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Buyer_Review, Product, Profile, MyBids, Message, Seller_Review
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# Add serializers here

class Product_Serializer(serializers.ModelSerializer):
    #usefull information from other models
    owner = serializers.CharField(source = 'user.username')
    ownerrating = serializers.CharField(source = 'user.profile.buyer_rating')
    started = serializers.DateTimeField(format = '%Y-%m-%d %H:%M:%S')
    ended = serializers.DateTimeField(format = '%Y-%m-%d %H:%M:%S')
    class Meta:
        model = Product
        fields = '__all__'


class Bids_Serializer(serializers.ModelSerializer):
    #usefull information from other models
    username = serializers.CharField(source = 'user.username')
    seller_rating = serializers.DecimalField(source = 'user.profile.seller_rating', max_digits=7, decimal_places=2)
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

    class Meta:
        model = MyBids
        fields = [
            'username',
            'seller_rating',
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



class Profile_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class User_Serializer(serializers.ModelSerializer):

    #all extra user information from profile model
    name = serializers.SerializerMethodField(read_only=True)
    location = serializers.CharField(source = 'profile.location')
    country = serializers.CharField(source = 'profile.country')
    lat = serializers.FloatField(source = 'profile.lat')
    lng = serializers.FloatField(source = 'profile.lng')
    phone = PhoneNumberField(source = 'profile.phone')
    afm = serializers.CharField(source = 'profile.afm')
    verified = serializers.BooleanField(source = 'profile.verified')
    buyer_rating = serializers.DecimalField(source = 'profile.buyer_rating', max_digits=7, decimal_places=2)
    seller_rating = serializers.DecimalField(source = 'profile.seller_rating', max_digits=7, decimal_places=2)


    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'email', 
            'name', 
            'is_staff', 
            'location',
            'country',
            'lat',
            'lng',
            'phone',
            'afm',
            'verified',
            'buyer_rating',
            'seller_rating',
        ]
        
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.username

        return name

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    #if token is decoded the followed information would be shown
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        return token
    
    #all the json response information for user
    def validate(self, attrs):
        data = super().validate(attrs)
        
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
    
    #new access token
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
     
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class BuyerReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer_Review
        fields = '__all__'

class SellerReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller_Review
        fields = '__all__'