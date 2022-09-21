from django.urls import path, include
from .views import *


urlpatterns = [
    path('hello', hello, name= "hello"),
    path('', api_overview),
    path('product_list/', all_products),
    path('user_products/', user_products),
    path('user_products/bid_list/<str:pk>/', product_bids),
    path('product/create/', create_product),
    path('product/update/<str:pk>/', update_product),
    path('product/delete/<str:pk>/', delete_product),
    path('product/<str:pk>/', product),

    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', registerUser),
    path('users/profile/', getUserProfile),
    path('users/profile/<str:pk>/', getUserProfile_by_Id),
    path('users/update/', updateUserProfile),
    path('users/verify/<str:pk>/', verify_user),
    # path('users/adminUpdate/<str:pk>', updateUserProfile_by_Id),
    path('users/delete/<str:pk>/', deleteUser),
    path('users/', getUsers),
    
    path('users/bids/', user_bids),
    path('users/bids/create/<str:pk>/', create_bid),
    path('users/bids/delete/<str:pk>/', delete_bid),
    
    
    path('users/messages/send/<str:pk>/', create_message),
    path('users/messages/received/', received_messages),
    path('users/messages/sended/', send_messages),
    path('users/messages/view/<str:pk>/', view_message),
    path('users/messages/count/', unread_message)
    
]
