from email import message
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .serializers import *
from .models import Product

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# from .products import products


# Create your views here.
def hello(request):
    return HttpResponse("<h1> E d a y <h1>")

@api_view(['GET'])
def api_overview(request):
    apiurls = {
        'all_products' : '/product_list/',
        'product' : '/product/<str:pk>/',
        'create' : '/create/',
        'update' : '/update/<str:pk>/',
        'delete' : '/delete/<str:pk>/'
    }
    return Response(apiurls)

@api_view(['GET'])
def all_products(request):
    products = Product.objects.all().order_by('-_id')
    serializer = Product_Serializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = Product_Serializer(product, many=False)
    return Response(serializer.data)      


@api_view(['POST'])
def create(request):
    serializer = Product_Serializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def update(request, pk):
    product = Product.objects.get(id=pk)
    serializer = Product_Serializer(instance=product, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def delete(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()

    return Response('Item succsesfully delete!')


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'], 
            username = data['username'], # na baloume username ant gia email
            email = data['email'],
            password = make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many = False)
        return Response(serializer.data)
    except:
        message = {'detail' : 'There is already an account using this email or username.'}
            
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user

    serializer = UserSerializerWithToken(user, many=False)
    
    data = request.data
    
    user.first_name = data['name']
    user.username = data['username']
    user.email = data['email']
    
    if data['password'] != '':
        user.password = make_password(data['password'])
        
    user.save()
    
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    serializer = User_Serializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = User_Serializer(users, many=True)
    return Response(serializer.data)