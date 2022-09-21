from email import message
from genericpath import exists
from pydoc import describe
from unicodedata import category
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.db.models import Max
from .serializers import *
from .models import Product, Profile, MyBids, Buyer_Review, Seller_Review
from datetime import datetime
from django.utils import timezone
import pytz
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
    
    query = request.query_params.get('keyword')
    page = request.query_params.get('page')
    
    if query == None:
        query=''
        
    
    products = Product.objects.filter(name__icontains=query) | Product.objects.filter(category=query)
    products = products.order_by('-_id')
    
    paginator = Paginator(products,4)
    
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
        
    if page==None:
        page=1
        
    page = int(page)
    
    serializer = Product_Serializer(products, many=True)
    
    return Response({'products':serializer.data, 'pages': paginator.num_pages, 'page': page})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_products(request):

    user = request.user
    page = request.query_params.get('page')

    products = Product.objects.filter(user=user.id).order_by('-_id')
    
    paginator = Paginator(products,4)
    
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
        
    if page==None:
        page=1
        
    page = int(page)
    
    serializer = Product_Serializer(products, many=True)
    
    return Response({'products':serializer.data, 'pages': paginator.num_pages, 'page': page})


@api_view(['GET'])
def product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = Product_Serializer(product, many=False)
    return Response(serializer.data)      


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product(request):

    user = request.user
    data = request.data
    
    
    product = Product.objects.create (
        user = user,
        name =  data['name'],
        price = data['price'],
        brand = data['brand'],
        category = data['category'],
        image = request.FILES.get('image'),
        description = data['description'],
        countInStock = data['countInStock'],
        first_bid = data['firstBid'],
        started = data['startingdate'],
        ended = data['endingdate']   
    )   
    
    serializer = Product_Serializer(product, many = False)

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_product(request, pk):

    data = request.data
    
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.category = data['category']
    
    if(data['flag'] == 'true'):
        product.image = request.FILES.get('image')
    
    product.countInStock = data['countInStock']
    product.description = data['description']
    product.first_bid = data['firstBid']
    product.started = data['startingdate'] 
    product.ended = data['endingdate']  
    
    product.save()

    serializer = Product_Serializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()

    return Response('Item succsesfully delete!')



# ///////////////////////////////////////////     B   I   D   S     //////////////////////////////////////////////////////


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_bids(request):

    user = request.user
    page = request.query_params.get('page')

    bids = MyBids.objects.filter(user=user.id).order_by('-_id')
    
    paginator = Paginator(bids, 4)
    
    try:
        bids = paginator.page(page)
    except PageNotAnInteger:
        bids = paginator.page(1)
    except EmptyPage:
        bids = paginator.page(paginator.num_pages)
        
    if page == None:
        page=1
        
    page = int(page)
    
    serializer = Bids_Serializer(bids, many=True)
    
    return Response({'bids':serializer.data, 'pages': paginator.num_pages, 'page': page})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def product_bids(request, pk):

    page = request.query_params.get('page')
    
    bids = MyBids.objects.filter(product = pk).order_by('-_id')
    
    paginator = Paginator(bids,5)
    
    try:
        bids = paginator.page(page)
    except PageNotAnInteger:
        bids = paginator.page(1)
    except EmptyPage:
        bids = paginator.page(paginator.num_pages)
        
    if page==None:
        page=1
        
    page = int(page)
    
    
    serializer = Bids_Serializer(bids, many=True)
    
    return Response({'bids':serializer.data, 'pages': paginator.num_pages, 'page': page})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_bid(request, pk):
    bid = MyBids.objects.get(_id=pk)
    
    product = Product.objects.get(_id = bid.product._id)
    value = bid.value
    
    bid.delete()
    
    if (float(product.currently) == float(value)):
        maxbid = MyBids.objects.filter(product = product._id).order_by('-value').first()
        maxbid.winningBid = True
        maxbid.save()
        product.currently = maxbid.value    
    
    product.number_of_bids -= 1
    product.save()
    
    return Response('Bid succsesfully delete!')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_bid(request, pk):

    user = request.user
    product = Product.objects.get(_id = pk)
    
    data = request.data

    try:
        
        cur = timezone.now().replace(tzinfo=(pytz.timezone('Europe/Athens'))).strftime('%Y-%m-%d %H:%M:%S')
        #current_time = datetime.now().replace(tzinfo=(pytz.timezone('Europe/Athens'))).strftime('%Y-%m-%d %H:%M:%S')
        
        if(cur > product.ended.strftime('%Y-%m-%d %H:%M:%S')):
            raise Exception
        
        maxbid = MyBids.objects.filter(product = product._id).order_by('-value').first()
        
        if(maxbid != None):
            maxbid.winningBid = False
            maxbid.save()

        bid = MyBids.objects.create (
            user = user,
            product = product,
            value = data['value']         
        )   
        if (float(bid.value) >= product.price):
            product.payed = True
            
        bid.save()
        
        product.currently = data['value']
        product.currentwinner = user.id
        product.number_of_bids += 1
        product.save()

        return Response("Bid succesfully placed")
    
    except Exception:
        message = {'detail' : 'Cannot place Bid, Auction has ended'}
            
        return Response(message, status=status.HTTP_400_BAD_REQUEST)




# /////////////////////////////////////////////   U   S   E   R   S   ////////////////////////////////////////////////////

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'], 
            username = data['username'], 
            email = data['email'],
            password = make_password(data['password'])
        )

        user.profile.location = data['location']
        user.profile.phone = data['phone']
        user.profile.afm = data['afm']
        user.save()

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
    
    user.profile.location = data['location']
    user.profile.phone = data['phone']
    user.profile.afm = data['afm']
    
    user.save()
    
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    serializer = User_Serializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile_by_Id(request, pk):
    user = User.objects.get(id=pk)
    serializer = User_Serializer(user, many=False)
    
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    
    page = request.query_params.get('page')
    
    users = User.objects.all()
    
    paginator = Paginator(users,5)
    
    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)
        
    if page==None:
        page=1
        
    page = int(page)
    
    
    serializer = User_Serializer(users, many=True)
    return Response({'users':serializer.data, 'pages': paginator.num_pages, 'page': page})

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response('User succsesfully delete!')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def verify_user(request, pk):
    user = User.objects.get(id = pk)
    
    user.profile.verified = True
    
    user.save()
    
    serializer = User_Serializer(user, many = False)
    
    return Response(serializer.data)

#///////////////////////////////////////////////////////////////////////////////////////////

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_buyer_review(request, pk):
    owner = request.user 
    buyer = User.objects.get(id = pk)

    data = request.data
    exist = Buyer_Review.objects.filter(owner=owner).filter(buyer=buyer).exists()

    if (exist == False):
        Buyer_Review.objects.create(
            owner = owner,
            buyer = buyer,
            rating = data['rating']
        )
    
    else:
        review = Buyer_Review.objects.filter(owner=owner).filter(buyer=buyer)
        for i in review:
            i.rating = data['rating']
            i.save()

    allreviews = Buyer_Review.objects.filter(buyer=buyer)
    buyer.profile.buyer_rev_num = len(allreviews)
    
    total = 0

    for i in allreviews:
        total += i.rating 
    
    # find the average rating of the buyer
    buyer.profile.buyer_rating = total / len(allreviews)

    buyer.save()

    return Response('Rating Succesfully Uploaded.')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_seller_review(request, pk):
    owner = request.user 
    seller = User.objects.get(id = pk)

    data = request.data
    exist = Seller_Review.objects.filter(owner=owner).filter(seller=seller).exists()

    if (exist == False):
        Seller_Review.objects.create(
            owner = owner,
            seller = seller,
            rating = data['rating']
        )
    
    else:
        review = Seller_Review.objects.filter(owner=owner).filter(seller=seller)
        for i in review:
            i.rating = data['rating']
            i.save()

    allreviews = Seller_Review.objects.filter(seller=seller)
    seller.profile.seller_rev_num = len(allreviews)
    
    total = 0

    for i in allreviews:
        total += i.rating 
    
    # find the average rating of the seller
    seller.profile.seller_rating = total / len(allreviews)

    seller.save()

    return Response('Rating Succesfully Uploaded.')


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_seller_review(request, pk):
#     owner = request.user 
#     buyer = User.objects.get(id = pk)

#     data = request.data
#     exist = Buyer_Review.objects.filter(owner=owner).filter(buyer=buyer).exist()

#     if (exist == False):
#         Buyer_Review.objects.create(
#             owner = owner,
#             buyer = buyer,
#             rating = data['rating']
#         )
        

#///////////////////////////////////////////////////////////////////////////////////////////

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_message(request, pk):
    sender = request.user
    receiver = User.objects.get(id=pk)
    data = request.data
    
    message = Message.objects.create(
        sender= sender,
        senderName = sender.username,
        receiver = receiver,
        receiverName = receiver.username,
        context = data['context']
    )
    
    serializer = MessageSerializer(message, many=False)
    
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def received_messages(request):
    
    page = request.query_params.get('page')
    
    user = request.user
    
    messages = Message.objects.filter(receiver=user).order_by('-createdAt')
    
    paginator = Paginator(messages,5)
    
    try:
        messages = paginator.page(page)
    except PageNotAnInteger:
        messages = paginator.page(1)
    except EmptyPage:
        messages = paginator.page(paginator.num_pages)
        
    if page==None:
        page=1
        
    page = int(page)
    
    serializer = MessageSerializer(messages, many=True)
    
    return Response({'messages':serializer.data, 'pages': paginator.num_pages, 'page': page})
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def send_messages(request):
    
    page = request.query_params.get('page')
        
    user = request.user
    
    messages = Message.objects.filter(sender=user).order_by('-createdAt')
    
    paginator = Paginator(messages,5)
    
    try:
        messages = paginator.page(page)
    except PageNotAnInteger:
        messages = paginator.page(1)
    except EmptyPage:
        messages = paginator.page(paginator.num_pages)
        
    if page==None:
        page=1
        
    page = int(page)
    
    serializer = MessageSerializer(messages, many=True)
    
    return Response({'messages':serializer.data, 'pages': paginator.num_pages, 'page': page})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_message(request,pk):
    
    message = Message.objects.get(_id=pk)
    
    if(message.read == False):
        message.read = True
        message.save()
    
    serializer = MessageSerializer(message, many=False)
    
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unread_message(request):
    
    user = request.user
    
    num_of_messages = Message.objects.filter(receiver=user).filter(read = False).count()
    
    return Response(num_of_messages) 