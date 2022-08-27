from django.urls import path, include
from .views import *


urlpatterns = [
    path('hello', hello, name= "hello"),
    path('', api_overview),
    path('product_list/', all_products),
    path('product/<str:pk>/', product),
    path('create/', create),
    path('update/<str:pk>/', update),
    path('delete/<str:pk>/', delete),

    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', getUserProfile)
]