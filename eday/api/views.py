from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .serializers import *
from .models import Product, Profile, MyBids, Buyer_Review, Seller_Review
from django.utils import timezone
import pytz
from rest_framework_simplejwt.views import TokenObtainPairView
import xml.etree.ElementTree as ET
import json

#returns all product bjects in database
@api_view(['GET'])
def all_products(request):
    
    query = request.query_params.get('keyword')         #keyword is for the search option 
    page = request.query_params.get('page')             #products are divided in pages
    
    if query == None:
        query=''
        
    #query the products that contains keyword in either name or category
    products = Product.objects.filter(name__icontains=query) | Product.objects.filter(category=query)
    products = products.order_by('-_id')
    
    paginator = Paginator(products,4)   #4 products in each page
    
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

#return requested user's created products
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

#returns a sigle product
@api_view(['GET'])
def product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = Product_Serializer(product, many=False)
    return Response(serializer.data)      

from decimal import *
#creates a product
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product(request):

    user = request.user
    data = request.data

    product = Product.objects.create (
        user = user,
        name =  data['name'],
        price = float(data['price']),
        brand = data['brand'],
        category = data['category'],
        image = request.FILES.get('image'),
        description = data['description'],
        countInStock = data['countInStock'],
        first_bid = float(data['firstBid']),
        started = data['startingdate'],
        ended = data['endingdate'],
        lat = float(data['lat']),
        lng = float(data['lng']),
        country = data['country'],
        location = data['location']   
    )   
    
    serializer = Product_Serializer(product, many = False)

    return Response(serializer.data)

#updates product
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_product(request, pk):

    data = request.data
    
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = float(data['price'])
    product.brand = data['brand']
    product.category = data['category']
    
    #if a new image is uploaded 
    if(data['flag'] == 'true'):
        product.image = request.FILES.get('image')
    
    product.countInStock = data['countInStock']
    product.description = data['description']
    product.first_bid = float(data['firstBid'])
    product.started = data['startingdate'] 
    product.ended = data['endingdate']  
    product.lat = float(data['lat'])
    product.lng = float(data['lng'])
    product.country = data['country']
    product.location = data['location']
    
    product.save()

    serializer = Product_Serializer(product, many=False)
    return Response(serializer.data)

#delete a product
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()

    return Response('Item succsesfully delete!')



# ///////////////////////////////////////////     B   I   D   S     //////////////////////////////////////////////////////

#returns all user related bids
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

#return all placed bids for a product
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

#delete a user bid
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_bid(request, pk):
    bid = MyBids.objects.get(_id=pk)
    
    product = Product.objects.get(_id = bid.product._id)
    value = bid.value
    
    bid.delete()
    
    #if bid value was the highest bid for a product, update the current highest bid
    if (float(product.currently) == float(value)):
        maxbid = MyBids.objects.filter(product = product._id).order_by('-value').first()
        maxbid.winningBid = True
        maxbid.save()
        product.currently = maxbid.value    
    
    product.number_of_bids -= 1
    product.save()
    
    return Response('Bid succsesfully delete!')

#create a user bid
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_bid(request, pk):

    user = request.user
    product = Product.objects.get(_id = pk)
    
    data = request.data

    try:
        
        cur = timezone.now().replace(tzinfo=(pytz.timezone('Europe/Athens'))).strftime('%Y-%m-%d %H:%M:%S')
        
        #a bid cannot be created if auction has ended
        if(cur > product.ended.strftime('%Y-%m-%d %H:%M:%S')):
            raise Exception
        
        maxbid = MyBids.objects.filter(product = product._id).order_by('-value').first()
        
        #if there are more than one bid
        if(maxbid != None):
            maxbid.winningBid = False
            maxbid.save()

        bid = MyBids.objects.create (
            user = user,
            product = product,
            value = float(data['value'])         
        )   
        
        #auction ends if a bid is higher or equal than buyer suggestive price
        if (float(bid.value) >= product.price):
            product.payed = True
            
        bid.save()
        
        product.currently = float(data['value'])
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

#register a new user
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

        #extra information about user store in model Profile
        user.profile.location = data['location']
        user.profile.country = data['country']
        user.profile.lat = data['lat']
        user.profile.lng = data['lng']
        user.profile.phone = data['phone']
        user.profile.afm = data['afm']
        user.save()

        serializer = UserSerializerWithToken(user, many = False)
        
        return Response(serializer.data)

    except:
        message = {'detail' : 'There is already an account using this email or username.'}
            
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


#update user information
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user

    serializer = UserSerializerWithToken(user, many=False)
    
    data = request.data
    
    user.first_name = data['name']
    user.username = data['username']
    user.email = data['email']

    #password change is optional
    if data['password'] != '':
        user.password = make_password(data['password'])
    
    user.profile.location = data['location']
    user.profile.country = data['country']
    user.profile.lat = data['lat']
    user.profile.lng = data['lng']
    user.profile.phone = data['phone']
    user.profile.afm = data['afm']
    
    user.save()
    
    return Response(serializer.data)

#get user info by requested user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    serializer = User_Serializer(user, many=False)
    return Response(serializer.data)

#get user info by userID
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile_by_Id(request, pk):
    user = User.objects.get(id=pk)
    serializer = User_Serializer(user, many=False)
    
    return Response(serializer.data)

#get all users information
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

#delete a user
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response('User succsesfully delete!')

#user verification by admin
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def verify_user(request, pk):
    user = User.objects.get(id = pk)
    
    user.profile.verified = True
    
    user.save()
    
    serializer = User_Serializer(user, many = False)
    
    return Response(serializer.data)

#///////////////////////////////////////////////////////////////////////////////////////////

#buyer review creation
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_buyer_review(request, pk):
    owner = request.user 
    buyer = User.objects.get(id = pk)

    data = request.data
    exist = Buyer_Review.objects.filter(owner=owner).filter(buyer=buyer).exists()

    #if review exist update the value
    if (exist == False):
        Buyer_Review.objects.create(
            owner = owner,
            buyer = buyer,
            rating = data['rating']
        )
    #else create the review
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

#seller review creation
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
        

#///////////////////////////////////////////////////////////////////////////////////////////

#message creation
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

#return user's received messages
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
    
#return user's sended messages
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

#single message information
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_message(request,pk):
    
    message = Message.objects.get(_id=pk)
    
    if(message.read == False):
        message.read = True
        message.save()
    
    serializer = MessageSerializer(message, many=False)
    
    return Response(serializer.data)

#number of messages unread by requeted user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unread_message(request):
    
    user = request.user
    
    num_of_messages = Message.objects.filter(receiver=user).filter(read = False).count()
    
    return Response(num_of_messages) 


#/////////////////////////////////////////////////////////////////////////////////////////

#helper function for adding lines and tabs in xml file
def indent(elem, level=0):
    i = "\n" + level*"  "
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = i + "  "
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
        for elem in elem:
            indent(elem, level+1)
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
    else:
        if level and (not elem.tail or not elem.tail.strip()):
            elem.tail = i



#creates xml file and returns the data of file 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_xml(request, pk):
    product = Product.objects.get(_id=pk)
    mybids = MyBids.objects.filter(product = product) 
    
    # Creation of the xml file
    root = ET.Element("Item")
    root.set("ItemID", str(product._id))
    
    name = ET.Element("Name")
    name.text = product.name   
    root.append(name)

    category = ET.Element("Category")
    category.text = product.category   
    root.append(category)

    currently = ET.Element("Currently")
    currently.text = str(product.currently)   
    root.append(currently)

    first_bid = ET.Element("First_Bid")
    first_bid.text = str(product.first_bid)   
    root.append(first_bid)

    number_of_bids = ET.Element("Number_of_Bids")
    number_of_bids.text = str(product.number_of_bids)
    root.append(number_of_bids)
    
    bids = ET.Element("Bids")
    root.append(bids)

    for i in mybids:
        bid = ET.SubElement(bids, "Bid")
        bidder_rating = ET.SubElement(bid, "Bidder_Rating")
        bidder_rating.set("Rating", str(i.user.profile.seller_rating))   
        bidder_rating.set("UserId", str(i.user.username))     

        location = ET.SubElement(bidder_rating, "Location")
        location.text = i.user.profile.location
        
        country = ET.SubElement(bidder_rating, "Country")
        country.text = i.user.profile.country

        time = ET.SubElement(bids, "Time")
        time.text = i.createdAt.strftime('%Y-%m-%d %H:%M:%S')

        amount = ET.SubElement(bids, "Amount")
        amount.text = str(i.value)
        

    location = ET.Element("Location")
    location.text = product.location
    root.append(location)

    country = ET.Element("Country")
    country.text = product.country
    root.append(country)
    
    started = ET.Element("Started")
    started.text = product.started.strftime('%Y-%m-%d %H:%M:%S')   
    root.append(started)

    ended = ET.Element("Ended")
    ended.text = product.ended.strftime('%Y-%m-%d %H:%M:%S')
    root.append(ended)

    seller_rating = ET.Element("Seller_Rating")
    seller_rating.set("Seller_Rating",str(product.user.profile.buyer_rating))
    seller_rating.set("UserId",str(product.user.username))
    root.append(seller_rating)

    description = ET.Element("Description")
    description.text = str(product.description)   
    root.append(description)

    tree = ET.ElementTree(root)
    filename = "xmlFiles/" + product.name + ".xml"
    
    with open(filename, "wb") as file:
        indent(root)
        tree.write(file, encoding="utf-8", xml_declaration=True)
        file.close()
        
    
    file =  open(filename, "r")   
    
    return Response(file.read())

#creates json file and returns the data of file 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_json(request, pk):
    product = Product.objects.get(_id=pk)
    mybids = MyBids.objects.filter(product = product) 
    
    #create the list of bids first, then add to data dictionary
    bids = []
    for i in mybids:
        mydict = {
                "Bidder" : {
                    "Rating" : str(i.user.profile.seller_rating),
                    "UserID" : i.user.username,
                    "Location" : i.user.profile.location,
                    "Country"  : i.user.profile.country
                },
                "Time" : i.createdAt.strftime('%Y-%m-%d %H:%M:%S'),
                "Amount" : str(i.value)
            }
        bids.append(mydict)
        
    
    data = {
        "Items" : [
            {
                "ItemID" : str(product._id),
                "Name" :   product.name,
                "Category" : product.category,
                "Currently" : str(product.currently),
                "First_Bid" : str(product.first_bid),
                "Number_0f_Bids" : str(product.number_of_bids),
                "Bids" : bids,
                "Location": product.location,
                "Country" : product.country,
                "Started": product.started.strftime('%Y-%m-%d %H:%M:%S'),
                "Ends": product.ended.strftime('%Y-%m-%d %H:%M:%S'),
                "Seller" : [
                    {
                        "Rating" : str(product.user.profile.buyer_rating),
                        "UserID" : product.user.username
                    }
                ],
                "Description" : product.description
            }
        ]
    }
    
    filename = "jsonFiles/" + product.name + ".json"
    with open(filename, "w") as file:
        json.dump(data, file, indent=4)
        
    

    
    file =  open(filename, "r")   
    
    return Response(file.read())
