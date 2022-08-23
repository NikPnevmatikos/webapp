from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Product_Serializer
from .models import Product
from .products import products

# Create your views here.
def hello(request):
    return HttpResponse("<h1> E d la y <h1>")

@api_view(['GET'])
def api_overview(request):
    apiurls = {
        'all_products' : '/products_list/',
        'product' : '/product/<str:pk>/',
        'create' : '/create/',
        'update' : '/update/<str:pk>/',
        'delete' : '/delete/<str:pk>/'
    }
    return Response(apiurls)

# @api_view(['GET'])
# def all_products(request):
#     product = Product.objects.all().order_by('-id')
#     serializer = Product_Serializer(product, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
def all_products(request):
    return Response(products)

# @api_view(['GET'])
# def product(request, pk):
#     product = Product.objects.get(id=pk)
#     serializer = Product_Serializer(product, many=False)
#     return Response(serializer.data)

@api_view(['GET'])
def product(request, pk):
    prod = None
    for i in products:
        if i['_id'] == pk :
            prod = i
            
    return Response(prod)      


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